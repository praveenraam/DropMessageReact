import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewMessage = () => {
  const { slug } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError("Please enter a slug code");
      return;
    }

    const token = localStorage.getItem("JWT_Token");

    axios
      .get(`http://localhost:8085/message/${slug}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        if (response.data.status === "OK" && response.data.messageObj) {
          setMessage(response.data.messageObj);
        } else {
          setError("Message not found");
        }
      })
      .catch(() => {
        setError("Error fetching message. Please check the slug.");
      });
  }, [slug]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === message.password) {
      setIsVerified(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Message Details
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {message ? (
          <div className="space-y-4">
            {/* Title */}
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{message.title}</p>
            </div>

            {/* Password protected content */}
            {message.encryption === "YES" && !isVerified ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enter Password to View Content:
                  </label>
                  <input
                    type="password"
                    value={enteredPassword}
                    onChange={(e) => setEnteredPassword(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Content:
                </span>
                <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            )}

            {/* Other Metadata */}
            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Expiration Date:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{message.expiration}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Encryption:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{message.encryption}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Slug:
              </span>
              <p className="text-gray-900 dark:text-gray-100">{message.slug}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Created By (Email):
              </span>
              <p className="text-gray-900 dark:text-gray-100">{message.user.email}</p>
            </div>
          </div>
        ) : (
          !error && <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewMessage;
