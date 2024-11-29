interface ClassCardProps {
    //O backend as turmas tem um Id(number) que o diferencia. Para gerenciamento de estado é nescessário que cada input tenha um name (String).
    // Nesse caso, é necessário fazer a conversão de int para string e vice-versa quando necessário.
    id: number, 
    value: number;
    checked: boolean;
    dayOfWeek: string,
    modality: string,
    totalVacancies: number | null,
    vacanciesFilled: number | null,
    time: string,
    price: number
    onChange: (value: number) => void;
}


export const ClassCard: React.FC<ClassCardProps> = ({dayOfWeek, modality, id,  value, checked, time, totalVacancies, vacanciesFilled, price, onChange }: ClassCardProps) => {
    return (
        <>
            <div className="border-sky-950 border-2 rounded-md px-8 py-5 mx-60 flex space-x-8 ">
                <input type="radio" className={'accent-sky-950 ${checked ? "accent-sky-950" : "accent-sky-950"} scale-125'} name={id.toString()} value={value.toString()}
                    checked={checked}
                    onChange={() => onChange(value)}/>
                <div className="flex flex-col w-full">
                    <h2>Turma {dayOfWeek} - <strong>{modality}</strong></h2>
                    <h3>Horário: {time}</h3>
                    <div className="flex justify-between w-full">
                        <h3>Vagas {vacanciesFilled} | {totalVacancies} </h3>
                        <h3>Matrícula | R${price}</h3>
                    </div>
                </div>

            </div>
        </>
    )
}