import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAdvertisedMedicines = () => {
    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        axios.get('https://server-mauve-seven.vercel.app/advertised-medicines')
            .then(res => setMedicines(res.data))
            .catch(err => console.error('Failed to load advertised medicines', err));
    }, []);

    const handleToggle = async (id, currentStatus) => {
        try {
            await axios.patch(`https://server-mauve-seven.vercel.app/advertised-medicines/${id}/toggle`, {
                isActive: !currentStatus,
            });

            // Refresh UI
            setMedicines(prev =>
                prev.map(med =>
                    med._id === id ? { ...med, isActive: !currentStatus } : med
                )
            );
        } catch (err) {
            console.error('Failed to toggle slide status', err);
        }
    };
console.log(medicines)
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Banner Advertise</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Image</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Seller Email</th>
                            <th className="p-2">Add/Remove from Slider</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {medicines.map(med => (
                            <tr key={med._id} className="border-t">
                                <td className="p-2">
                                    <img src={med.image} alt={med.medicineName} className="w-16 h-16 object-cover" />
                                </td>
                                <td className="p-2">{med.name}</td>
                                <td className="p-2">{med.description}</td>
                                <td className="p-2">{med.sellerEmail || 'ইমেইল নেই'}</td>
                                <td className="p-2">
                                    <button
                                        onClick={() => handleToggle(med._id, med.isActive)}
                                        className={`px-4 py-1 rounded ${med.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                            }`}
                                    >
                                        {med.isActive ? 'Remove from Slide' : 'Add to Slide'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAdvertisedMedicines;
