interface ProgressBarProps {
  currentStep: number; // Etapa atual (1 a 4)
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const totalSteps = 4;
  const steps = ["Turmas", "Cadastro", "Pagamento", "Finalizar"]; // Textos abaixo das esferas

  return (
    <div className="flex flex-col items-center my-8 w-full">
      {/* Barra de progresso */}
      <div className="flex items-center justify-center w-full max-w-4xl relative">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const isActive = step <= currentStep; // Passos preenchidos
          const isLineActive = step < currentStep; // Linhas preenchidas (esquerda da esfera ativa)

          return (
            <div key={step} className="flex items-center">
              {/* Esfera */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                ${isActive ? "bg-[#003960] text-white" : "bg-[#D9D9D9] text-black"}`}
              >
                {step}
              </div>
              {/* Linha (se não for a última esfera) */}
              {step !== totalSteps && (
                <div
                  className={`h-2 w-16 ${isLineActive ? "bg-[#003960]" : "bg-[#D9D9D9]"}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Textos abaixo das esferas */}
      <div className="flex justify-between w-full max-w-4xl mt-2">
        {steps.map((text, index) => (
          <span
            key={index}
            className="text-sm font-medium text-center"
            style={{
              color: index + 1 <= currentStep ? "#003960" : "#000000",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
