const MedicineModal = ({ medicine, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{medicine.title}</h3>
        <img src={medicine.image} alt={medicine.name} className="w-full h-40 object-cover mb-4 rounded" />
        <p><strong>Company:</strong> {medicine.company}</p>
        <p><strong>Price:</strong> ${medicine.price}</p>
        <p><strong>Description:</strong> {medicine.description || 'N/A'}</p>
        <button className="mt-4 btn btn-sm btn-error" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MedicineModal;
