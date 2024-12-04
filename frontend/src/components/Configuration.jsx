import React, { useEffect } from "react";

const Configuration = ({ config, onUpdate, message }) => {
  const handleUpdateConfiguration = () => {
    if (onUpdate) {
      onUpdate();
    } else {
      console.error("onUpdate function is not defined");
    }
  };

//   useEffect(() => {
//     console.log("Received config prop:", config);
//   }, [config]);

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Configuration</h2>
      <pre className="bg-white p-4 rounded-md text-sm text-gray-700 overflow-auto">
        {JSON.stringify(config, null, 2)}
      </pre>
      <button
        onClick={handleUpdateConfiguration}
        className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition mt-8"
      >
        Update Configuration
      </button>
      {message && <p className="text-green-600 mt-4">{message}</p>}
    </div>
  );
};

export default Configuration;
