"use client";
import { fetchWithToken } from "@/utils";
import { useParams } from "next/navigation";
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

    const [maxSeatError, setMaxSeatError] = useState("");

    async function saveClass(event: FormEvent) {
        event.preventDefault();

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

            const data = await response.json();

            console.log(data);
        } catch (err) {
            console.error(err);
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

    return (
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
                                <option value="IN_PERSON">Presencial</option>
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
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center text-azul">
                            <label htmlFor="valor" className="font-semibold">
                                Valor da matrícula
                            </label>
                            <input
                                type="number"
                                name="valor"
                                id="valor"
                                placeholder="R$ 000,00"
                                className="w-24 text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                value={
                                    enrollmentValue === 0 ? "" : enrollmentValue
                                }
                                onChange={(e) =>
                                    setEnrollmentValue(Number(e.target.value))
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
                            className="mt-8 mx-auto block text-white bg-laranja px-4 py-2 rounded hover:bg-[#E38714] transition-colors"
                        >
                            Salvar turma
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
