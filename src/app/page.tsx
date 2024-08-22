import InputForm from "@/components/inputForm";

export default function Home() {
  return (
    <div className=" min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Contenedor principal */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl text-center">
        {/* Título */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Calculadora de Costos de Impresión 3D
        </h1>

        {/* Descripción */}
        <p className="text-lg text-gray-700 mb-6">
          Bienvenido a la Calculadora de Costos de Impresión 3D. Utiliza esta
          herramienta para estimar el costo de tus impresiones 3D ingresando los
          detalles de los materiales, electricidad y tiempo de impresión.
        </p>

        {/* Formulario */}
        <InputForm />
      </div>
    </div>
  );
}
