"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "../../../../public/vercel.svg";
import { fetchWithToken } from "@/utils";
import { Registration } from "@/model/Registration";
import { Class } from "@/model/Class";

export default function AdminPage() {
    const [data, setData] = useState<Registration[]>([]);
    const [filteredData, setFilteredData] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    const [isClassOpen, setIsClassOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const toggleClassDropdown = () => setIsClassOpen(!isClassOpen);
    const toggleStatusDropdown = () => setIsStatusOpen(!isStatusOpen);

    const handleClassSelection = (classId: string) => {
        setSelectedClass(classId);
        setIsClassOpen(false);
        filterData();
    };

    const handleStatusSelection = (status: string) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
        filterData();
    };
    const fetchClasses = async () => {
        try {
            const response = await fetch(
                "https://king-prawn-app-3bepj.ondigitalocean.app/class/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const classesData = await response.json();
            setClasses(classesData.allClass || []); // Ajuste conforme o formato da resposta da API
        } catch (error) {
            console.error("Erro ao buscar classes:", error);
            alert("Erro ao buscar classes");
        }
    };

    const filterData = () => {
        let filtered = [...data];
        if (selectedClass) {
            filtered = filtered.filter(
                (item) => String(item.classId).trim() === selectedClass!.trim()
            );
            setLoading(true);
        }
        if (selectedStatus) {
            filtered = filtered.filter(
                (item) => item.paymentStatus === selectedStatus
            );
        }
        setFilteredData(filtered);
        setLoading(false);
    };

    const fetchData = async (url: string) => {
        setLoading(true);
        try {
            const response = await fetchWithToken(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const registrationsData = await response.json();
            const registrations = registrationsData.registrations;
            console.log(registrations);

            if (Array.isArray(registrations)) {
                const responseStudents = await fetchWithToken(
                    "https://king-prawn-app-3bepj.ondigitalocean.app/students/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const studentsData = await responseStudents.json();
                const students = studentsData.allStudents;
                console.log(students);

                const responseResponsibles = await fetchWithToken(
                    "https://king-prawn-app-3bepj.ondigitalocean.app/responsible/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const responsiblesData = await responseResponsibles.json();
                const responsibles = responsiblesData.allResponsible;
                console.log(responsibles);

                const responseTransactions = await fetchWithToken(
                    "https://king-prawn-app-3bepj.ondigitalocean.app/transactions/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const transactionsData = await responseTransactions.json();
                const transactions = transactionsData.allTransactions;
                console.log("Transações:", transactions);

                // Atualize a lista de objetos com a lógica desejada
                const updatedData: Registration[] = registrations.map(
                    (registration: Registration) => {
                        // Exemplo de modificação: adiciona uma propriedade de contato fictícia para o exemplo
                        const studentsInfo = students.find(
                            (student: { id: string }) =>
                                student.id === registration.studentId
                        );
                        const responsiblesInfo = responsibles.find(
                            (responsible: { studentId: string }) =>
                                responsible.studentId === registration.studentId
                        );
                        const transactionInfo = transactions.find(
                            (transaction: { id: string }) =>
                                transaction.id === registration.transactionId
                        );
                        return {
                            ...registration,
                            studentName: studentsInfo
                                ? studentsInfo.fullName
                                : "Não encontrado", // Você pode ajustar isso para o que for necessário
                            responsibleName: responsiblesInfo
                                ? responsiblesInfo.fullName
                                : "Não encontrado",
                            responsibleContact: responsiblesInfo
                                ? responsiblesInfo.phone
                                : "Não encontrado",
                            paymentStatus: transactionInfo
                                ? transactionInfo.paymentStatus
                                : "Não encontrado",
                            paymentMethod: transactionInfo
                                ? transactionInfo.paymentMethod
                                : "Não encontrado",
                            paymentValue: transactionInfo
                                ? transactionInfo.paymentValue
                                : "Não encontrado",
                        };
                    }
                );
                setData(updatedData);
                setFilteredData(updatedData);
            }
        } catch (error) {
            alert(`Erro ao buscar dados: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        filterData(); // A função de filtragem é chamada sempre que selectedClass ou selectedStatus mudar
    }, [selectedClass, selectedStatus]);

    useEffect(() => {
        fetchData(
            "https://king-prawn-app-3bepj.ondigitalocean.app/registration/"
        );
        fetchClasses();
    }, []);

    const [openDialog, setOpenDialog] = useState(false);
    const [registrationToExclude, setRegistrationToExclude] = useState<
        Pick<Registration, "id" | "studentName">
    >({
        id: "",
        studentName: "",
    });
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    if (loading) {
        return <p className="px-8">Carregando...</p>;
    }

    function handleConfirmDelete() {
        setIsLoadingDelete(true);
        fetchWithToken(
            `https://king-prawn-app-3bepj.ondigitalocean.app/report/${registrationToExclude.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then(() => {
                setOpenDialog(false);
                fetchData(
                    "https://king-prawn-app-3bepj.ondigitalocean.app/registration/"
                );
            })
            .catch((error) => {
                setDeleteError("Erro ao excluir aluno");
                console.error("Erro ao excluir aluno:", error);
            })
            .finally(() => {
                setIsLoadingDelete(false);
            });
    }

    function handleCancelDelete() {
        setOpenDialog(false);
    }

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
                        Tem certeza que deseja excluir a matrícula do aluno
                        &quot;{registrationToExclude?.studentName}&quot;?
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
            <div className="w-full">
                <div className="bg-azul px-16 py-4">
                    <div>
                        {/* Botão do menu */}
                        <button
                            className="flex gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md  "
                            onClick={toggleClassDropdown}
                        >
                            Selecionar Turma
                            <Image
                                src={Logo}
                                alt={""}
                                className="w-[16px] h-[16px]"
                            ></Image>
                        </button>

                        {/* Itens do drop-down */}
                        {isClassOpen && (
                            <ul>
                                {classes.map((classItem) => (
                                    <li
                                        key={classItem.id}
                                        onClick={() =>
                                            handleClassSelection(
                                                String(classItem.id)
                                            )
                                        }
                                        className="font-montserrat text-white px-4 py-2 hover:bg-sky-950 cursor-pointer"
                                    >
                                        {classItem.fullName} ({classItem.id})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="px-16 py-8 w-full justify-items-end">
                    <div>
                        {/* Botão do menu */}
                        <button
                            className="flex gap-2 bg-amber-500 hover:bg-amber-600 text-white font-montserrat px-4 py-2 rounded-md focus:outline-none"
                            onClick={toggleStatusDropdown}
                        >
                            Aplicar Filtro
                            <Image
                                src={Logo}
                                alt={""}
                                className="w-[16px] h-[16px]"
                            ></Image>
                        </button>

                        {/* Itens do drop-down */}
                        {isStatusOpen && (
                            <ul className="bg-gray-200">
                                <li
                                    onClick={() =>
                                        handleStatusSelection("PENDING")
                                    }
                                    className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                >
                                    Aguardando Pagamento
                                </li>
                                <li
                                    onClick={() =>
                                        handleStatusSelection("PAID")
                                    }
                                    className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                >
                                    Pago
                                </li>
                                <li
                                    onClick={() =>
                                        handleStatusSelection("FAILED")
                                    }
                                    className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer"
                                >
                                    Não concluído
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="justify-items-center px-16 ">
                    <table className="table-fixed border-azul border-separate border-spacing-2 border border-slate-400 ">
                        <thead>
                            <tr>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Turma
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Aluno
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Status de Matricula
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Status de Pagamento
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Responsável
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Contato
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Método de Pagamento
                                </th>
                                <th className="border border-azul px-4 py-4 text-blue">
                                    Valor
                                </th>
                                <th className="border border-slate-300 px-4 py-4">
                                    Ação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.studentName}</td>
                                    <td>{item.status}</td>
                                    <td
                                        className={
                                            item.paymentStatus === "PAID"
                                                ? "text-green-600"
                                                : item.paymentStatus ==
                                                  "PENDING"
                                                ? "text-orange-500"
                                                : "text-red-500"
                                        }
                                    >
                                        <strong>{item.paymentStatus}</strong>
                                    </td>
                                    <td>{item.responsibleName}</td>
                                    <td>{item.responsibleContact}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.paymentValue}</td>

                                    <td>
                                        <button
                                            className="text-red-500"
                                            onClick={() => {
                                                setOpenDialog(true);
                                                setRegistrationToExclude({
                                                    id: item.id,
                                                    studentName:
                                                        item.studentName,
                                                });
                                            }}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
