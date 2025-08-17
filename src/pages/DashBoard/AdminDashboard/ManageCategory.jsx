import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // GET categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  // POST new category
  const addCategoryMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/categories", data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Category added successfully!", "success");
      queryClient.invalidateQueries(["categories"]);
      reset();
      setShowModal(false);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add category.", "error");
    },
  });

  // DELETE category
  const deleteCategory = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/categories/${id}`);
      queryClient.invalidateQueries(["categories"]);
      Swal.fire("Deleted!", "Category has been deleted.", "success");
    }
  };

  // UPDATE category
  const updateCategory = async (category) => {
    const { value: categoryName } = await Swal.fire({
      title: "Update Category Name",
      input: "text",
      inputValue: category.categoryName,
      showCancelButton: true,
    });

    if (categoryName) {
      await axiosSecure.patch(`/categories/${category._id}`, { categoryName });
      queryClient.invalidateQueries(["categories"]);
      Swal.fire("Updated!", "Category updated.", "success");
    }
  };

  // Add category submit handler
  const onSubmit = (data) => {
    addCategoryMutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary btn-sm"
        >
          + Add Category
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <tr key={cat._id}>
                <td>{idx + 1}</td>
                <td>{cat.categoryName}</td>
                <td>
                  <img src={cat.imageURL} alt={cat.categoryName} className="w-16 h-16 object-cover" />
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => updateCategory(cat)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("categoryName", { required: true })}
                className="w-full input input-bordered"
                placeholder="Category Name"
              />
              <input
                {...register("imageURL", { required: true })}
                className="w-full input input-bordered"
                placeholder="Image URL"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
