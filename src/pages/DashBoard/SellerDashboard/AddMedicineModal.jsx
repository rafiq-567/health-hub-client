import { useState } from 'react';

const AddMedicineModal = ({ sellerEmail, closeModal, refetch }) => {
  const [form, setForm] = useState({
    title: '',
    genericName: '',
    description: '',
    image: '',
    category: '',
    company: '',
    massUnit: 'Mg',
    price: '',
    discount: 0,
    sellerEmail, 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newMedicine = { ...form, sellerEmail, price: parseFloat(form.price), discount: parseFloat(form.discount || 0) };

    const res = await fetch('https://server-mauve-seven.vercel.app/healthHub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedicine)
    });

    if (res.ok) {
      await refetch();
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg w-96  space-y-2">
        <h2 className="text-lg font-bold">Add New Medicine</h2>

        <input name="title" placeholder="Item Name" required onChange={handleChange} className="input input-bordered w-full" />
        <input name="genericName" placeholder="Generic Name" required onChange={handleChange} className="input input-bordered w-full" />
        <textarea name="description" placeholder="Short Description" required onChange={handleChange} className="textarea textarea-bordered w-full" />
        <input name="image" placeholder="Image URL" required onChange={handleChange} className="input input-bordered w-full" />
        <input name="category" placeholder="Category" required onChange={handleChange} className="input input-bordered w-full" />
        <input name="company" placeholder="Company" required onChange={handleChange} className="input input-bordered w-full" />

        <select name="massUnit" onChange={handleChange} className="select select-bordered w-full">
          <option value="Mg">Mg</option>
          <option value="ML">ML</option>
        </select>

        <input type="number" name="price" placeholder="Per Unit Price" required onChange={handleChange} className="input input-bordered w-full" />
        <input type="number" name="discount" placeholder="Discount (%)" defaultValue={0} onChange={handleChange} className="input input-bordered w-full" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicineModal;
