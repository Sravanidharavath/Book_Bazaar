import React, { useEffect } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const OrderConfirmation = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const addressData = JSON.parse(localStorage.getItem('deliveryAddress'));
  const paymentMethod = localStorage.getItem('paymentMethod');

  useEffect(() => {
    if (!cartItems.length || !addressData || !paymentMethod) {
      navigate('/');
    }
  }, [cartItems, addressData, paymentMethod]);

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
    return sum + price * item.quantity;
  }, 0);

  const handleConfirm = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }
  
    const order = {
      email,
      address: addressData,
      paymentMethod,
      items: cartItems,
      total,
      createdAt: new Date()
    };
  
    try {
      await axios.post("http://localhost:5000/place-order", order);
      alert("✅ Order placed successfully!");
      clearCart();
      localStorage.removeItem("deliveryAddress");
      localStorage.removeItem("paymentMethod");
      navigate('/my-orders');
    } catch (error) {
      console.error("Order failed:", error);
      alert("❌ Order failed. Try again.");
    }
  };
  
  
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-20 border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Confirm Your Order</h2>

      {/* Address Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1 text-gray-700">Delivery Address:</h3>
        <div className="text-gray-800 leading-6 pl-2">
          <p>{addressData?.fullName}</p>
          <p>{addressData?.phone}</p>
          <p>{addressData?.address}</p>
          <p>{addressData?.city}, {addressData?.state} - {addressData?.pincode}</p>
        </div>
      </div>

      {/* Payment Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1 text-gray-700">Payment Method:</h3>
        <p className="pl-2 text-gray-800">{paymentMethod}</p>
      </div>

      {/* Items Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Items:</h3>
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="py-2 flex justify-between text-gray-700">
              <span>{item.title} × {item.quantity}</span>
              <span>₹ {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right font-bold text-xl text-black">Total: ₹ {total.toFixed(2)}</p>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition duration-200"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
