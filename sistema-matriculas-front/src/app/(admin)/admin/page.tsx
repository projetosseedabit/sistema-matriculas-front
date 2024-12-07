"use client";

import React, { useEffect, useState } from "react";
import { fetchWithToken } from "@/utils";
import { Registration } from "@/model/Registration";
import { Class } from "@/model/Class";

type TableData = {
    id: string;
    className: string;
    studentName: string;
    matriculaStatus: string;
    paymentStatus: string;
    responsibleName: string;
    responsibleContact: string;
    paymentMethod: string;
    paymentValue: number;
    classId: number;
};

type TransactionApiResponse = {
    id: number;
    paymentValue: number;
    paymentStatus: string;
    paymentMethod: string;
    preferenceId: string;
    createdAt: string;
    expirationDate: string;
};

type RegistrationApiResponse = {
    id: number;
    studentId: number;
    classId: number;
    status: string;
    transactionId: number;
    createdAt: string;
    student: {
        id: number;
        fullName: string;
        cpf: string;
        rg: string;
        phone: string;
        email: string;
        address: string;
        socialName: string;
        isAdult: string;
        createdAt: string;
        memberKitId: number;
        mode: string;
        responsible: {
            id: number;
            fullName: string;
            cpf: string;
            rg: string;
            phone: string;
            email: string;
            address: string;
            relationship: null;
            studentId: number;
        }[];
    };
    class: {
        id: number;
        fullName: string;
        lessonSchedule: string;
        paymentAmount: number;
        mode: string;
        maxSeats: number;
        availableSeats: number;
        createdAt: string;
    };
};

function formatPaymentStatus(paymentStatus: string) {
    switch (paymentStatus) {
        case "PAID":
            return "Pago";
        case "PENDING":
            return "Pendente";
        case "FAILED":
            return "Expirou";
        default:
            return "Pendente";
    }
}

function formatPaymentMethod(paymentMethod: string) {
    switch (paymentMethod) {
        case "PIX":
            return (
                <div className="flex gap-2 justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="#003960"
                            d="M14.723 14.472a2.46 2.46 0 0 1-1.753-.726l-2.531-2.531a.48.48 0 0 0-.666 0l-2.54 2.54a2.46 2.46 0 0 1-1.753.726h-.499l3.206 3.206a2.564 2.564 0 0 0 3.626 0l3.214-3.215zM5.48 5.519c.662 0 1.285.258 1.753.726l2.54 2.54a.47.47 0 0 0 .665 0l2.531-2.531a2.46 2.46 0 0 1 1.753-.726h.305l-3.214-3.215a2.564 2.564 0 0 0-3.626 0L4.981 5.52z"
                        ></path>
                        <path
                            fill="#003960"
                            d="m17.687 8.187-1.943-1.942a.4.4 0 0 1-.138.027h-.883c-.457 0-.904.186-1.227.509l-2.53 2.53a1.2 1.2 0 0 1-.86.356c-.31 0-.622-.119-.859-.355l-2.54-2.54a1.75 1.75 0 0 0-1.227-.509H4.394a.4.4 0 0 1-.13-.026l-1.95 1.95a2.563 2.563 0 0 0 0 3.626l1.95 1.95a.4.4 0 0 1 .13-.026H5.48c.457 0 .904-.185 1.227-.508l2.54-2.54c.46-.46 1.26-.46 1.718 0l2.531 2.53c.323.323.77.509 1.227.509h.883a.4.4 0 0 1 .138.027l1.943-1.942a2.564 2.564 0 0 0 0-3.626"
                        ></path>
                    </svg>
                    Pix
                </div>
            );
        case "MONEY":
            return "Dinheiro";
        case "CREDIT_CARD":
            return (
                <div className="flex gap-2 justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill="#003960"
                            d="M.81 6.333h18.38v-.778c0-1.724-.878-2.595-2.628-2.595H3.438c-1.75 0-2.629.87-2.629 2.595zm0 8.12Q.81 17.04 3.437 17.04h13.125c1.749 0 2.628-.863 2.628-2.587v-6.22H.81zm2.795-2.042v-1.549c0-.469.326-.804.82-.804h2.051c.494 0 .82.335.82.804v1.549c0 .477-.326.803-.82.803H4.425c-.494 0-.82-.326-.82-.803"
                        ></path>
                    </svg>
                    Cartão
                </div>
            );
        default:
            return paymentMethod;
    }
}

