import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddAdvertiseModal from './AddAdvertiseModal';


const AdvertiseRequest = ({ sellerEmail }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: ads = [], refetch, isLoading } = useQuery({
    queryKey: ['advertised-medicines', sellerEmail],
    queryFn: async () => {
      const res = await fetch(`https://server-mauve-seven.vercel.app/advertised-medicines`);
      const all = await res.json();
      return all.filter(ad => ad.sellerEmail === sellerEmail);
    }
  });

  if (isLoading) return <p>Loading...</p>;
  console.log(ads)
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Advertisement Requests</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary mb-4"
      >
        Add Advertise
      </button>

      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {ads.map(ad => (
            <tr key={ad._id} className="border-t">
              <td>
                <img src={ad.image} alt="Ad" className="w-16 h-16 object-cover" />
              </td>
              <td>{ad.name}</td>
              <td>{ad.description}</td>
              <td>
                <span className={`px-2 py-1 rounded text-white text-xs ${ad.isActive ? 'bg-green-600' : 'bg-gray-400'}`}>
                  {ad.isActive ? 'Active' : 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AddAdvertiseModal
          sellerEmail={sellerEmail}
          closeModal={() => setIsModalOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AdvertiseRequest;
