import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(`http://localhost:5000/my-orders?email=${email}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, [email]);

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">My Orders</h2>
      {orders.map((order, idx) => {
        const orderDate = new Date(order.createdAt);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + 3);

        return (
          <div key={idx} className="border-b pb-4 mb-4">
            <p><strong>Order Date:</strong> {orderDate.toLocaleString()}</p>
            <p><strong>Estimated Delivery:</strong> {deliveryDate.toDateString()}</p>
            <p><strong>Total:</strong> ₹ {order.total.toFixed(2)}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-4 border p-3 rounded">
                  <img src={item.image} alt={item.title} className="w-20 h-24 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="text-gray-600">₹ {(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
