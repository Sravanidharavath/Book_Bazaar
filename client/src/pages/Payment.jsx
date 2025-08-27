import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditCardPayment from './CreditCardPayment';

const Payment = () => {
  const [method, setMethod] = useState('');
  const navigate = useNavigate();

  const handleNext = () => {
    if (!method) {
      alert('Please select a payment method.');
      return;
    }
    localStorage.setItem('paymentMethod', method);
    navigate('/confirm-order');
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-20">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
      <div className="space-y-3">
        {['Credit Card', 'UPI', 'Cash on Delivery'].map((m) => (
          <label key={m} className="flex items-center gap-3">
            <input
              type="radio"
              name="payment"
              value={m}
              onChange={(e) => setMethod(e.target.value)}
              checked={method === m}
            />
            <span>{m}</span>
          </label>
        ))}
      </div>
      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={handleNext}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Payment;
