import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import MedicineModal from './MedicineModal';
import { useCart } from '../../contexts/CartContext';
import HealthHubExpressLogo from '../shared/HealthHubExpressLogo/HealthHubExpressLogo';

const CategoryDetailsPage = () => {
  const { title } = useParams(); // changed from name to title
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const { addToCart } = useCart();

   const handleAddToCart = (medicine) => {
    console.log('Adding to cart:', medicine); // Debug log
    addToCart(medicine);
  };

  const { data: medicines = [], isLoading } = useQuery({
    queryKey: ['category-medicines', title],
    queryFn: async () => {
      const res = await fetch(`https://server-mauve-seven.vercel.app/healthHub?category=${title}`);
    //   return res.json();

    if (!res.ok) throw new Error('Failed to fetch medicines');
    const data = await res.json();
    
    // Transform data if needed to match frontend expectations
    return data.map(medicine => ({
      ...medicine,
      // Ensure all required fields are present
      name: medicine.title,
      image: medicine.image || 'https://via.placeholder.com/150'
    }));

      
    }
  });

  if (isLoading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='p-4'>
      <HealthHubExpressLogo></HealthHubExpressLogo>
      <h2 className='text-2xl font-semibold mb-4'>Medicines in {title}</h2>
      {medicines.length === 0 ? (
        <p>No medicines found in this category.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className='bg-gray-200'>
                <th>Title</th>
                <th>Company</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td>{medicine.title}</td>
                  <td>{medicine.company}</td>
                  <td>${medicine.price}</td>
                  <td className='space-x-2'>
                    <button
                      className='btn btn-outline btn-info btn-sm'
                      onClick={() => setSelectedMedicine(medicine)}
                    >
                      👁️ View
                    </button>
                    {/* handleAddToCart instead addToCart */}
                    <button
                      className='btn btn-outline btn-success btn-sm'
                      onClick={() => handleAddToCart(medicine)}
                    >
                      ➕ Select
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedMedicine && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </div>
  );
};

export default CategoryDetailsPage;

