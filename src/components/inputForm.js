"use client";
import { useState } from "react";

export default function InputForm() {
  // Estados para capturar los datos del usuario
  const [material, setMaterial] = useState("PLA");
  const [weight, setWeight] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [electricityCost, setElectricityCost] = useState("");

  // Estado para almacenar el resultado
  const [result, setResult] = useState(null);

  // Precios de los materiales
  const materialPrices = {
    PLA: 14000, // Precio por kilogramo en pesos argentinos
    PETG: 18000,
    ABS: 15000,
    otro: 13000,
  };

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Conversión de horas y minutos en total de horas
    const totalHours = parseFloat(hours) + parseFloat(minutes) / 60;

    // Cálculos de costos
    const materialCost = (parseFloat(weight) / 1000) * materialPrices[material]; // Precio según el material seleccionado
    const electricityUsed = totalHours * 0.25; // Consumo de 250W convertido a kWh
    const electricityCostTotal = electricityUsed * parseFloat(electricityCost);

    // Desgaste de la impresora
    const wearAndTearCost = totalHours * 30; // $30 por hora

    // Costo total antes del margen de error y ganancia
    const baseCost = materialCost + electricityCostTotal + wearAndTearCost;

    // Aplicar margen de error del 30%
    const errorMarginCost = baseCost * 1.3;

    // Aplicar margen de ganancia 2x
    const finalCost = errorMarginCost * 2;

    // Guardamos el resultado
    setResult({
      materialCost,
      electricityCostTotal,
      wearAndTearCost,
      baseCost,
      errorMarginCost,
      finalCost,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-green-400">
          Calcular Costo de Impresión 3D
        </h2>

        {/* Campo para el Material */}
        <label className="block mb-2 text-sm font-medium text-green-600">
          Material
        </label>
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded-md text-blue-900"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="ABS">ABS</option>
          <option value="otro">Otro</option>
        </select>

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

      {/* Mostrar resultados si los hay */}
      {result && (
        <div className="bg-white mt-6 p-4 rounded-lg shadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4 text-center text-green-400">
            Resultados
          </h3>
          <p className="text-green-600">
            <strong>Costo del material:</strong>{" "}
            {result.materialCost.toFixed(2)} pesos
          </p>
          <p className="text-green-600">
            <strong>Costo de electricidad:</strong>{" "}
            {result.electricityCostTotal.toFixed(2)} pesos
          </p>
          <p className="text-green-600">
            <strong>Costo por desgaste de impresora:</strong>{" "}
            {result.wearAndTearCost.toFixed(2)} pesos
          </p>
          <p className="text-green-600">
            <strong>Costo total antes del margen:</strong>{" "}
            {result.baseCost.toFixed(2)} pesos
          </p>
          <p className="text-green-600">
            <strong>Costo con margen de error:</strong>{" "}
            {result.errorMarginCost.toFixed(2)} pesos
          </p>
          <p className="text-green-600">
            <strong>Precio final:</strong> {result.finalCost.toFixed(2)} pesos
          </p>
        </div>
      )}
    </div>
  );
}
