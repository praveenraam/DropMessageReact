import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { username } = useParams();
  const [messageList, setMessageList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) {
      setError("Please enter a username");
      return;
    }

    const token = localStorage.getItem("JWT_Token");

    axios
      .get(`https://dropmessage.onrender.com/u/${username}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        if (response.data.status === "OK") {
          setMessageList(response.data.messageList);
        } else {
          setError("Messages not found");
        }
      })
      .catch((error) => {
        setError("Error fetching messages.");
        console.error(error);
      });
  }, [username]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {username}'s Messages
        </h2>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {messageList.length > 0 ? (
            messageList.map((msg) => (
              <Link
                key={msg.id}
                to={`/findbyslug/${msg.slug}`}
                className="block p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-base sm:text-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {msg.title}
              </Link>
            ))
          ) : (
            !error && (
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                No messages found.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
