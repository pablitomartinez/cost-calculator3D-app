"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import "@fontsource/poppins"; // Importa la fuente globalmente

export default function InputForm() {
  // Estados para capturar los datos del usuario
  const [material, setMaterial] = useState("PLA");
  const [weight, setWeight] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [materialPrice, setMaterialPrice] = useState(14000); // Precio por defecto de PLA

  // Estado para almacenar el resultado
  const [result, setResult] = useState(null);

  // Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Conversión de horas y minutos en total de horas
    const totalHours = parseFloat(hours) + parseFloat(minutes) / 60;

    // Cálculos de costos
    const materialCost =
      (parseFloat(weight) / 1000) * parseFloat(materialPrice);
    const electricityUsed = totalHours * 0.25;
    const electricityCostTotal = electricityUsed * parseFloat(electricityCost);

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Formulario */}
        <form
          className="bg-white p-8 rounded-lg shadow-lg w-full md:w-2/3"
          onSubmit={handleSubmit}
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <h2 className="text-3xl font-bold mb-6 text-left text-blue-600">
            Calcular Costo de Impresión 3D
          </h2>

          {/* Campo para el Material */}
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

          {/* Campo para el Precio del Material */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Precio del material (por kg)
          </label>
          <input
            className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={materialPrice}
            onChange={(e) => setMaterialPrice(e.target.value)}
          />
          <p className="text-xs text-gray-500 mb-4">
            Ingresa el precio actual del filamento en pesos argentinos por
            kilogramo.
          </p>

          {/* Campo para el Peso */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Peso del filamento (gramos)
          </label>
          <input
            className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ej: 76"
          />
          <p className="text-xs text-gray-500 mb-4">
            Ingresa el peso del filamento utilizado en gramos.
          </p>

          {/* Campo para el Tiempo de Impresión */}
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
            />
            <input
              className="w-1/2 p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Minutos"
            />
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Ingresa las horas y minutos totales de impresión.
          </p>

          {/* Campo para el Costo de la Electricidad */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Costo de electricidad (por kWh)
          </label>
          <input
            className="w-full p-3 mb-1 border border-gray-300 rounded-md text-blue-900"
            type="number"
            value={electricityCost}
            onChange={(e) => setElectricityCost(e.target.value)}
            placeholder="Ej: 63.71"
          />
          <p className="text-xs text-gray-500 mb-4">
            Ingresa el costo de la electricidad en tu región en pesos por kWh.
          </p>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          >
            Calcular
          </button>
        </form>

        {/* Mostrar resultados si los hay */}
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
                  Esto representa el costo del filamento utilizado basado en el
                  peso y precio por kg.
                </p>
              </div>

              <div>
                <p className="text-blue-800 font-semibold">
                  Costo de electricidad:{" "}
                  {result.electricityCostTotal.toFixed(2)} pesos
                </p>
                <p className="text-sm text-gray-600">
                  Este es el costo de la electricidad para la duración total de
                  la impresión.
                </p>
              </div>

              <div>
                <p className="text-blue-800 font-semibold">
                  Costo por desgaste de impresora:{" "}
                  {result.wearAndTearCost.toFixed(2)} pesos
                </p>
                <p className="text-sm text-gray-600">
                  El desgaste se estima a $30 por hora de impresión.
                </p>
              </div>

              <div>
                <p className="text-blue-800 font-semibold">
                  Costo total antes del margen: {result.baseCost.toFixed(2)}{" "}
                  pesos
                </p>
                <p className="text-sm text-gray-600">
                  Este es el costo total de los materiales, electricidad y
                  desgaste antes de aplicar los márgenes de error y ganancia.
                </p>
              </div>

              <div>
                <p className="text-blue-800 font-semibold">
                  Costo con margen de error: {result.errorMarginCost.toFixed(2)}{" "}
                  pesos
                </p>
                <p className="text-sm text-gray-600">
                  El margen de error del 30% se añade para cubrir posibles
                  imprevistos o fallos en la impresión.
                </p>
              </div>

              <div className="border-double border-4 border-green-500 p-4 ">
                <p className="text-green-500 font-semibold">
                  Precio final: {result.finalCost.toFixed(2)} pesos
                </p>
                <p className="text-sm text-gray-600">
                  Este es el precio sugerido de venta para la pieza impresa,
                  incluyendo todos los costos y márgenes. Este precio te asegura
                  cubrir los costos de materiales, energía, desgaste y un margen
                  de ganancia adecuado.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
