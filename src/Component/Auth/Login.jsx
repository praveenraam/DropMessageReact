import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8085/login', {
        email:email,
        password:password
      });
      console.log(response);

      if(response.data.status === 'ACCEPTED'){
        const token = response.data.token;
        const Id = response.data.user.id;
        const userName = response.data.user.username
        
        localStorage.setItem('JWT_Token', token);
        localStorage.setItem('ID',Id);
        localStorage.setItem('username',userName);

        console.log('Login successful. Token saved:', token);
        
        navigate('/message/create');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
    }

  };

  useEffect(()=>{
    const token = localStorage.getItem("JWT_Token");

    if(token){
      axios.get("http://localhost:8085/api/isValidJWT", {
        headers: {
          Authorization: `Bearer ${token}`, // or better: Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log("Token is valid");
        navigate('/message/create')
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.log("Token is invalid or expired");
          localStorage.removeItem("JWT_Token");
          localStorage.removeItem("ID")
          localStorage.removeItem("userName")
          navigate("/");
        } else {
          // Network or other errors
          console.error("Token validation error", error);
          navigate("/");
        }
      });
    }

  })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login
        </h2>
        <div className="space-y-4">
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username or Email
            </label>
            <input
              id="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Enter username or email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Log In
          </button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            No account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;