"use client";

import { useEffect, useState } from "react";
import { AdminClassCard } from "@/components/AdminClassCard";
import { fetchWithToken } from "@/utils";

type Class = {
    id: number; // 5
    fullName: string; // "Turma 2"
    lessonSchedule: string; //  "SEG|14:00-16:00"
    mode: "IN_PERSON" | "ONLINE"; // "IN_PERSON"
    maxSeats: number; // 40
    availableSeats: number; // 16
    createdAt: string; // "2021-09-20T19:00:00"
};

type ClassesResponse = {
    allClass: Class[];
};

function getScheduleInfo(lessonSchedule: string): {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
} {
    console.log(lessonSchedule);
    // Grupo 1: Dia
    // Grupo 2 (opcional): "às"
    // Grupo 3: Hora de início
    // Grupo 4 (opcional): Hora de término
    const regex = new RegExp(
        /([a-zA-Z\-çá]+)\s*(às)*\s*(\d{2}h)\s*\-?\s*(\d{2}h)*/
    );

    // const dayOfWeek = lessonSchedule.split("|")[0];
    // const startTime = lessonSchedule.split("|")[1].split("-")[0];
    // const endTime = lessonSchedule.split("|")[1].split("-")[1];

    const match = lessonSchedule.match(regex);

    if (!match) {
        throw new Error("Invalid lesson schedule format");
    }

    const dayOfWeek = match[1];
    const startTime = match[3].replace("h", ":00");

    let endTime = "";

    if (!match[4]) {
        // calculate +2h from startTime
        const startTimeHours = parseInt(startTime.split("h")[0]);
        const endTimeHours = startTimeHours + 2;

        endTime = `${endTimeHours}:00`;
    } else {
        endTime = match[4].replace("h", ":00");
    }

    return {
        dayOfWeek,
        startTime,
        endTime,
    };
}

// function formatDayOfWeek(dayOfWeek: string): string {
//     switch (dayOfWeek) {
//         case "SEG":
//             return "Segunda";
//         case "TER":
//             return "Terça";
//         case "QUA":
//             return "Quarta";
//         case "QUI":
//             return "Quinta";
//         case "SEX":
//             return "Sexta";
//         case "SAB":
//             return "Sábado";
//         case "DOM":
//             return "Domingo";
//         default:
//             return "";
//     }
// }

export default function Classes() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [isLoadingClasses, setIsLoadingClasses] = useState(false);
    const [classesError, setClassesError] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const [turmaParaExcluir, setTurmaParaExcluir] = useState<
        Pick<Class, "id" | "fullName">
    >({
        id: 0,
        fullName: "",
    });

    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    function handleDeleteClass(id: number, name: string) {
        setOpenDialog(true);
        setTurmaParaExcluir({
            id,
            fullName: name,
        });
    }

    function handleCancelDelete() {
        setOpenDialog(false);
        setTurmaParaExcluir({
            id: 0,
            fullName: "",
        });
    }

    function handleConfirmDelete() {
        setIsLoadingDelete(true);
        fetchWithToken(
            `https://king-prawn-app-3bepj.ondigitalocean.app/class/${turmaParaExcluir.id}`,
            {
                method: "DELETE",
            }
        )
            .then(() => {
                fetchClasses();
                setIsLoadingDelete(false);
                setOpenDialog(false);
                setTurmaParaExcluir({
                    id: 0,
                    fullName: "",
                });
                setDeleteError("");
            })
            .catch((err) => {
                console.error(err);
                setDeleteError("Erro ao deletar turma");
            });
    }

    async function fetchClasses() {
        try {
            setIsLoadingClasses(true);
            const response = await fetchWithToken(
                "https://king-prawn-app-3bepj.ondigitalocean.app/class"
            );

            const data: ClassesResponse = await response.json();
            console.log(data);

            setClasses(data.allClass);
            setIsLoadingClasses(false);
        } catch (err) {
            console.error(err);
            setClassesError("Erro ao carregar turmas");
        } finally {
            setIsLoadingClasses(false);
        }
    }

    useEffect(() => {
        fetchClasses();
    }, []);

    return (
        <>
            <div
                data-open={openDialog}
                className="data-[open=false]:hidden fixed w-screen h-screen top-0 left-0 bg-black/80 flex justify-center items-center"
            >
                <div className="bg-white flex flex-col items-center gap-4 px-8 py-4 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="65"
                        fill="none"
                        viewBox="0 0 64 65"
                    >
                        <path
                            fill="#FFD84F"
                            d="M32 19.417a2.667 2.667 0 0 0-2.667 2.666V32.75a2.667 2.667 0 1 0 5.334 0V22.084A2.667 2.667 0 0 0 32 19.417m2.453 22.987a2 2 0 0 0-.24-.48l-.32-.4a2.67 2.67 0 0 0-2.906-.56c-.324.135-.621.324-.88.56a2.67 2.67 0 0 0-.774 1.893c.005.348.077.693.214 1.013a2.4 2.4 0 0 0 1.44 1.44 2.5 2.5 0 0 0 2.026 0 2.4 2.4 0 0 0 1.44-1.44c.137-.32.21-.665.214-1.013a4 4 0 0 0 0-.534 1.7 1.7 0 0 0-.214-.48M32 6.084a26.667 26.667 0 1 0 0 53.334 26.667 26.667 0 0 0 0-53.334m0 48a21.333 21.333 0 1 1 0-42.667 21.333 21.333 0 0 1 0 42.667"
                        ></path>
                    </svg>
                    <p className="w-[18.75rem] text-center text-lg font-medium">
                        Tem certeza que deseja excluir a turma &quot;
                        {turmaParaExcluir.fullName}&quot;?
                    </p>
                    <div className="w-[18.75rem] flex justify-between font-semibold">
                        <button
                            onClick={handleConfirmDelete}
                            className="px-5 py-1 rounded bg-transparent text-vermelho border border-vermelho"
                            disabled={isLoadingDelete}
                        >
                            {isLoadingDelete ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        className="opacity-25"
                                    ></circle>
                                    <path
                                        fill="currentColor"
                                        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z"
                                        className="opacity-75"
                                    ></path>
                                </svg>
                            ) : (
                                "Sim"
                            )}
                        </button>
                        <button
                            onClick={handleCancelDelete}
                            className="px-5 py-1 rounded bg-vermelho text-branco"
                        >
                            Não
                        </button>

                        {deleteError && (
                            <p className="text-vermelho text-sm">
                                {deleteError}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-8 pl-8 space-y-8">
                <h1 className="text-4xl font-bold">Turmas</h1>

                <div className="flex flex-col gap-4">
                    {isLoadingClasses
                        ? "Carregando turmas..."
                        : classesError !== ""
                        ? classesError
                        : classes.map((c) => {
                              const { dayOfWeek, startTime, endTime } =
                                  getScheduleInfo(c.lessonSchedule);
                              return (
                                  <AdminClassCard
                                      key={c.id}
                                      dayOfWeek={dayOfWeek}
                                      mode={
                                          c.mode === "IN_PERSON"
                                              ? "Presencial"
                                              : "Online"
                                      }
                                      id={c.id}
                                      price={c.mode === "IN_PERSON" ? 90 : 75}
                                      startTime={startTime}
                                      endTime={endTime}
                                      totalVacancies={c.maxSeats}
                                      vacanciesFilled={c.availableSeats}
                                      name={c.fullName}
                                      handleDeleteClass={handleDeleteClass}
                                  />
                              );
                          })}
                </div>
            </div>
        </>
    );
}
