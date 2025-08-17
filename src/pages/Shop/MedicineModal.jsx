const MedicineModal = ({ medicine, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <img src={medicine.image} alt={medicine.title} className="w-full h-48 object-cover mb-4 rounded" />
        <h2 className="text-xl font-bold mb-2">{medicine.title}</h2>
        <p><strong>Generic:</strong> {medicine.genericName}</p>
        <p><strong>Company:</strong> {medicine.company}</p>
        <p><strong>Category:</strong> {medicine.category}</p>
        <p><strong>Price:</strong> ${medicine.price}</p>
        <p><strong>Mass Unit:</strong> {medicine.massUnit}</p>
        <p className="mt-2">{medicine.description}</p>
      </div>
    </div>
  );
};

export default MedicineModal;
