import React, { useState } from "react";
import axios from "axios";

const DeviceConfiguration = () => {
  const [activeTab, setActiveTab] = useState("Network");
  const [deviceName, setDeviceName] = useState("");
  const [enableWiFi, setEnableWiFi] = useState(false);
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [ipConfig, setIpConfig] = useState("DHCP");
  const [lanIpConfig, setLanIpConfig] = useState("DHCP");
  const [message, setMessage] = useState("");

  const handleDeviceNameChange = (event) => {
    setDeviceName(event.target.value);
  };

  const handleEnableWiFiChange = () => {
    setEnableWiFi(!enableWiFi);
  };

  const handleWifiSSIDChange = (event) => {
    setWifiSSID(event.target.value);
  };

  const handleWifiPasswordChange = (event) => {
    setWifiPassword(event.target.value);
  };

  const handleIpConfigChange = (event) => {
    setIpConfig(event.target.value);
  };

  const handleLanIpConfigChange = (event) => {
    setLanIpConfig(event.target.value);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const configData = {
      deviceName,
      enableWiFi,
      wifiSSID,
      wifiPassword,
      ipConfig,
      lanIpConfig,
    };

    try {
      const response = await axios.post(
        "/api/device-configuration",
        configData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error saving configuration:", error);
      setMessage("Failed to save configuration. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Device Configuration</h1>
      <p className="mb-6">Manage your device settings</p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            activeTab === "Network" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleTabClick("Network")}
        >
          Network
        </button>
        <button
          className={`border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            activeTab === "Monitoring" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleTabClick("Monitoring")}
        >
          Monitoring
        </button>
        <button
          className={`border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            activeTab === "Relays" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleTabClick("Relays")}
        >
          Relays
        </button>
        <button
          className={`border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            activeTab === "Settings" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleTabClick("Settings")}
        >
          Settings
        </button>
        <button
          className={`border border-gray-300 hover:border-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
            activeTab === "Logout" ? "bg-gray-400" : ""
          }`}
          onClick={() => handleTabClick("Logout")}
        >
          Logout
        </button>
      </div>

      {message && (
        <div
          className={`p-2 mb-4 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {activeTab === "Network" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Device Name */}
          <div>
            <label
              htmlFor="deviceName"
              className="block text-gray-700 font-bold mb-2"
            >
              Device Name
            </label>
            <input
              type="text"
              id="deviceName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter device name"
              value={deviceName}
              onChange={handleDeviceNameChange}
            />
          </div>

          {/* Enable WiFi */}
          <div className="flex flex-col items-start">
            <p className="text-2xl font-bold mb-6 text-gray-800">WiFi Configuration</p>
            <div className="flex items-center">
              <span className="mr-2">
                <input
                  type="checkbox"
                  id="enableWiFi"
                  className="hidden"
                  checked={enableWiFi}
                  onChange={handleEnableWiFiChange}
                />
                <label
                  htmlFor="enableWiFi"
                  className={`inline-block w-12 h-6 rounded-full transition-colors duration-200 ease-linear ${
                    enableWiFi ? "bg-blue-500" : "bg-gray-300"
                  } relative`}
                >
                  <span
                    className={`inline-block w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-linear transform ${
                      enableWiFi ? "translate-x-6" : "translate-x-0"
                    } absolute top-1 left-1`}
                  ></span>
                </label>
              </span>
              <label
                htmlFor="enableWiFi"
                className="ml-2 block text-gray-700 font-bold"
              >
                Enable WiFi
              </label>
            </div>
          </div>

          {/* WiFi Credentials */}
          {enableWiFi && (
            <>
              <div>
                <label
                  htmlFor="wifiSSID"
                  className="block text-gray-700 font-bold mb-2"
                >
                  WiFi SSID
                </label>
                <input
                  type="text"
                  id="wifiSSID"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter WiFi SSID"
                  value={wifiSSID}
                  onChange={handleWifiSSIDChange}
                />
              </div>
              <div>
                <label
                  htmlFor="wifiPassword"
                  className="block text-gray-700 font-bold mb-2"
                >
                  WiFi Password
                </label>
                <input
                  type="password"
                  id="wifiPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter WiFi Password"
                  value={wifiPassword}
                  onChange={handleWifiPasswordChange}
                />
              </div>
            </>
          )}

          {/* WiFi IP Configuration */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              WiFi IP Configuration
            </label>
            <div className="flex items-center">
              <input
                id="dhcp"
                type="radio"
                value="DHCP"
                checked={ipConfig === "DHCP"}
                onChange={handleIpConfigChange}
                className="form-radio h-4 w-4 text-black"
              />
              <label htmlFor="dhcp" className="ml-2">
                DHCP
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="staticIP"
                type="radio"
                value="Static IP"
                checked={ipConfig === "Static IP"}
                onChange={handleIpConfigChange}
                className="form-radio h-4 w-4 text-black"
              />
              <label htmlFor="staticIP" className="ml-2">
                Static IP
              </label>
            </div>
          </div>

          {/* LAN Configuration */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              LAN Configuration
            </label>
            <div className="flex items-center">
              <input
                id="lanDHCP"
                type="radio"
                value="DHCP"
                checked={lanIpConfig === "DHCP"}
                onChange={handleLanIpConfigChange}
                className="form-radio h-4 w-4  text-black"
              />
              <label htmlFor="lanDHCP" className="ml-2">
                DHCP
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="lanStaticIP"
                type="radio"
                value="Static IP"
                checked={lanIpConfig === "Static IP"}
                onChange={handleLanIpConfigChange}
                className="form-radio h-4 w-4 text-black"
              />
              <label htmlFor="lanStaticIP" className="ml-2">
                Static IP
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition mt-8"
          >
            Save Network Configuration
          </button>
        </form>
      )}

      {activeTab === "Monitoring" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Monitoring Settings</h2>
    
        </div>
      )}

      {activeTab === "Relays" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Relays Settings</h2>
   
        </div>
      )}

      {activeTab === "Settings" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Other Settings</h2>
 
        </div>
      )}
    </div>
  );
};

export default DeviceConfiguration;
