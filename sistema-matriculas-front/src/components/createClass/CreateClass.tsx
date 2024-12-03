import { fetchWithToken } from "@/utils";
import React, { FormEvent, useState } from "react";

const CreateClass: React.FC = () => {
    async function createClass(event: FormEvent) {
        event.preventDefault();

        const response = await fetchWithToken(
            "https://king-prawn-app-3bepj.ondigitalocean.app/class",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: name,
                    lessonSchedule: `${dayOfTheWeek}|${startTime}-${endTime}`,
                    mode: mode,
                    maxSeats: maxSeats,
                    availableSeats: maxSeats,
                }),
            }
        );

        if (response.ok) {
            alert("Turma criada com sucesso!");
        } else {
            alert("Erro ao criar turma!");
        }
    }

    const [name, setName] = useState("");
    const [dayOfTheWeek, setDayOfTheWeek] = useState("");
    const [mode, setMode] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [enrollmentValue, setEnrollmentValue] = useState(0);
    const [maxSeats, setMaxSeats] = useState<number | null>(0);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="px-8 py-6 rounded-lg border-2 border-azul">
                <div className="w-[26rem] text-azul">
                    <h1 className="text-left text-black font-bold text-xl">
                        Criar turma
                    </h1>
                    <form
                        className="space-y-4 text-sm mt-8"
                        onSubmit={createClass}
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
                        </div>
                        <button
                            type="submit"
                            className="mt-8 mx-auto block text-white bg-laranja px-4 py-2 rounded hover:bg-[#E38714] transition-colors"
                        >
                            Criar turma
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateClass;
