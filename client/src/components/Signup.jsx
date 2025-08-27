import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import googleLogo from '../assets/google-logo.svg';

const Signup = () => {
  const { createUser, loginwithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const saveUserToDB = async (user) => {
    const { displayName, email } = user;
    try {
      await axios.post('http://localhost:5000/api/save-user', {
        name: displayName,
        email,
      });
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await saveUserToDB({ displayName: username, email });

      localStorage.setItem("userEmail", email); 

      alert("Sign up successful!");
      setError("");
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = () => {
    loginwithGoogle()
      .then(async (result) => {
        await saveUserToDB(result.user);
        localStorage.setItem("userEmail", user.email); 
        alert("Sign up with Google successful!");
        setError('');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Sign Up</h1>

            <form
              onSubmit={handleSignUp}
              className="py-8 space-y-4 text-gray-700"
            >
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="h-10 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
              />

              {error && <p className="text-red-500">{error}</p>}

              <p>
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 underline">
                  Login
                </Link>
              </p>

              <button className="bg-blue-500 text-white rounded-md px-6 py-2 w-full">
                Sign up
              </button>
            </form>

            <hr className="my-4" />
            <button
              onClick={handleRegister}
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md w-full hover:bg-blue-100"
            >
              <img src={googleLogo} alt="Google logo" className="w-6 h-6" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
