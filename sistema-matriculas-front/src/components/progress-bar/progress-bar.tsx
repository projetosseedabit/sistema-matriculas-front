interface ProgressBarProps {
    currentStep: number; // Etapa atual (1 a 4)
}

export function ProgressBar({ currentStep }: ProgressBarProps) {
    const totalSteps = 4;
    const steps = ["Turmas", "Cadastro", "Pagamento", "Finalizar"]; // Textos abaixo das esferas

    return (
        <div className="flex flex-col items-center my-8 w-full p-4">
            {/* Contêiner principal da barra de progresso */}
            <div className="flex items-center justify-center w-full max-w-4xl relative">
                {Array.from({ length: totalSteps }, (_, index) => {
                    const step = index + 1;
                    const isActive = step <= currentStep; // Passos preenchidos
                    const isLineActive = step < currentStep; // Linhas preenchidas (esquerda da esfera ativa)

                    return (
                        <div key={step} className="flex items-center">
                            {/* Esfera */}
                            <div className="flex flex-col items-center">
                                <div
                                    data-active={isActive}
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                data-[active=true]:bg-azul data-[active=true]:text-white data-[active=false]:bg-gray-300 data-[active=false]:text-gray-800 relative"
                                >
                                    {step}
                                    <span
                                        data-active={isActive}
                                        className="text-sm font-medium text-center absolute top-12 data-[active=true]:text-azul data-[active=false]:text-gray-900"
                                    >
                                        {steps[index]}
                                    </span>
                                </div>
                            </div>

                            {step !== totalSteps && (
                                <div
                                    data-active={isLineActive}
                                    className="h-2 w-12 sm:w-16 md:w-20 data-[active=true]:bg-azul data-[active=false]:bg-gray-200"
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
