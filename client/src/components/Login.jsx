import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contects/AuthProvider';
import googleLogo from '../assets/google-logo.svg';

const Login = () => {
  const { login, loginwithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password).then((userCredential) => {
      //Signed in
        const user = userCredential.user;
        localStorage.setItem("userEmail", user.email);
        alert('Login successful!');
        setError('');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    loginwithGoogle()
      .then((result) => {
        const user = result.user;
        alert("Login with Google successful!");
        setError('');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Log in form</h1>

            <form
              onSubmit={handleLogin}
              className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  placeholder="Password"
                  required
                />
              </div>

              {error ?<p className='text-red-600 text-base'>Email or Password is not correct:</p>:""}

              <p>
                If you haven't an account. please
                <Link to="/sign-up" className="text-blue-600 underline">
                  Sign up
                </Link>
                Here
              </p>

              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-6 py-2 w-full"
              >
                Login
              </button>
            </form>

            <hr className="my-4" />

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-blue-100"
              >
                <img src={googleLogo} alt="Google logo" className="w-6 h-6" />
                <span>Login with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
