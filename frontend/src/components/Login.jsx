import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Device Login</h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your credentials to access the device configuration
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 -mb-3 block"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            />
          </div>
          <div className="space-y-6">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 -mb-3 mt-6 block"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition mt-8"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
