import React, { useState } from "react";

function App() {
  const [device, setDevice] = useState(null);
  const [server, setServer] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);
  
  const serviceUUID = "0000ffe0-0000-1000-8000-00805f9b34fb"; 
  const charUUID = "0000ffe1-0000-1000-8000-00805f9b34fb"; 

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [serviceUUID]
      });
      setDevice(device);
      const server = await device.gatt.connect();
      setServer(server);
      const service = await server.getPrimaryService(serviceUUID);
      const characteristic = await service.getCharacteristic(charUUID);
      setCharacteristic(characteristic);
    } catch (error) {
      console.error("Bluetooth Connection Error:", error);
    }
  };

  const sendCommand = async (command) => {
    if (!characteristic) return;
    try {
      const encoder = new TextEncoder();
      await characteristic.writeValue(encoder.encode(command));
    } catch (error) {
      console.error("Failed to send command:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">ESP32 Bluetooth Controller</h1>
      <button onClick={connectBluetooth} className="px-4 py-2 bg-blue-500 text-white rounded mb-4">
        {device ? `Connected to ${device.name}` : "Connect to ESP32"}
      </button>
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => sendCommand("A")} className="btn">Servo 0°</button>
        <button onClick={() => sendCommand("B")} className="btn">Servo 90°</button>
        <button onClick={() => sendCommand("C")} className="btn">Servo 180°</button>
        <button onClick={() => sendCommand("1")} className="btn">Motor 1</button>
        <button onClick={() => sendCommand("2")} className="btn">Motor 2</button>
        <button onClick={() => sendCommand("3")} className="btn">Motor 3</button>
        <button onClick={() => sendCommand("4")} className="btn">Motor 4</button>
      </div>
    </div>
  );
}

export default App;
