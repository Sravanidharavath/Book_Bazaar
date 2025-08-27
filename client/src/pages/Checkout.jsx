import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = () => {
    const { fullName, phone, pincode, address, city, state } = formData;

    if (!fullName || !phone || !pincode || !address || !city || !state) {
      alert('Please fill in all fields correctly.');
      return;
    }

    localStorage.setItem('deliveryAddress', JSON.stringify(formData));
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Delivery Address
      </h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="address"
          rows={3}
          placeholder="Flat, House no, Building, Street, Area"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="bg-[#2874f0] hover:bg-[#1c5dc5] text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-all duration-200"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
