import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FindBySlug = () => {
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('JWT_Token');
  //   if (!token) {
  //     navigate('/');
  //     return;
  //   }

  //   axios
  //     .get('http://localhost:8085/api/isValidJWT', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(() => {
  //       console.log('Token is valid');
  //     })
  //     .catch((error) => {
  //       console.error('Token validation error', error);
  //       localStorage.removeItem('JWT_Token');
  //       navigate('/');
  //     });
  // }, [navigate]);

  const handleSubmit = () => {
    if (!slug.trim()) {
      setError('Please enter a slug code');
      return;
    }
    navigate(`/findbyslug/${slug.trim()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Find Message
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center mb-2">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slug Code
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Enter slug code"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 text-sm sm:text-base bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Find Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindBySlug;
