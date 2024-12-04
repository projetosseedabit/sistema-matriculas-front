interface ClassCardProps {
    id: number;
    value: number;
    checked: boolean;
    dayOfWeek: string;
    mode: string;
    totalVacancies: number | null;
    vacanciesLeft: number | null;
    endTime: string;
    startTime: string;
    price: number;
    name: string;
    onChange: (value: number) => void;
}

function getFormattedHour(time: string): string {
    const [hour, minute] = time.split(":");
    if (minute == "00") {
        return `${hour}h`;
    }
    return `${hour}h${minute}min`;
}

export const ClassCard: React.FC<ClassCardProps> = ({
    dayOfWeek,
    mode,
    id,
    value,
    checked,
    startTime,
    endTime,
    totalVacancies,
    vacanciesLeft,
    price,
    name,
    onChange,
}) => {
    return (
        <label
            htmlFor={id.toString()}
            className="border-azul border-2 rounded-md px-6 py-4 mx-auto max-w-3xl flex space-x-4 justify-between items-center text-azul"
        >
            <div className="flex items-center gap-4">
                <input
                    type="radio"
                    className="accent-azul w-7 h-7"
                    name={id.toString()}
                    value={value.toString()}
                    checked={checked}
                    onChange={() => onChange(value)}
                    id={id.toString()}
                />
                <div>
                    <h2 className="text-xl font-bold">
                        {name} - {mode}
                    </h2>
                    <h3 className="text-base font-medium flex gap-2 mt-2">
                        Horário
                        <p className="font-bold">
                            {dayOfWeek} das {getFormattedHour(startTime)} às{" "}
                            {getFormattedHour(endTime)}
                        </p>
                    </h3>
                    {mode === "Presencial" ? (
                        <div className="flex justify-between items-center">
                            <h3 className="text-base font-medium">
                                <span className="w-[3.75rem]">Vagas</span>{" "}
                                <span className="font-bold">
                                    {vacanciesLeft}
                                </span>{" "}
                                | {totalVacancies}
                            </h3>
                        </div>
                    ) : null}
                </div>
            </div>

            <h3 className="flex gap-2 items-center text-lg font-medium">
                Matrícula{" "}
                <span className="font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    }).format(price)}
                </span>
            </h3>
        </label>
    );
};
