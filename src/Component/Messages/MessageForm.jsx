import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MessageForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [encryption, setEncryption] = useState('NO');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSlug,setIsSlug] = useState(false);
  const [slug,setSlug] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title || !content || !expirationDate) {
      setError('Please fill in all required fields');
      return;
    }
    if (encryption === 'YES' && !password) {
      setError('Password is required when encryption is enabled');
      return;
    }

    const messageData = {
        user: {
          id: localStorage.getItem('ID')
        },
        title,
        content,
        expiration: expirationDate,
        encryption,
        password: encryption === 'YES' ? password : null
      };
      const token = localStorage.getItem('JWT_Token');
      try {
          const response = await axios.post(
            'https://dropmessage.onrender.com/create',
            messageData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        console.log('Message submitted:', response.data);

            // Reset form
            setTitle('');
            setContent('');
            setExpirationDate('');
            setEncryption('NO');
            setPassword('');
            setIsSlug(true);
            setSlug(response.data.slug);

        } catch (err) {
            console.error(err);
            setError('Failed to submit message');
        }
    };

  useEffect(() => {
    const token = localStorage.getItem('JWT_Token');
    if (!token) {
      navigate('/');
      return;

    } 
    axios.get("https://dropmessage.onrender.com/api/isValidJWT", {
      headers: {
        Authorization: `Bearer ${token}`, // or better: Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log("Token is valid");
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("Token is invalid or expired");
        localStorage.removeItem("JWT_Token");
        navigate("/");
      } else {
        // Network or other errors
        console.error("Token validation error", error);
        navigate("/");
      }
    });
    
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create Message
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center mb-2">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Enter message title"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Enter message content"
              rows="4"
            />
          </div>

          {/* Expiration */}
          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiration Date *
            </label>
            <input
              id="expirationDate"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>

          {/* Encryption */}
          <div>
            <label htmlFor="encryption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Encryption
            </label>
            <select
              id="encryption"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
              className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              <option value="NO">No</option>
              <option value="YES">Yes</option>
            </select>
          </div>

          {/* Password Field (Conditional) */}
          {encryption === 'YES' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                placeholder="Enter password"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 text-sm sm:text-base bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Create Message
          </button>

          {/* Slug Output */}
          {isSlug && (
            <div className="mt-4 text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">
                Message created successfully!
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                Your slug code is: <span className="font-semibold">{slug}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageForm;