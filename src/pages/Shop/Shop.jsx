import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import MedicineModal from './MedicineModal'; // Assuming MedicineModal is in the same directory
import { useCart } from '../../contexts/CartContext'; // Assuming CartContext path is correct
import { Helmet } from 'react-helmet'; // <--- NEW: Import Helmet

const Shop = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart, cart } = useCart(); // Use CartContext

  

  // Effect to log cart changes (for debugging)
  useEffect(() => {
    console.log('🛒 Cart updated in Shop component (useEffect):', cart);
  }, [cart]);

  // Fetch all medicines using react-query
  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['allMedicines'], // Unique key for this query
    queryFn: async () => {
      
      try {
        const res = await fetch('https://server-mauve-seven.vercel.app/healthHub'); // Your backend API endpoint

        if (!res.ok) {
          // If the response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
       
        return data;
      } catch (fetchError) {
        console.error('❌ Error fetching medicines:', fetchError);
        throw fetchError; // Re-throw to be caught by react-query's isError
      }
    },
    // Optional: Add staleTime to prevent re-fetching on every focus if data doesn't change frequently
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handler for adding medicine to cart
  const handleAddToCart = (medicine) => {
    console.log('🎯 Attempting to add to cart:', medicine.title);
    console.log('🔍 Medicine object being added:', medicine);

    // Basic validation: ensure medicine object and its _id exist
    if (!medicine || !medicine._id) {
      console.error('❌ Invalid medicine object provided to addToCart:', medicine);
      alert('Error: Invalid medicine data. Cannot add to cart.');
      return;
    }

    try {
      addToCart(medicine); // Call the addToCart function from CartContext
      // You might want to use a more user-friendly notification here (e.g., Toastify)
      alert(`${medicine.title} added to cart!`);
      console.log('✅ Successfully added to cart:', medicine.title);
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  // --- Render Logic based on data fetching state ---
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>HealthHub Express - Shop (Loading)</title> {/* Dynamic Title for loading state */}
        </Helmet>
        <p className="text-center p-4">Loading medicines...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Helmet>
          <title>HealthHub Express - Shop (Error)</title> {/* Dynamic Title for error state */}
        </Helmet>
        <p className="text-center p-4 text-red-600">
          Error loading medicines: {error?.message || 'Unknown error occurred.'}
        </p>
      </>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* <Helmet> component for dynamic title */}
      <Helmet>
        <title>HealthHub Express - Shop</title> {/* Dynamic Title for the main shop page */}
        <meta name="description" content="Browse and buy a wide range of medicines and healthcare products from HealthHub Express." />
      </Helmet>

      <h2 className="text-2xl font-bold mb-4">All Medicines</h2>


      {/* Table to display medicines */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300">Image</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Generic</th>
              <th className="p-2 border border-gray-300">Price</th>
              <th className="p-2 border border-gray-300">Company</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            ) : (
              medicines.map((medicine) => (
                <tr key={medicine._id} className="border-t">
                  <td className="p-2 border border-gray-300">
                    <img
                      src={medicine.image}
                      alt={medicine.title}
                      className="w-12 h-12 object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">{medicine.title}</td>
                  <td className="p-2 border border-gray-300">{medicine.genericName || 'N/A'}</td>
                  <td className="p-2 border border-gray-300">${medicine.price?.toFixed(2)}</td> {/* Ensure price is formatted */}
                  <td className="p-2 border border-gray-300">{medicine.company}</td>
                  <td className="p-2 border border-gray-300">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          // console.log('🖱️ Select button clicked for:', medicine.title); // Removed this log as handleAddToCart logs
                          handleAddToCart(medicine);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        ➕ Select
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMedicine(medicine); // Set the medicine for the modal
                          setShowModal(true); // Open the modal
                        }}
                        className="text-blue-500 hover:text-blue-700 px-2 py-1"
                        title="View Details" // Add a title for better UX
                      >
                        <FaEye className="inline-block" /> {/* Use FaEye icon */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Medicine Details Modal - only render if showModal is true and a medicine is selected */}
      {showModal && selectedMedicine && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={() => {
            setShowModal(false); // Close the modal
            setSelectedMedicine(null); // Clear selected medicine when closing
          }}
          // You might want to pass handleAddToCart to the modal if you want an "Add to Cart" button inside it
          // handleAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default Shop;