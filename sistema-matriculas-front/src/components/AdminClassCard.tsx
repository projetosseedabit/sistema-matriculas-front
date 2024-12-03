import Link from "next/link";

interface ClassCardProps {
    id: number;
    dayOfWeek: string;
    mode: string;
    totalVacancies: number | null;
    vacanciesFilled: number | null;
    startTime: string;
    endTime: string;
    price: number;
    name: string;
    handleDeleteClass: (id: number, name: string) => void;
}

function getFormattedHour(time: string): string {
    const [hour, minute] = time.split(":");
    if (minute == "00") {
        return `${hour}h`;
    }
    return `${hour}h${minute}min`;
}

// function handleDeleteClass(id: number) {
//     fetchWithToken(
//         `https://king-prawn-app-3bepj.ondigitalocean.app/class/${id}`,
//         {
//             method: "DELETE",
//         }
//     );
// }

export const AdminClassCard: React.FC<ClassCardProps> = ({
    id,
    dayOfWeek,
    mode,
    startTime,
    endTime,
    totalVacancies,
    vacanciesFilled,
    price,
    name,
    handleDeleteClass,
}) => {
    return (
        <div className="text-azul border-azul border-2 rounded-md p-4 max-w-3xl flex justify-between items-center">
            <div className="flex flex-col gap-1">
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
                {totalVacancies === null ? null : (
                    <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium">
                            <span className="w-[3.75rem]">Vagas</span>{" "}
                            <span className="font-bold">{vacanciesFilled}</span>{" "}
                            | {totalVacancies}
                        </h3>
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-between items-end self-stretch">
                <div className="flex gap-4">
                    <Link
                        href={`/admin/turmas/editar/${id}`}
                        className="transition-colors bg-laranja hover:bg-[#E58000] rounded-full w-7 h-7 flex items-center justify-center shadow"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="none"
                            viewBox="0 0 22 22"
                        >
                            <path
                                fill="#fff"
                                d="M4.873 18.253h3.71a.88.88 0 0 0 .62-.254l6.056-6.064 2.485-2.432a.877.877 0 0 0 0-1.243l-3.71-3.754a.875.875 0 0 0-1.243 0l-2.467 2.477-6.073 6.063a.88.88 0 0 0-.253.622v3.71a.875.875 0 0 0 .875.875m8.54-11.892 2.476 2.477-1.243 1.242-2.476-2.476zm-7.665 7.665 5.188-5.188 2.477 2.476-5.19 5.189H5.749z"
                            ></path>
                        </svg>
                    </Link>
                    <button
                        onClick={() => {
                            handleDeleteClass(id, name);
                        }}
                        className="transition-colors bg-vermelho hover:bg-[#990000] rounded-full w-7 h-7 flex items-center justify-center shadow"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.25 16.5002C9.48206 16.5002 9.70462 16.4081 9.86872 16.244C10.0328 16.0799 10.125 15.8573 10.125 15.6252V10.3752C10.125 10.1432 10.0328 9.92062 9.86872 9.75653C9.70462 9.59243 9.48206 9.50024 9.25 9.50024C9.01794 9.50024 8.79538 9.59243 8.63128 9.75653C8.46719 9.92062 8.375 10.1432 8.375 10.3752V15.6252C8.375 15.8573 8.46719 16.0799 8.63128 16.244C8.79538 16.4081 9.01794 16.5002 9.25 16.5002ZM18 6.00024H14.5V5.12524C14.5 4.42905 14.2234 3.76137 13.7312 3.26909C13.2389 2.77681 12.5712 2.50024 11.875 2.50024H10.125C9.42881 2.50024 8.76113 2.77681 8.26884 3.26909C7.77656 3.76137 7.5 4.42905 7.5 5.12524V6.00024H4C3.76794 6.00024 3.54538 6.09243 3.38128 6.25653C3.21719 6.42062 3.125 6.64318 3.125 6.87524C3.125 7.10731 3.21719 7.32987 3.38128 7.49396C3.54538 7.65806 3.76794 7.75024 4 7.75024H4.875V17.3752C4.875 18.0714 5.15156 18.7391 5.64384 19.2314C6.13613 19.7237 6.80381 20.0002 7.5 20.0002H14.5C15.1962 20.0002 15.8639 19.7237 16.3562 19.2314C16.8484 18.7391 17.125 18.0714 17.125 17.3752V7.75024H18C18.2321 7.75024 18.4546 7.65806 18.6187 7.49396C18.7828 7.32987 18.875 7.10731 18.875 6.87524C18.875 6.64318 18.7828 6.42062 18.6187 6.25653C18.4546 6.09243 18.2321 6.00024 18 6.00024ZM9.25 5.12524C9.25 4.89318 9.34219 4.67062 9.50628 4.50653C9.67038 4.34243 9.89294 4.25024 10.125 4.25024H11.875C12.1071 4.25024 12.3296 4.34243 12.4937 4.50653C12.6578 4.67062 12.75 4.89318 12.75 5.12524V6.00024H9.25V5.12524ZM15.375 17.3752C15.375 17.6073 15.2828 17.8299 15.1187 17.994C14.9546 18.1581 14.7321 18.2502 14.5 18.2502H7.5C7.26794 18.2502 7.04538 18.1581 6.88128 17.994C6.71719 17.8299 6.625 17.6073 6.625 17.3752V7.75024H15.375V17.3752ZM12.75 16.5002C12.9821 16.5002 13.2046 16.4081 13.3687 16.244C13.5328 16.0799 13.625 15.8573 13.625 15.6252V10.3752C13.625 10.1432 13.5328 9.92062 13.3687 9.75653C13.2046 9.59243 12.9821 9.50024 12.75 9.50024C12.5179 9.50024 12.2954 9.59243 12.1313 9.75653C11.9672 9.92062 11.875 10.1432 11.875 10.3752V15.6252C11.875 15.8573 11.9672 16.0799 12.1313 16.244C12.2954 16.4081 12.5179 16.5002 12.75 16.5002Z"
                                fill="white"
                            />
                        </svg>
                    </button>
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
            </div>
        </div>
    );
};
