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

    async function saveClass(event: FormEvent) {
        event.preventDefault();

        const body = {
            fullName: nome,
            lessonSchedule: `${dia}|${horarioInicio}-${horarioFim}`,
            mode: modalidade,
            maxSeats: quantidadeAlunos,
            availableSeats: quantidadeAlunos,
            paymentAmount: 95,
        };

        console.log(body);

        try {
            const response = await fetchWithToken(
                `https://king-prawn-app-3bepj.ondigitalocean.app/class/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(body),
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
                };
            } = await response.json();
            const fetchedClass = data.class;

            console.log("Fetched class:");
            console.log(fetchedClass);

            const { dayOfWeek, startTime, endTime } = getScheduleInfo(
                fetchedClass.lessonSchedule
            );

            setNome(fetchedClass.fullName);
            setDia(dayOfWeek);
            setHorarioInicio(startTime);
            setHorarioFim(endTime);
            setModalidade(fetchedClass.mode);
            // setValorMatricula(fetchedClass)
            setQuantidadeAlunos(fetchedClass.maxSeats);
        } catch (err) {
            console.error("Erro ao buscar dados da turma");
        }
    }

    useEffect(() => {
        getClassData();
    }, []);

    const [nome, setNome] = useState("");
    const [dia, setDia] = useState("");
    const [modalidade, setModalidade] = useState("");
    const [horarioInicio, setHorarioInicio] = useState("");
    const [horarioFim, setHorarioFim] = useState("");
    const [valorMatricula, setValorMatricula] = useState(0);
    const [quantidadeAlunos, setQuantidadeAlunos] = useState<number | null>(0);
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
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
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
                                value={dia}
                                onChange={(e) => setDia(e.target.value)}
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
                                value={modalidade}
                                onChange={(e) => setModalidade(e.target.value)}
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
                                    value={horarioInicio}
                                    onChange={(e) =>
                                        setHorarioInicio(e.target.value)
                                    }
                                />
                                às
                                <input
                                    type="time"
                                    name="endTime"
                                    id="endTime"
                                    className="w-[5.5rem] text-azul px-2 py-1 border border-azul rounded outline-none focus:ring-1 ring-azul"
                                    value={horarioFim}
                                    onChange={(e) =>
                                        setHorarioFim(e.target.value)
                                    }
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
                                    valorMatricula === 0 ? "" : valorMatricula
                                }
                                onChange={(e) =>
                                    setValorMatricula(Number(e.target.value))
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
                                    quantidadeAlunos !== null &&
                                    quantidadeAlunos !== 0
                                        ? quantidadeAlunos
                                        : ""
                                }
                                onChange={(e) =>
                                    setQuantidadeAlunos(Number(e.target.value))
                                }
                                disabled={modalidade === "ONLINE"}
                            />
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

        // <div className="flex">
        //     <div className="w-full max-w-4xl p-8 bg-white border-2 border-azul rounded-xl shadow-lg">
        //         <h1 className="text-2xl font-bold mb-4">Editar turma</h1>
        //         <form onSubmit={handleSubmit} className="space-y-4">
        //             <div className="flex justify-between w-[35rem] items-center">
        //                 <label
        //                     htmlFor="nome"
        //                     className="block text-sm font-medium"
        //                 >
        //                     Nome da turma
        //                 </label>
        //                 <input
        //                     id="nome"
        //                     name="nome"
        //                     value={formData.nome}
        //                     onChange={handleChange}
        //                     className="mt-1 p-2 border-2 border-azul rounded w-[180px] h-[40px]"
        //                 />
        //             </div>
        //             <div className="flex justify-between w-[35rem] items-center">
        //                 <label
        //                     htmlFor="dia"
        //                     className="block text-sm font-medium"
        //                 >
        //                     Selecione o dia da turma
        //                 </label>
        //                 <select
        //                     id="dia"
        //                     name="dia"
        //                     value={formData.dia}
        //                     onChange={handleChange}
        //                     className="mt-1 p-2 border-2 border-azul rounded w-[180px] h-[40px]"
        //                 >
        //                     <option value="" disabled>
        //                         Dia da turma
        //                     </option>
        //                     <option value="segunda">Segunda-feira</option>
        //                     <option value="terca">Terça-feira</option>
        //                     <option value="quarta">Quarta-feira</option>
        //                     <option value="quinta">Quinta-feira</option>
        //                     <option value="sexta">Sexta-feira</option>
        //                 </select>
        //             </div>

        //             <div className="flex justify-between items-center">
        //                 <label
        //                     htmlFor="modalidade"
        //                     className="block text-sm font-medium"
        //                 >
        //                     Selecione a modalidade
        //                 </label>
        //                 <select
        //                     id="modalidade"
        //                     name="modalidade"
        //                     value={formData.modalidade}
        //                     onChange={handleChange}
        //                     className="mt-1 p-2 border-2 border-azul rounded w-full w-[180px] h-[40px]"
        //                 >
        //                     <option value="" disabled>
        //                         Modalidade da turma
        //                     </option>
        //                     <option value="presencial">Presencial</option>
        //                     <option value="online">Online</option>
        //                 </select>
        //             </div>

        //             <div className="grid grid-cols-2 gap-4">
        //                 <div>
        //                     <label
        //                         htmlFor="horarioInicio"
        //                         className="block text-sm font-medium"
        //                     >
        //                         Horário de início
        //                     </label>
        //                     <input
        //                         type="time"
        //                         id="horarioInicio"
        //                         name="horarioInicio"
        //                         value={formData.horarioInicio}
        //                         onChange={handleChange}
        //                         className="mt-1 p-2 border-2 border-azul rounded w-full"
        //                     />
        //                 </div>

        //                 <div>
        //                     <label
        //                         htmlFor="horarioFim"
        //                         className="block text-sm font-medium"
        //                     >
        //                         Horário de término
        //                     </label>
        //                     <input
        //                         type="time"
        //                         id="horarioFim"
        //                         name="horarioFim"
        //                         value={formData.horarioFim}
        //                         onChange={handleChange}
        //                         className="mt-1 p-2 border-2 border-azul rounded w-full"
        //                     />
        //                 </div>
        //             </div>

        //             <div className=" grid grid-cols-1 gap-4 items-center">
        //                 <div className="flex justify-between items-center space-x-4">
        //                     <label
        //                         htmlFor="valorMatricula"
        //                         className="block text-sm font-medium w-1/4"
        //                     >
        //                         Valor da matrícula
        //                     </label>
        //                     <input
        //                         type="number"
        //                         id="valorMatricula"
        //                         name="valorMatricula"
        //                         value={formData.valorMatricula}
        //                         onChange={handleChange}
        //                         className="mt-1 p-2 border-2 border-azul rounded w-full w-[180px] h-[40px]"
        //                         placeholder="R$ 000,00"
        //                     />
        //                 </div>
        //             </div>

        //             <div className="flex justify-between items-center">
        //                 <label
        //                     htmlFor="quantidadeAlunos"
        //                     className="block text-sm font-medium"
        //                 >
        //                     Quantidade de alunos
        //                 </label>
        //                 <input
        //                     type="number"
        //                     id="quantidadeAlunos"
        //                     name="quantidadeAlunos"
        //                     value={formData.quantidadeAlunos}
        //                     onChange={handleChange}
        //                     className="mt-1 p-2 border-2 border-azul rounded w-full w-[180px] h-[40px]"
        //                     placeholder="Digite"
        //                 />
        //             </div>

        //             <button
        //                 type="submit"
        //                 className="bg-laranja text-white py-2 px-4 rounded w-full"
        //             >
        //                 Salvar turma
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
}
