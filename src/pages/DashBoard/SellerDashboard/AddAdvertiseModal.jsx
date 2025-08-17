import { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';

const AddAdvertiseModal = ({ sellerEmail, closeModal, refetch }) => {
  const { user } = UseAuth();
  const [form, setForm] = useState({
    image: '',
    name: '',
    description: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    console.log('ফর্ম ডাটা:', form);
    console.log('বিক্রেতা ইমেইল:', sellerEmail);

    const newAd = {
      ...form,
      sellerEmail: user?.email,
      isActive: false
    };

    console.log('পাঠানো ডাটা:', newAd);

    const res = await fetch('https://server-mauve-seven.vercel.app/advertised-medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAd)
    });

    if (res.ok) {
      refetch();
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h2 className="text-lg font-bold">Request Advertisement</h2>

        <input
          name="image"
          placeholder="Medicine Image URL"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          name="name"
          placeholder="Medicine Name"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <textarea
          name="description"
          placeholder="Short Description"
          required
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertiseModal;
