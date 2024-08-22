"use client";
import { useState } from "react";

export default function InputForm() {
  // Estados para capturar los datos del usuario
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [electricityCost, setElectricityCost] = useState("");

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      material,
      weight,
      hours,
      minutes,
      electricityCost,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
          Calcular Costo de Impresión 3D
        </h2>

        {/* Campo para el Material */}
        <label className="block mb-2 text-sm font-medium text-green-600 ">Material</label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="Ej: PLA, ABS, PETG"
        />

        {/* Campo para el Peso */}
        <label className="block mb-2 text-sm font-medium text-green-600">
          Peso del filamento (gramos)
        </label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Ej: 76"
        />

        {/* Campo para el Tiempo de Impresión */}
        <label className="block mb-2 text-sm font-medium text-green-600">
          Horas de impresión
        </label>
        <div className="flex space-x-4">
          <input
            className="w-1/2 p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Horas"
          />
          <input
            className="w-1/2 p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutos"
          />
        </div>

        {/* Campo para el Costo de la Electricidad */}
        <label className="block mb-2 text-sm font-medium text-green-600">
          Costo de electricidad (por kWh)
        </label>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
          type="number"
          value={electricityCost}
          onChange={(e) => setElectricityCost(e.target.value)}
          placeholder="Ej: 63.71"
        />

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Calcular
        </button>
      </form>
    </div>
  );
}
