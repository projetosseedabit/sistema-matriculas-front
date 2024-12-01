'use client'
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/admin-header/admin-header";
import Image from 'next/image';
import Logo from "../../../../public/vercel.svg";

export default function Informations() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiaWF0IjoxNzMzMDE0NjczLCJleHAiOjE3MzMwMTgyNzN9.qTBscRz2cHRVphwF-RgNiqjdj6gub-KX2nQqL_mqkmQ";
    
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
            const response = await fetch('https://king-prawn-app-3bepj.ondigitalocean.app/class/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const classesData = await response.json();
            setClasses(classesData.allClass || []); // Ajuste conforme o formato da resposta da API
        } catch (error) {
            console.error('Erro ao buscar classes:', error);
            alert('Erro ao buscar classes');
        }
    };

    const filterData = () => {
        let filtered = [...data]
        if (selectedClass) {
            filtered = filtered.filter(item => String(item.classId).trim() === selectedClass!.trim());
            setLoading(true);
        }
        if (selectedStatus) {
            filtered = filtered.filter(item => item.paymentStatus === selectedStatus);
        }
        setFilteredData(filtered);
        setLoading(false);
    };

    const fetchData = async (url: string) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'GET', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const registrationsData = await response.json();
            const registrations = registrationsData.registrations;
            console.log(registrations);
            

            if (Array.isArray(registrations)) {
                const responseStudents = await fetch('https://king-prawn-app-3bepj.ondigitalocean.app/students/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const studentsData = await responseStudents.json();
                const students = studentsData.allStudents;
                console.log(students);

                const responseResponsibles = await fetch('https://king-prawn-app-3bepj.ondigitalocean.app/responsible/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const responsiblesData = await responseResponsibles.json();
                const responsibles = responsiblesData.allResponsible;
                console.log(responsibles);

                const responseTransactions = await fetch('https://king-prawn-app-3bepj.ondigitalocean.app/transactions/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const transactionsData = await responseTransactions.json();
                const transactions = transactionsData.allTransactions;
                console.log('Transações:',transactions);

                // Atualize a lista de objetos com a lógica desejada
                const updatedData: Registration[] = registrations.map((registration: Registration) => {
                    // Exemplo de modificação: adiciona uma propriedade de contato fictícia para o exemplo
                    const studentsInfo = students.find((student: { id: string; }) => student.id === registration.studentId);
                    const responsiblesInfo = responsibles.find((responsible: { studentId: string; }) => responsible.studentId === registration.studentId);
                    const transactionInfo = transactions.find((transaction: { id: string; }) => transaction.id === registration.transactionId)
                    return {
                        ...registration,
                        studentName: studentsInfo ? studentsInfo.fullName : 'Não encontrado', // Você pode ajustar isso para o que for necessário
                        responsibleName: responsiblesInfo ? responsiblesInfo.fullName : 'Não encontrado',
                        responsibleContact: responsiblesInfo ? responsiblesInfo.phone : 'Não encontrado',
                        paymentStatus: transactionInfo ? transactionInfo.paymentStatus : 'Não encontrado',
                        paymentMethod: transactionInfo ? transactionInfo.paymentMethod : 'Não encontrado',
                        paymentValue: transactionInfo ? transactionInfo.paymentValue : 'Não encontrado',
                    };
                });
                setData(updatedData);
                setFilteredData(updatedData);
         
            
        }

        } catch (error) {
            
            alert('Erro ao buscar dados');
           
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        filterData(); // A função de filtragem é chamada sempre que selectedClass ou selectedStatus mudar
    }, [selectedClass, selectedStatus]);

    useEffect(() => {
        fetchData('https://king-prawn-app-3bepj.ondigitalocean.app/registration/');
        fetchClasses();
    }, []);
    
    if (loading) {
        return <p className="px-8">Carregandoooo...</p>
    }

    return (
        <>
            <div className="flex ">
                <AdminHeader></AdminHeader>

                <div className="w-screen ">
                    <div className="bg-sky-800 px-16 py-4">

                        <div>
                            {/* Botão do menu */}
                            <button className="flex gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md  "
                                onClick={toggleClassDropdown}>Selecionar Turma<Image src={Logo} alt={""} className="w-[16px] h-[16px]"></Image>

                            </button>

                            {/* Itens do drop-down */}
                            {isClassOpen && (

                                <ul>
                                    {classes.map((classItem) => (
                                        <li
                                        key={classItem.id}
                                        onClick={() => handleClassSelection(String(classItem.id))}
                                        className="font-montserrat text-white px-4 py-2 hover:bg-sky-950 cursor-pointer">
                                        {classItem.fullName}
                                    </li>
                                    ))}
                                    
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="px-16 py-8 w-full justify-items-end" >
                        <div>
                            {/* Botão do menu */}
                            <button className="flex gap-2 bg-amber-500 hover:bg-amber-600 text-white font-montserrat px-4 py-2 rounded-md focus:outline-none"
                                onClick={toggleStatusDropdown}>
                                Aplicar Filtro<Image src={Logo} alt={""} className="w-[16px] h-[16px]"></Image>
                            </button>

                            {/* Itens do drop-down */}
                            {isStatusOpen && (
                                <ul className="bg-gray-200">
                                    <li
                                        onClick={() => handleStatusSelection("PENDING")}
                                        className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer">
                                        Aguardando Pagamento
                                    </li>
                                    <li 
                                    onClick={() => handleStatusSelection("PAID")}
                                    className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer">Pago</li>
                                    <li
                                    onClick={() => handleStatusSelection("FAILED")}
                                    className="font-montserrat px-4 py-2 hover:bg-gray-300 cursor-pointer">Não concluído</li>
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="justify-items-center px-16 ">
                        <table className="table-fixed border-separate border-spacing-2 border border-slate-400 ">
                            <thead>
                                <tr >
                                    <th className="border border-slate-300 px-4 py-4">Turma</th>
                                    <th className="border border-slate-300 px-4 py-4">Aluno</th>
                                    <th className="border border-slate-300 px-4 py-4">Status de Matricula</th>
                                    <th className="border border-slate-300 px-4 py-4">Status de Pagamento</th>
                                    <th className="border border-slate-300 px-4 py-4">Responsável</th>
                                    <th className="border border-slate-300 px-4 py-4">Contato</th>
                                    <th className="border border-slate-300 px-4 py-4">Método de Pagamento</th>
                                    <th className="border border-slate-300 px-4 py-4">Valor</th>
                                    <th className="border border-slate-300 px-4 py-4">Ação</th>
                                </tr>
                            </thead>
                            <tbody >
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.studentName}</td>
                                        <td>{item.status}</td>
                                        <td>{item.paymentStatus}</td>
                                        <td>{item.responsibleName}</td>
                                        <td>{item.responsibleContact}</td>
                                        <td>{item.paymentMethod}</td>
                                        <td>{item.paymentValue}</td>
                                        <td>
                                            <button className="text-red-500" onClick={() => alert(`Deseja excluir aluno ${item.studentId}?`)}>
                                                Ação
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </div >

        </>
    );
}