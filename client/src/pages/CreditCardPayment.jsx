import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Payment from './Payment';

const CreditCardPayment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderDetails = state?.orderDetails;

  const handlePay = () => {
    if (cardNumber && expiry && cvv) {
      navigate('/order-confirmation');
    } else {
      alert('Please fill in all credit card details.');
    }
  };

  return (
    <div className="mt-28 p-6 max-w-md mx-auto bg-white shadow-lg rounded">
      <h2 className="text-2xl font-semibold mb-4">Credit Card Payment</h2>
      <input
        type="text"
        placeholder="Card Number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry Date (MM/YY)"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={handlePay} className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
        Pay Now
      </button>
    </div>
  );
};

export default CreditCardPayment;
