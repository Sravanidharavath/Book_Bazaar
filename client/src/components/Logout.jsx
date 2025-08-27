import React, { useContext, useState } from 'react';
import { AuthContext } from '../contects/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || '/';
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    logOut()
      .then(() => {
        alert('Sign-out successful!');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.error('Logout Error:', error);
        setLoading(false);
      });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-teal-200 to-teal-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">Are you sure you want to log out?</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-lg shadow-md transition duration-200"
        disabled={loading}
      >
        {loading ? 'Logging Out...' : 'Confirm Logout'}
      </button>

      {loading && (
        <div className="mt-6 flex items-center space-x-2">
          <div className="w-5 h-5 border-4 border-white border-dashed rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      )}
    </div>
  );
};

export default Logout;