function formatName(studentName: string) {
    const firstName = studentName.split(" ")[0];
    const lastName = studentName.split(" ").at(-1);

    if (firstName === lastName) return firstName;

    return `${firstName} ${lastName}`;
}

function formatStatus(status: string) {
    switch (status) {
        case "RESERVED":
            return "Reservado";
        default:
            return "Reservado";
    }
}

function formatPhoneNumber(phoneNumber: string) {
    const regex = /(\d{2})9*(\d{4})(\d{4})/;

    const match = phoneNumber.match(regex);

    if (!match) return phoneNumber;

    return `(${match[1]}) 9${match[2]}-${match[3]}`;
}

export default function AdminPage() {
    const [tableData, setTableData] = useState<TableData[]>([]);
    const [filteredTableData, setFilteredTableData] = useState<TableData[]>([]);

    const [loading, setLoading] = useState(false);

    const [isClassOpen, setIsClassOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const toggleClassDropdown = () => setIsClassOpen(!isClassOpen);
    const toggleStatusDropdown = () => setIsStatusOpen(!isStatusOpen);

    const handleClassSelection = (classId: string | null) => {
        setSelectedClass(classId);
        setIsClassOpen(false);
        filterData();
    };

    const handleStatusSelection = (status: string | null) => {
        setSelectedStatus(status);
        setIsStatusOpen(false);
        filterData();
    };

    async function getRegistrations() {
        try {
            const response = await fetchWithToken(
                "https://king-prawn-app-3bepj.ondigitalocean.app/registration"
            );

            const data: { registrations: RegistrationApiResponse[] } =
                await response.json();

            console.log("Registrations:", data);
            return data.registrations;
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            alert("Erro ao buscar dados");
        }
    }

    async function getTransactions() {
        try {
            const response = await fetchWithToken(
                "https://king-prawn-app-3bepj.ondigitalocean.app/transactions/"
            );

            const data: { allTransactions: TransactionApiResponse[] } =
                await response.json();

            return data.allTransactions;
        } catch (error) {
            console.error("Erro ao buscar transações:", error);
            alert("Erro ao buscar transações");
        }
    }

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
            const sortedClasses = classesData.allClass.sort(
                (a: Class, b: Class) => {
                    if (a.fullName < b.fullName) {
                        return -1;
                    }
                    if (a.fullName > b.fullName) {
                        return 1;
                    }
                    return 0;
                }
            );
            setClasses(sortedClasses || []);
        } catch (error) {
            console.error("Erro ao buscar classes:", error);
            alert("Erro ao buscar classes");
        }
    };

    const filterData = () => {
        let filtered = [...tableData];

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
        setFilteredTableData(filtered);
        setLoading(false);
    };

    useEffect(() => {
        filterData(); // A função de filtragem é chamada sempre que selectedClass ou selectedStatus mudar
    }, [selectedClass, selectedStatus]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const registrations = await getRegistrations();
            const transactions = await getTransactions();

            const tableData: TableData[] = registrations!.map(
                (registration) => {
                    return {
                        id: registration.id.toString(),
                        className: registration.class.fullName,
                        studentName: registration.student.fullName,
                        matriculaStatus: registration.status,
                        paymentStatus:
                            transactions?.find(
                                (transaction) =>
                                    transaction.id ===
                                    registration.transactionId
                            )?.paymentStatus || "PENDING",
                        responsibleName:
                            registration.student.responsible[0].fullName ||
                            "Não encontrado",
                        responsibleContact:
                            registration.student.responsible[0].phone ||
                            "Não encontrado",
                        paymentMethod:
                            transactions?.find(
                                (transaction) =>
                                    transaction.id ===
                                    registration.transactionId
                            )?.paymentMethod || "Não encontrado",
                        paymentValue:
                            transactions?.find(
                                (transaction) =>
                                    transaction.id ===
                                    registration.transactionId
                            )?.paymentValue || 0,
                        classId: registration.classId,
                    };
                }
            );
            fetchClasses();

            setTableData(tableData);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        setFilteredTableData(tableData);
    }, [tableData]);

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
        return (
            <div className="flex justify-center items-center text-azul text-xl h-screen">
                Carregando...
            </div>
        );
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
            .then(async () => {
                setOpenDialog(false);
                setDeleteError("");
                const registrations = await getRegistrations();
                const transactions = await getTransactions();

                const tableData: TableData[] = registrations!.map(
                    (registration) => {
                        return {
                            id: registration.id.toString(),
                            className: registration.class.fullName,
                            studentName: registration.student.fullName,
                            matriculaStatus: registration.status,
                            paymentStatus:
                                transactions?.find(
                                    (transaction) =>
                                        transaction.id ===
                                        registration.transactionId
                                )?.paymentStatus || "PENDING",
                            responsibleName:
                                registration.student.responsible[0].fullName ||
                                "Não encontrado",
                            responsibleContact:
                                registration.student.responsible[0].phone ||
                                "Não encontrado",
                            paymentMethod:
                                transactions?.find(
                                    (transaction) =>
                                        transaction.id ===
                                        registration.transactionId
                                )?.paymentMethod || "Não encontrado",
                            paymentValue:
                                transactions?.find(
                                    (transaction) =>
                                        transaction.id ===
                                        registration.transactionId
                                )?.paymentValue || 0,
                            classId: registration.classId,
                        };
                    }
                );

                setTableData(tableData);
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
                <div className="bg-white flex flex-col items-center gap-4 px-8 py-4 rounded-lg popup">
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
                <div className="px-16 py-4 w-full justify-end flex gap-4">
                    <div className="relative">
                        <button
                            className={`flex gap-2 bg-laranja hover:bg-[#E38714] text-white px-4 py-2 rounded-md font-medium transition-colors ${
                                isClassOpen ? "rounded-b-none" : ""
                            }`}
                            onClick={toggleClassDropdown}
                        >
                            Filtrar por turma
                        </button>
                        {isClassOpen && (
                            <ul className="absolute top-[100%] right-0 w-full rounded-b-lg overflow-y-auto max-h-32 text-sm shadow-md">
                                <li
                                    onClick={() => handleClassSelection(null)}
                                    className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                >
                                    Todas as turmas
                                </li>
                                {classes.map((classItem) => (
                                    <li
                                        key={classItem.id}
                                        onClick={() =>
                                            handleClassSelection(
                                                String(classItem.id)
                                            )
                                        }
                                        className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                    >
                                        {classItem.fullName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="relative">
                        <button
                            className={`flex gap-2 bg-laranja hover:bg-[#E38714] text-white px-4 py-2 rounded-md transition-colors font-medium ${
                                isStatusOpen ? "rounded-b-none" : ""
                            }`}
                            onClick={toggleStatusDropdown}
                        >
                            Filtrar por pagamento
                        </button>
                        {isStatusOpen && (
                            <ul className="absolute top-[100%] right-0 w-full rounded-b-lg overflow-y-auto text-sm shadow-md">
                                <li
                                    onClick={() => handleStatusSelection(null)}
                                    className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                >
                                    Todos
                                </li>
                                <li
                                    onClick={() =>
                                        handleStatusSelection("PENDING")
                                    }
                                    className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                >
                                    Aguardando Pagamento
                                </li>
                                <li
                                    onClick={() =>
                                        handleStatusSelection("PAID")
                                    }
                                    className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                >
                                    Pago
                                </li>
                                <li
                                    onClick={() =>
                                        handleStatusSelection("FAILED")
                                    }
                                    className="transition-colors px-2 py-2 text-azul bg-branco hover:bg-[#bfcdd7] cursor-pointer text-right"
                                >
                                    Não concluído
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                <div className="justify-items-center px-16 ">
                    <table className="table-fixed border-spacing-0 border-separate rounded-xl">
                        <thead className="bg-azul text-branco text-sm">
                            <tr>
                                <th className="px-4 py-2">Turma</th>
                                <th className="px-4 py-2">Aluno</th>
                                <th className="px-4 py-2">
                                    Status da Matricula
                                </th>
                                <th className="px-4 py-2">
                                    Status do Pagamento
                                </th>
                                <th className="px-4 py-2">Responsável</th>
                                <th className="px-4 py-2">Contato</th>
                                <th className="px-4 py-2">
                                    Método de Pagamento
                                </th>
                                <th className="px-4 py-2">Valor</th>
                                <th className="px-4 py-2">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTableData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="even:bg-azul/20 text-center odd:bg-azul/5 font-medium"
                                >
                                    <td className="py-4 px-2">
                                        {item.className}
                                    </td>
                                    <td className="py-4 px-2">
                                        {formatName(item.studentName)}
                                    </td>
                                    <td className="py-4 px-2">
                                        {formatStatus(item.matriculaStatus)}
                                    </td>
                                    <td className="py-4 px-2">
                                        <strong
                                            className={`px-4 py-1 rounded-full ${
                                                item.paymentStatus === "PAID"
                                                    ? "text-emerald-600 bg-emerald-100"
                                                    : item.paymentStatus ==
                                                      "PENDING"
                                                    ? "text-orange-500 bg-orange-100"
                                                    : "text-red-500 bg-red-100"
                                            }`}
                                        >
                                            {formatPaymentStatus(
                                                item.paymentStatus
                                            )}
                                        </strong>
                                    </td>
                                    <td className="py-4 px-2">
                                        {formatName(item.responsibleName)}
                                    </td>
                                    <td className="py-4 text-nowrap">
                                        {formatPhoneNumber(
                                            item.responsibleContact
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {formatPaymentMethod(
                                            item.paymentMethod
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(item.paymentValue)}
                                    </td>

                                    <td className="py-4 px-2">
                                        <button
                                            className="bg-vermelho p-1 rounded-full hover:bg-[#990000] transition-colors"
                                            onClick={() => {
                                                setOpenDialog(true);
                                                setRegistrationToExclude({
                                                    id: item.id,
                                                    studentName:
                                                        item.studentName,
                                                });
                                            }}
                                        >
                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M5 9C5.13261 9 5.25979 8.94732 5.35355 8.85355C5.44732 8.75979 5.5 8.63261 5.5 8.5V5.5C5.5 5.36739 5.44732 5.24021 5.35355 5.14645C5.25979 5.05268 5.13261 5 5 5C4.86739 5 4.74021 5.05268 4.64645 5.14645C4.55268 5.24021 4.5 5.36739 4.5 5.5V8.5C4.5 8.63261 4.55268 8.75979 4.64645 8.85355C4.74021 8.94732 4.86739 9 5 9ZM10 3H8V2.5C8 2.10218 7.84196 1.72064 7.56066 1.43934C7.27936 1.15804 6.89782 1 6.5 1H5.5C5.10218 1 4.72064 1.15804 4.43934 1.43934C4.15804 1.72064 4 2.10218 4 2.5V3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5C1.5 3.63261 1.55268 3.75979 1.64645 3.85355C1.74021 3.94732 1.86739 4 2 4H2.5V9.5C2.5 9.89782 2.65804 10.2794 2.93934 10.5607C3.22064 10.842 3.60218 11 4 11H8C8.39782 11 8.77936 10.842 9.06066 10.5607C9.34196 10.2794 9.5 9.89782 9.5 9.5V4H10C10.1326 4 10.2598 3.94732 10.3536 3.85355C10.4473 3.75979 10.5 3.63261 10.5 3.5C10.5 3.36739 10.4473 3.24021 10.3536 3.14645C10.2598 3.05268 10.1326 3 10 3ZM5 2.5C5 2.36739 5.05268 2.24021 5.14645 2.14645C5.24021 2.05268 5.36739 2 5.5 2H6.5C6.63261 2 6.75979 2.05268 6.85355 2.14645C6.94732 2.24021 7 2.36739 7 2.5V3H5V2.5ZM8.5 9.5C8.5 9.63261 8.44732 9.75979 8.35355 9.85355C8.25979 9.94732 8.13261 10 8 10H4C3.86739 10 3.74021 9.94732 3.64645 9.85355C3.55268 9.75979 3.5 9.63261 3.5 9.5V4H8.5V9.5ZM7 9C7.13261 9 7.25979 8.94732 7.35355 8.85355C7.44732 8.75979 7.5 8.63261 7.5 8.5V5.5C7.5 5.36739 7.44732 5.24021 7.35355 5.14645C7.25979 5.05268 7.13261 5 7 5C6.86739 5 6.74021 5.05268 6.64645 5.14645C6.55268 5.24021 6.5 5.36739 6.5 5.5V8.5C6.5 8.63261 6.55268 8.75979 6.64645 8.85355C6.74021 8.94732 6.86739 9 7 9Z"
                                                    fill="white"
                                                />
                                            </svg>
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
