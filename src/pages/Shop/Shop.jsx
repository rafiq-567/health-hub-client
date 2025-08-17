import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import MedicineModal from './MedicineModal';
import { useCart } from '../../contexts/CartContext';
import { Helmet } from 'react-helmet';

// Define sort types
const SORT_TYPES = {
  NONE: 'none',
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
};

const Shop = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart, cart } = useCart();
  const [sortBy, setSortBy] = useState(SORT_TYPES.NONE); // New state for sorting

  // Effect to log cart changes (for debugging)
  useEffect(() => {
    console.log('🛒 Cart updated in Shop component (useEffect):', cart);
  }, [cart]);

  // Fetch all medicines using react-query
  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['allMedicines'],
    queryFn: async () => {
      try {
        const res = await fetch('https://server-two-rosy-34.vercel.app/healthHub');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      } catch (fetchError) {
        console.error('❌ Error fetching medicines:', fetchError);
        throw fetchError;
      }
    },
  });

  // Use useMemo to memoize the sorted list of medicines
  const sortedMedicines = useMemo(() => {
    // Create a new array to avoid mutating the original data
    const sorted = [...medicines];

    if (sortBy === SORT_TYPES.PRICE_ASC) {
      sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === SORT_TYPES.PRICE_DESC) {
      sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return sorted;
  }, [medicines, sortBy]); // Re-sort whenever medicines or sortBy state changes

  // Handler for adding medicine to cart
  const handleAddToCart = (medicine) => {
    console.log('🎯 Attempting to add to cart:', medicine.title);
    if (!medicine || !medicine._id) {
      console.error('❌ Invalid medicine object provided to addToCart:', medicine);
      alert('Error: Invalid medicine data. Cannot add to cart.');
      return;
    }
    try {
      addToCart(medicine);
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
          <title>HealthHub Express - Shop (Loading)</title>
        </Helmet>
        <p className="text-center p-4">Loading medicines...</p>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Helmet>
          <title>HealthHub Express - Shop (Error)</title>
        </Helmet>
        <p className="text-center p-4 text-red-600">
          Error loading medicines: {error?.message || 'Unknown error occurred.'}
        </p>
      </>
    );
  }

  return (
    <div className="p-4 max-w-6xl mt-20 mx-auto">
      <Helmet>
        <title>HealthHub Express - Shop</title>
        <meta name="description" content="Browse and buy a wide range of medicines and healthcare products from HealthHub Express." />
      </Helmet>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Medicines</h2>

        {/* Sort controls */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700 dark:text-white">Sort by Price:</span>
          <button
            onClick={() => setSortBy(SORT_TYPES.PRICE_ASC)}
            className={`btn ${sortBy === SORT_TYPES.PRICE_ASC ? 'btn-primary' : 'btn-outline'}`}
          >
            Low to High
          </button>
          <button
            onClick={() => setSortBy(SORT_TYPES.PRICE_DESC)}
            className={`btn ${sortBy === SORT_TYPES.PRICE_DESC ? 'btn-primary' : 'btn-outline'}`}
          >
            High to Low
          </button>
        </div>
      </div>

      {/* Table to display medicines */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 dark:text-black">
            <tr>
              <th className="p-2 border border-gray-300 dark:border-black">Image</th>
              <th className="p-2 border border-gray-300 dark:border-black">Name</th>
              <th className="p-2 border border-gray-300 dark:border-black">Generic</th>
              <th className="p-2 border border-gray-300 dark:border-black">Price</th>
              <th className="p-2 border border-gray-300 dark:border-black">Company</th>
              <th className="p-2 border border-gray-300 dark:border-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedicines.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            ) : (
              sortedMedicines.map((medicine) => (
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
                  <td className="p-2 border border-gray-300">${medicine.price?.toFixed(2)}</td>
                  <td className="p-2 border border-gray-300">{medicine.company}</td>
                  <td className="p-2 border border-gray-300">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleAddToCart(medicine)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        ➕ Select
                      </button>
                      <button
                        onClick={() => {
                          setSelectedMedicine(medicine);
                          setShowModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 px-2 py-1"
                        title="View Details"
                      >
                        <FaEye className="inline-block" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && selectedMedicine && (
        <MedicineModal
          medicine={selectedMedicine}
          onClose={() => {
            setShowModal(false);
            setSelectedMedicine(null);
          }}
        />
      )}
    </div>
  );
};

export default Shop;