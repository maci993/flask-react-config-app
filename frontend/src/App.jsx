import React, { useState } from "react";
import axios from "axios";
import Login from "./components/Login.jsx";
import Configuration from "./components/Configuration.jsx";

const App = () => {
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState(null);

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.status === 200) fetchConfig();
    } catch (error) {
      setMessage("Invalid credentials!");
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/config");
      // console.log("Fetched configuration:", response.data);
      if (response.status === 200) {
        setConfig(response.data);
      }
    } catch (error) {
      console.error("Error fetching configuration:", error);
      setMessage("Error fetching configuration!");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/config", {
        username: "newAdmin",
        password: "newPassword",
      });
      // console.log("Update response:", response);
      if (response.status === 200) {
        setMessage(response.data.message);
        await fetchConfig();
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
      setMessage("Error updating configuration!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      {!config ? (
        <div className="w-full max-w-2xl">
          <Login onLogin={handleLogin} message={message} />
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <Configuration config={config} onUpdate={handleUpdate} message={message}/>
        </div>
      )}
    </div>
  );
};

export default App;
