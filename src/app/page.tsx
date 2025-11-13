import InputForm from "@/components/inputForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        {/* Encabezado */}
        <header className="mb-8 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-2">
            Herramienta para makers
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Calculadora de Costos de Impresión 3D
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            Ingresá los datos de tu pieza, consumo y electricidad para obtener
            un precio sugerido de venta que contemple materiales, energía,
            desgaste de la impresora y margen de ganancia.
          </p>
        </header>

        {/* Contenido principal: formulario + resultados */}
        <InputForm />
      </div>
    </div>
  );
}
