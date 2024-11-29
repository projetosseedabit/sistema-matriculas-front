

interface ClassCardProps {
    id: number;
    value: number;
    checked: boolean;
    dayOfWeek: string;
    mode: string;
    totalVacancies: number | null;
    vacanciesFilled: number | null;
    time: string;
    price: number;
    onChange: (value: number) => void;
  }
  
  export const ClassCard: React.FC<ClassCardProps> = ({
    dayOfWeek,
    mode,
    id,
    value,
    checked,
    time,
    totalVacancies,
    vacanciesFilled,
    price,
    onChange,
  }) => {
    return (
      <div className="border-sky-950 border-2 rounded-md px-6 py-4 mx-auto max-w-3xl flex space-x-4 items-center">
        {/* Input Rádio */}
        <input
          type="radio"
          className={`accent-sky-950 scale-125`}
          name={id.toString()}
          value={value.toString()}
          checked={checked}
          onChange={() => onChange(value)}
        />
  
        {/* Informações da Turma */}
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">
            Turma {dayOfWeek} - <strong>{mode}</strong>
          </h2>
          <h3 className="text-sm text-gray-600">Horário: {time}</h3>
          <div className="flex justify-between items-center mt-2">
            <h3 className="text-sm text-gray-600">
              Vagas {vacanciesFilled} | {totalVacancies}
            </h3>
            <h3 className="text-sm font-medium">
              Matrícula | R${price}
            </h3>
          </div>
        </div>
      </div>
    );
  };
  