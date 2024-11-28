'use client';

import { useState } from "react";
import { ClassCard } from "@/components/class-card/class-card";
import Header from "../components/header";
import { ProgressBar } from "@/components/progress-bar/progress-bar";

interface Class {
  id: string; // Identificador único da turma
  dayOfWeek: string;
  modality: string;
  totalVacancies: number;
  vacanciesFilled: number;
  startTime: string;
  endTime: string;
  price: number;
}

export default function RootLayout() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    console.log(value);
  };

  // Lista de turmas conforme especificado
  const classes: Class[] = [
    {
      id: "1",
      dayOfWeek: "Segunda-feira",
      modality: "Presencial",
      totalVacancies: 45,
      vacanciesFilled: 0,
      startTime: "19h",
      endTime: "21h",
      price: 190,
    },
    {
      id: "2",
      dayOfWeek: "Terça-feira",
      modality: "Presencial",
      totalVacancies: 45,
      vacanciesFilled: 0,
      startTime: "19h",
      endTime: "21h",
      price: 190,
    },
    {
      id: "3",
      dayOfWeek: "Quarta-feira",
      modality: "Presencial",
      totalVacancies: 45,
      vacanciesFilled: 0,
      startTime: "19h",
      endTime: "21h",
      price: 190,
    },
    {
      id: "4",
      dayOfWeek: "Quinta-feira",
      modality: "Presencial",
      totalVacancies: 45,
      vacanciesFilled: 0,
      startTime: "19h",
      endTime: "21h",
      price: 190,
    },
    {
      id: "5",
      dayOfWeek: "Sexta-feira",
      modality: "Presencial",
      totalVacancies: 45,
      vacanciesFilled: 0,
      startTime: "14h",
      endTime: "16h",
      price: 190,
    },
    {
      id: "6",
      dayOfWeek: "Sexta-feira",
      modality: "Online",
      totalVacancies: 30,
      vacanciesFilled: 0,
      startTime: "19h",
      endTime: "20:30h",
      price: 150,
    },
  ];

  // Define o passo atual da barra de progresso
  const currentStep = 1;

  return (
    <>
      <Header />
      {/* Barra de progresso */}
      <ProgressBar currentStep={currentStep} />
      <main className="min-h-screen p-8">
        {/* Renderiza dinamicamente os cards das turmas */}
        {classes.map((classData) => (
          <div key={classData.id} className="mb-6">
            <ClassCard
              id={classData.id}
              value={classData.id}
              checked={selectedOption === classData.id}
              onChange={handleSelection}
              dayOfWeek={classData.dayOfWeek}
              modality={classData.modality}
              totalVacancies={classData.totalVacancies}
              vacanciesFilled={classData.vacanciesFilled}
              startTime={classData.startTime}
              endTime={classData.endTime}
              price={classData.price}
            />
          </div>
        ))}
      </main>
    </>
  );
}
