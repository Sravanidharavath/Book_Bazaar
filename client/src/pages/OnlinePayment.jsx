import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OnlinePayment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const orderDetails = state?.orderDetails;

  const handleSuccess = () => {
    navigate('/order-confirmation');
  };

  return (
    <div className="mt-28 p-6 text-center">
      <h2 className="text-3xl font-semibold mb-4">Online Payment</h2>
      <p className="mb-6">Choose your preferred payment method below:</p>
      <div className="flex flex-col items-center space-y-4">
        <button onClick={handleSuccess} className="bg-blue-600 text-white px-6 py-2 rounded">Pay with PhonePe</button>
        <button onClick={handleSuccess} className="bg-green-600 text-white px-6 py-2 rounded">Pay with Paytm</button>
      </div>
    </div>
  );
};

export default OnlinePayment;
