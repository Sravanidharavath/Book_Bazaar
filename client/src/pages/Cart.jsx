import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    navigate('/checkout'); // 🔁 Step 1: go to address entry page
  };

  const goToMyOrders = () => {
    navigate('/my-orders'); // ✅ Redirect to My Orders page
  };

  return (
    <div className="p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 max-w-4xl mx-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">by {item.author}</p>
                    <p className="text-sm">₹ {item.price} × {item.quantity}</p>
                    <p className="text-sm font-semibold">
                      Subtotal: ₹ {(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-4xl mx-auto text-right">
            <p className="text-2xl font-bold text-black mb-4">
              Total: ₹ {totalPrice.toFixed(2)}
            </p>
            <div className="flex flex-wrap justify-end gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-md"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
                onClick={goToMyOrders}
              >
                My Orders
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
