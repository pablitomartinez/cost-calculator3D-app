"use client";

import { useState, FormEvent, useEffect } from "react";
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

// Variantes de animación para el botón
const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: "0 0 0px rgba(34,211,238,0)",
    filter: "blur(0px)",
  },
  hover: {
    scale: 1.05,
    boxShadow: [
      "0 0 0px rgba(34,211,238,0)",
      "0 0 25px rgba(34,211,238,0.9)",
      "0 0 40px rgba(34,211,238,0.4)",
    ],
    filter: ["blur(0px)", "blur(1.5px)", "blur(0.5px)", "blur(0px)"],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  crazy: {
    scale: [1, 1.06, 0.97, 1.03, 1],
    boxShadow: [
      "0 0 0px rgba(34,211,238,0)",
      "0 0 30px rgba(34,211,238,1)",
      "0 0 50px rgba(34,211,238,0.4)",
      "0 0 15px rgba(34,211,238,0.8)",
      "0 0 0px rgba(34,211,238,0)",
    ],
    filter: ["blur(0px)", "blur(2px)", "blur(1px)", "blur(0px)", "blur(1px)"],
    transition: {
      duration: 1.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function InputForm() {
  const [material, setMaterial] = useState<string>("PLA");
  const [weight, setWeight] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [electricityCost, setElectricityCost] = useState<string>("");
  const [materialPrice, setMaterialPrice] = useState<string>("14000");

  const [result, setResult] = useState<Result | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile para usar animación constante
  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const totalHours = toNumber(hours) + toNumber(minutes) / 60;

    const materialCost =
      (toNumber(weight) / 1000) * toNumber(materialPrice);

    const electricityUsed = totalHours * 0.25; // 0.25 kWh por hora
    const electricityCostTotal =
      electricityUsed * toNumber(electricityCost);

    const wearAndTearCost = totalHours * 30; // $30 por hora

    const baseCost = materialCost + electricityCostTotal + wearAndTearCost;

    const errorMarginCost = baseCost * 1.3; // +30%
    const finalCost = errorMarginCost * 2; // x2 ganancia

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
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* FORMULARIO */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900/70 border border-slate-800 shadow-xl shadow-slate-950/40 rounded-2xl p-5 sm:p-6 lg:p-7 backdrop-blur-sm"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-white flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
          Datos de la impresión
        </h2>

        <div className="space-y-4">
          {/* Material */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Material
            </label>
            <select
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="PLA">PLA</option>
              <option value="PETG">PETG</option>
              <option value="ABS">ABS</option>
              <option value="otro">Otro</option>
            </select>
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Podés elegir PLA para la mayoría de las piezas decorativas.
            </p>
          </div>

          {/* Precio material */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Precio del material (por kg)
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              type="number"
              value={materialPrice}
              onChange={(e) => setMaterialPrice(e.target.value)}
              min={0}
            />
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Precio del rollo por kilogramo en pesos argentinos.
            </p>
          </div>

          {/* Peso */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Peso utilizado (gramos)
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ej: 76"
              min={0}
            />
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Podés sacar este dato del slicer (Cura, PrusaSlicer, etc.).
            </p>
          </div>

          {/* Tiempo impresión */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Tiempo de impresión
            </label>
            <div className="flex gap-3">
              <input
                className="w-1/2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Horas"
                min={0}
              />
              <input
                className="w-1/2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutos"
                min={0}
              />
            </div>
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Tiempo total estimado según tu slicer.
            </p>
          </div>

          {/* Electricidad */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
              Costo de electricidad (por kWh)
            </label>
            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
              type="number"
              value={electricityCost}
              onChange={(e) => setElectricityCost(e.target.value)}
              placeholder="Ej: 63.71"
              min={0}
            />
            <p className="mt-1 text-[0.7rem] text-slate-400">
              Podés estimarlo a partir de tu última factura.
            </p>
          </div>

          {/* Botón con animación loca */}
          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="rest"
            animate={isMobile ? "crazy" : "rest"}
            whileHover={isMobile ? undefined : "hover"}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition-colors hover:bg-cyan-400 overflow-hidden relative"
          >
            <span className="relative z-10">Calcular costo</span>
            {/* brillo interno sutil */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-teal-300/20 to-cyan-500/30 opacity-60" />
          </motion.button>
        </div>
      </motion.form>

      {/* RESULTADOS */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-xl shadow-slate-950/40 backdrop-blur-sm flex flex-col"
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
          Resumen de costos
        </h3>

        {!result && (
          <p className="text-sm text-slate-400">
            Completá los datos de la impresión y calculá el costo total de la
            pieza, incluyendo materiales, energía, desgaste y ganancia.
          </p>
        )}

        {result && (
          <div className="space-y-4 text-sm text-slate-100">
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-slate-200">
                  Costo del material
                </p>
                <p className="text-xs text-slate-400">
                  Filamento según peso y precio por kg.
                </p>
              </div>
              <p className="font-semibold text-cyan-300">
                {result.materialCost.toFixed(2)} ARS
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-slate-200">
                  Costo de electricidad
                </p>
                <p className="text-xs text-slate-400">
                  Energía consumida durante toda la impresión.
                </p>
              </div>
              <p className="font-semibold text-cyan-300">
                {result.electricityCostTotal.toFixed(2)} ARS
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-slate-200">
                  Desgaste de impresora
                </p>
                <p className="text-xs text-slate-400">
                  Estimado en $30 por hora de uso.
                </p>
              </div>
              <p className="font-semibold text-cyan-300">
                {result.wearAndTearCost.toFixed(2)} ARS
              </p>
            </div>

            <hr className="border-slate-800 my-3" />

            <div className="flex justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-100">Costo base</p>
                <p className="text-xs text-slate-400">
                  Suma de materiales, energía y desgaste.
                </p>
              </div>
              <p className="font-semibold text-emerald-300">
                {result.baseCost.toFixed(2)} ARS
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-slate-200">
                  Costo con margen de error
                </p>
                <p className="text-xs text-slate-400">
                  Incluye un 30% extra para fallos o imprevistos.
                </p>
              </div>
              <p className="font-semibold text-amber-300">
                {result.errorMarginCost.toFixed(2)} ARS
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-emerald-500/70 bg-gradient-to-r from-emerald-500/15 via-emerald-400/10 to-cyan-500/15 px-4 py-4">
              <p className="text-xs uppercase tracking-wide text-emerald-300 font-semibold mb-1">
                Precio final sugerido
              </p>
              <p className="text-2xl font-bold text-emerald-200 mb-1">
                {result.finalCost.toFixed(2)} ARS
              </p>
              <p className="text-[0.75rem] text-emerald-100/80">
                Este es el precio recomendado de venta, incluyendo costos,
                margen de error y una ganancia razonable. Podés ajustarlo según
                el tipo de cliente o complejidad del modelo.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
