"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import "@fontsource/poppins";

type Result = {
  materialCost: number;
  electricityCostTotal: number;
  wearAndTearCost: number;
  baseCost: number;
  errorMarginCost: number;
  finalCost: number;
};

const toNumber = (value: string): number => {
  if (!value) return 0;
  const num = parseFloat(value.replace(",", "."));
  return isNaN(num) ? 0 : num;
};

export default function InputForm() {
  const [material, setMaterial] = useState<string>("PLA");
  const [weight, setWeight] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [electricityCost, setElectricityCost] = useState<string>("");
  const [materialPrice, setMaterialPrice] = useState<string>("14000"); // ARS/kg

  const [result, setResult] = useState<Result | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalHours = toNumber(hours) + toNumber(minutes) / 60;

    const materialCost =
      (toNumber(weight) / 1000) * toNumber(materialPrice);

    // 0.25 kWh por hora ≈ impresora de 250W
    const electricityUsed = totalHours * 0.25;
    const electricityCostTotal =
      electricityUsed * toNumber(electricityCost);

    const wearAndTearCost = totalHours * 30; // $30 por hora

    const baseCost = materialCost + electricityCostTotal + wearAndTearCost;

    const errorMarginCost = baseCost * 1.3; // +30%
    const finalCost = errorMarginCost * 2;  // x2 de ganancia

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
    <div
      className="w-full flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* FORMULARIO */}
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-left text-blue-600">
          Calcular Costo de Impresión 3D
        </h2>

        {/* Material */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Material
        </label>
        <select
          className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="ABS">ABS</option>
          <option value="otro">Otro</option>
        </select>
        <p className="text-xs text-gray-500 mb-4">
          Selecciona el material utilizado para la impresión.
        </p>

        {/* Precio material */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Precio del material (por kg)
        </label>
        <input
          className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
          type="number"
          value={materialPrice}
          onChange={(e) => setMaterialPrice(e.target.value)}
          min={0}
        />
        <p className="text-xs text-gray-500 mb-4">
          Precio del filamento en pesos argentinos por kilogramo.
        </p>

        {/* Peso */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Peso del filamento (gramos)
        </label>
        <input
          className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Ej: 76"
          min={0}
        />
        <p className="text-xs text-gray-500 mb-4">
          Ingresa el peso del filamento utilizado en gramos.
        </p>

        {/* Tiempo impresión */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Horas de impresión
        </label>
        <div className="flex space-x-4">
          <input
            className="w-1/2 p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Horas"
            min={0}
          />
          <input
            className="w-1/2 p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="Minutos"
            min={0}
          />
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Ingresa las horas y minutos totales de impresión.
        </p>

        {/* Costo electricidad */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Costo de electricidad (por kWh)
        </label>
        <input
          className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
          type="number"
          value={electricityCost}
          onChange={(e) => setElectricityCost(e.target.value)}
          placeholder="Ej: 63.71"
          min={0}
        />
        <p className="text-xs text-gray-500 mb-4">
          Costo de la electricidad en tu región en pesos por kWh.
        </p>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
        >
          Calcular
        </button>
      </form>

      {/* RESULTADOS */}
      {result && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <h3 className="text-xl font-bold mb-6 text-center text-blue-600">
            Resultados
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-blue-800 font-semibold">
                Costo del material: {result.materialCost.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Costo del filamento utilizado según peso y precio por kg.
              </p>
            </div>

            <div>
              <p className="text-blue-800 font-semibold">
                Costo de electricidad:{" "}
                {result.electricityCostTotal.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Costo de energía para toda la duración de la impresión.
              </p>
            </div>

            <div>
              <p className="text-blue-800 font-semibold">
                Costo por desgaste de impresora:{" "}
                {result.wearAndTearCost.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Desgaste estimado en $30 por hora de impresión.
              </p>
            </div>

            <div>
              <p className="text-blue-800 font-semibold">
                Costo total antes del margen: {result.baseCost.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Suma de materiales, electricidad y desgaste, sin márgenes.
              </p>
            </div>

            <div>
              <p className="text-blue-800 font-semibold">
                Costo con margen de error:{" "}
                {result.errorMarginCost.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Incluye un 30% extra para cubrir fallos o imprevistos.
              </p>
            </div>

            <div className="border-double border-4 border-green-500 p-4">
              <p className="text-green-500 font-semibold text-lg">
                Precio final sugerido: {result.finalCost.toFixed(2)} pesos
              </p>
              <p className="text-sm text-gray-600">
                Precio sugerido de venta, incluyendo costos, margen de error y
                una ganancia adecuada.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
