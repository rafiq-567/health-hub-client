import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import UseAuth from "./UseAuth";

const useRole = () => {
    const { user } = UseAuth()
    const [role, setRole] = useState(null)
    const [isRoleLoading, setIsRoleLoading] = useState(true)
    const axiosSecure = useAxiosSecure()
    // useEffect(() => {
    //     const fetchUserRole = async () => {
    //         const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/user/role/${user?.email}`)
    //         console.log(data)
    //         setRole(data?.role)
    //     }
    //     fetchUserRole()
    // }, [user, axiosSecure])

    useEffect(() => {
        const fetchUserRole = async () => {
            if (!user?.email) return; // 💥 avoid firing the request early
            try {
                const { data } = await axiosSecure(`${import.meta.env.VITE_API_URL}/user/role/${user.email}`);
                
                setRole(data?.role);
            } catch (err) {
                console.error('Failed to fetch role:', err);
            } finally {
                setIsRoleLoading(false);
            }
        };
        fetchUserRole();
    }, [user?.email, axiosSecure]);


    return [role, isRoleLoading]

};

export default useRole;