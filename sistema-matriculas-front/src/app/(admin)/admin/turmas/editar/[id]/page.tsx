"use client";
import { fetchWithToken } from "@/utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

function getScheduleInfo(lessonSchedule: string): {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
} {
    const dayOfWeek = lessonSchedule.split("|")[0];
    const startTime = lessonSchedule.split("|")[1].split("-")[0];
    const endTime = lessonSchedule.split("|")[1].split("-")[1];

    return {
        dayOfWeek,
        startTime,
        endTime,
    };
}

export default function EditClassPage() {
    const { id } = useParams();

    const [availableSeats, setAvailableSeats] = useState<number | null>(0);
    const [originalMaxSeats, setOriginalMaxSeats] = useState<number | null>(0);
    const router = useRouter();

    const [maxSeatError, setMaxSeatError] = useState("");

    async function saveClass(event: FormEvent) {
        event.preventDefault();

        setIsLoading(true);

        const body: {
            fullName: string;
            lessonSchedule: string;
            mode: string;
            maxSeats: number | null;
            availableSeats: number | null;
            paymentAmount: number;
        } = {
            fullName: name,
            lessonSchedule: `${dayOfTheWeek}|${startTime}-${endTime}`,
            mode: mode,
            maxSeats: maxSeats,
            availableSeats: null,
            paymentAmount: enrollmentValue,
        };

        if (
            mode === "IN_PERSON" &&
            availableSeats !== null &&
            originalMaxSeats !== null &&
            maxSeats !== null
        ) {
            if (availableSeats + maxSeats - originalMaxSeats < 0) {
                setMaxSeatError(
                    "Quantidade de alunos inscritos é maior que a quantidade máxima de alunos."
                );
                return;
            }

            body.availableSeats = availableSeats + maxSeats - originalMaxSeats;
        }

        try {
            const response = await fetchWithToken(
                `https://king-prawn-app-3bepj.ondigitalocean.app/class/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setDialogMessage("Turma editada com sucesso!");
                setOpenDialog(true);
                setDialogType("success");
            } else {
                setDialogMessage("Erro ao editar turma.");
                setOpenDialog(true);
                setDialogType("error");
            }
        } catch (err) {
            setOpenDialog(true);
            setDialogMessage("Erro ao editar turma.");
            setDialogType("error");
        }
    }

    async function getClassData() {
        try {
            const response = await fetchWithToken(
                `https://king-prawn-app-3bepj.ondigitalocean.app/class/${id}`
            );
            const data: {
                class: {
                    id: number;
                    fullName: string;
                    lessonSchedule: string;
                    mode: "ONLINE" | "IN_PERSON";
                    maxSeats: null | number;
                    availableSeats: null | number;
                    createdAt: string;
                    paymentAmount: number;
                };
            } = await response.json();
            const fetchedClass = data.class;

            console.log("Fetched class:");
            console.log(fetchedClass);

            const { dayOfWeek, startTime, endTime } = getScheduleInfo(
                fetchedClass.lessonSchedule
            );

            setName(fetchedClass.fullName);
            setDayOfTheWeek(dayOfWeek);
            setStartTime(startTime);
            setEndTime(endTime);
            setMode(fetchedClass.mode);
            setEnrollmentValue(fetchedClass.paymentAmount);
            setMaxSeats(fetchedClass.maxSeats);

            setAvailableSeats(fetchedClass.availableSeats);
            setOriginalMaxSeats(fetchedClass.maxSeats);
        } catch (err) {
            console.error(`Erro ao buscar dados da turma: ${err}`);
        }
    }

    const [name, setName] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [mode, setMode] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [enrollmentValue, setEnrollmentValue] = useState(0);
    const [maxSeats, setMaxSeats] = useState<number | null>(0);

    useEffect(() => {
        getClassData();
    }, []);

    useEffect(() => {
        setMaxSeatError("");
    }, [maxSeats]);

    const [dialogMessage, setDialogMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogType, setDialogType] = useState<"success" | "error">(
        "success"
    );

    return (
        <>
            <div
                data-open={openDialog}
                className="data-[open=false]:hidden fixed w-screen h-screen top-0 left-0 bg-black/80 flex justify-center items-center"
            >
                <div className="bg-white flex flex-col items-center gap-4 px-8 py-4 rounded-lg">
                    {dialogType === "success" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="65"
                            fill="none"
                            viewBox="0 0 64 65"
                        >
                            <g clipPath="url(#clip0_2503_272)">
                                <circle
                                    cx="32"
                                    cy="32.75"
                                    r="32"
                                    fill="#4BB002"
                                ></circle>
                                <path
                                    stroke="#FAFAFA"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="5.6"
                                    d="M51.6 21.95 25.467 48.082 12.4 35.017"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_2503_272">
                                    <path
                                        fill="#fff"
                                        d="M0 .75h64v64H0z"
                                    ></path>
                                </clipPath>
                            </defs>
                        </svg>
                    ) : (
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
                    )}
                    <p className="w-[18.75rem] text-center text-lg font-medium">
                        {dialogMessage}{" "}
                    </p>

                    <button
                        onClick={() => {
                            setOpenDialog(false);
                            setDialogMessage("");
                            router.push("/admin/turmas");
                        }}
                        className="px-5 py-1 rounded bg-laranja text-branco"
                    >
                        OK
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="px-8 py-6 rounded-lg border-2 border-azul">
                    <div className="w-[26rem] text-azul">
                        <h1 className="text-left text-black font-bold text-xl">
                            Editar turma
                        </h1>
                        <form
                            className="space-y-4 text-sm mt-8"
                            onSubmit={saveClass}
                        >
                            <div className="w-full flex justify-between items-center">
                                <label htmlFor="name" className="font-semibold">
                                    Nome da turma
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-52 text-azul placeholder:text-zinc-500 px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex justify-between items-center text-azul">
                                <label htmlFor="dia" className="font-semibold">
                                    Selecione o dia da turma
                                </label>
                                <select
                                    name="dia"
                                    id="dia"
                                    className="w-52 text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                    value={dayOfTheWeek}
                                    onChange={(e) =>
                                        setDayOfTheWeek(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Dia da turma
                                    </option>
                                    <option value="SEG">Segunda-feira</option>
                                    <option value="TER">Terça-feira</option>
                                    <option value="QUA">Quarta-feira</option>
                                    <option value="QUI">Quinta-feira</option>
                                    <option value="SEX">Sexta-feira</option>
                                </select>
                            </div>
                            <div className="w-full flex justify-between items-center text-azul">
                                <label
                                    htmlFor="modalidade"
                                    className="font-semibold"
                                >
                                    Selecione a modalidade
                                </label>
                                <select
                                    name="modalidade"
                                    id="modalidade"
                                    className="w-52 text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Modalidade da turma
                                    </option>
                                    <option value="ONLINE">Online</option>
                                    <option value="IN_PERSON">
                                        Presencial
                                    </option>
                                </select>
                            </div>
                            <div className="w-full flex justify-between items-center text-azul">
                                <label
                                    htmlFor="startTime"
                                    className="font-semibold"
                                >
                                    Horário a modalidade
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="time"
                                        name="startTime"
                                        id="startTime"
                                        className="w-[5.5rem] text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                    />
                                    às
                                    <input
                                        type="time"
                                        name="endTime"
                                        id="endTime"
                                        className="w-[5.5rem] text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-between items-center text-azul">
                                <label
                                    htmlFor="valor"
                                    className="font-semibold"
                                >
                                    Valor da matrícula
                                </label>
                                <input
                                    type="number"
                                    name="valor"
                                    id="valor"
                                    placeholder="R$ 000,00"
                                    className="w-24 text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                    value={
                                        enrollmentValue === 0
                                            ? ""
                                            : enrollmentValue
                                    }
                                    onChange={(e) =>
                                        setEnrollmentValue(
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </div>
                            <div className="w-full flex justify-between items-center text-azul">
                                <label
                                    htmlFor="quantidadeAlunos"
                                    className="font-semibold"
                                >
                                    Quantidade máxima de alunos{" "}
                                </label>
                                <input
                                    type="number"
                                    name="quantidadeAlunos"
                                    id="quantidadeAlunos"
                                    placeholder="000"
                                    className="w-24 text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul disabled:border-zinc-500 disabled:bg-zinc-300 disabled:cursor-not-allowed"
                                    value={
                                        maxSeats !== null && maxSeats !== 0
                                            ? maxSeats
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setMaxSeats(Number(e.target.value))
                                    }
                                    disabled={mode === "ONLINE"}
                                />
                                {maxSeatError !== "" ? (
                                    <p className="text-vermelho font-medium">
                                        {maxSeatError}
                                    </p>
                                ) : null}
                            </div>
                            <button
                                type="submit"
                                className="mt-8 mx-auto flex justify-center items-center text-white bg-laranja px-4 py-2 rounded hover:bg-[#E38714] transition-colors disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:text-zinc-300"
                                disabled={isLoading}
                            >
                                {isLoading ? (
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
                                    "Salvar turma"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
