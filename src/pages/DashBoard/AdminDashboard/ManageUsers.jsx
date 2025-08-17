import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user: currentUser } = UseAuth(); 

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Role Update Mutation
    const updateRoleMutation = useMutation({
        mutationFn: async ({ userId, role }) => {
            return await axiosSecure.patch(`/users/${userId}/role`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            Swal.fire("Success!", "User role updated.", "success");
        },
        onError: () => {
            Swal.fire("Error!", "Failed to update user role.", "error");
        },
    });

    // Handle role change
    const handleChangeRole = (userId, newRole) => {
        Swal.fire({
            title: `Make this user a ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((res) => {
            if (res.isConfirmed) {
                updateRoleMutation.mutate({ userId, role: newRole });
            }
        });
    };

    if (isLoading) return <p>Loading users...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => {
                            const isSelf = user.email === currentUser?.email; // ✅ check if it's the logged-in user
                            return (
                                <tr key={user._id}>
                                    <td>{idx + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role || "user"}</td>
                                    <td className="flex gap-2 flex-wrap">
                                        {!isSelf && user.role !== "admin" && (
                                            <button
                                                onClick={() => handleChangeRole(user._id, "admin")}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {!isSelf && user.role !== "seller" && (
                                            <button
                                                onClick={() => handleChangeRole(user._id, "seller")}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Make Seller
                                            </button>
                                        )}
                                        {!isSelf && user.role !== "user" && (
                                            <button
                                                onClick={() => handleChangeRole(user._id, "user")}
                                                className="btn btn-sm btn-warning"
                                            >
                                                Make User
                                            </button>
                                        )}
                                        {isSelf && (
                                            <span className="text-sm text-gray-400">
                                                You cannot change your own role
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
