import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddMedicineModal from './AddMedicineModal';
import UseAuth from '../../../hooks/UseAuth';

const ManageMedicines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = UseAuth(); // Assumes user object has .email

  const sellerEmail = user?.email;

  const {
    data: medicines = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['medicines', sellerEmail],
    enabled: !!sellerEmail, // ✅ Prevent query if email is not ready
    queryFn: async () => {
      const res = await fetch(`https://server-mauve-seven.vercel.app/my-medicines?email=${sellerEmail}`);
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Medicines</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
      >
        Add Medicine
      </button>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Image</th>
            <th>Name</th>
            <th>Generic</th>
            <th>Category</th>
            <th>Company</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Discount %</th>
          </tr>
        </thead>
        <tbody className='mx-auto text-center'>
          {medicines.map((med) => (
            <tr key={med._id} className="border-t">
              <td>
                <img
                  src={med.image}
                  alt={med.title}
                  className="h-12 w-12 object-cover"
                />
              </td>
              <td>{med.title}</td>
              <td>{med.genericName}</td>
              <td>{med.category}</td>
              <td>{med.company}</td>
              <td>{med.massUnit}</td>
              <td>${med.price}</td>
              <td>{med.discount || 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddMedicineModal
          sellerEmail={sellerEmail}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ManageMedicines;
