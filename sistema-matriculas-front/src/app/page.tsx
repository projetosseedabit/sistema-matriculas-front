"use client";
import { useState, useEffect } from "react";
import { ClassCard } from "@/components/class-card/class-card";
import Header from "../components/header";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import Link from "next/link";

interface Class {
    id: number;
    fullName: string;
    lessonSchedule: string;
    mode: string;
    maxSeats: number | null;
    availableSeats: number | null;
    paymentAmount: number;
    createdAt: Date;
}

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

function formatDayOfWeek(dayOfWeek: string): string {
    switch (dayOfWeek) {
        case "SEG":
            return "Segunda";
        case "TER":
            return "Terça";
        case "QUA":
            return "Quarta";
        case "QUI":
            return "Quinta";
        case "SEX":
            return "Sexta";
        case "SAB":
            return "Sábado";
        case "DOM":
            return "Domingo";
        default:
            return "";
    }
}

export default function RootLayout() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(
                    "https://king-prawn-app-3bepj.ondigitalocean.app/class"
                );
                const data = await response.json();

                const formattedClasses = data.allClass.map(
                    (classData: Class) => ({
                        ...classData,
                        createdAt: classData.createdAt,
                    })
                );

                const filteredClasses = formattedClasses.filter(
                    (classData: Class) => {
                        if (classData.availableSeats !== null) {
                            return classData.availableSeats > 0;
                        }
                        return true;
                    }
                );

                const sortedClasses = filteredClasses.sort(
                    (a: Class, b: Class) => {
                        const nameA = a.fullName.toUpperCase();
                        const nameB = b.fullName.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    }
                );

                setClasses(sortedClasses);
            } catch (error) {
                console.error("Erro ao buscar as classes:", error);
            }
        };

        fetchClasses();
    }, []);

    const handleSelection = (value: number) => {
        setSelectedOption(value);
    };

    const currentStep = 1;

    return (
        <>
            <Header />
            <main className="min-h-screen p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
                <ProgressBar currentStep={currentStep} />
                <div className="space-y-6">
                    {classes.map((classData) => {
                        const { dayOfWeek, startTime, endTime } =
                            getScheduleInfo(classData.lessonSchedule);
                        return (
                            <div key={classData.id}>
                                <ClassCard
                                    name={classData.fullName}
                                    id={classData.id}
                                    value={classData.id}
                                    checked={selectedOption === classData.id}
                                    onChange={handleSelection}
                                    dayOfWeek={formatDayOfWeek(dayOfWeek)}
                                    mode={
                                        classData.mode === "IN_PERSON"
                                            ? "Presencial"
                                            : "On-line"
                                    }
                                    totalVacancies={classData.maxSeats}
                                    vacanciesLeft={classData.availableSeats}
                                    endTime={endTime}
                                    startTime={startTime}
                                    price={classData.paymentAmount}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-center mt-8">
                    <Link
                        href={
                            selectedOption !== null
                                ? `/forms?classId=${selectedOption}&mode=${
                                      classes.filter(
                                          (Class) => Class.id === selectedOption
                                      )[0].mode
                                  }`
                                : "#"
                        }
                        onClick={(e) => {
                            if (selectedOption === null) {
                                e.preventDefault();
                            }
                        }}
                        data-disabled={selectedOption === null}
                        className="text-center text-white data-[disabled=true]:bg-gray-500 data-[disabled=true]:text-gray-100 data-[disabled=true]:cursor-not-allowed px-4 py-1 rounded-md w-full sm:w-auto font-medium text-lg sm:text-xl lg:text-2xl transition-all bg-laranja hover:bg-[#E38714]"
                    >
                        Próximo
                    </Link>
                </div>
            </main>
        </>
    );
}
