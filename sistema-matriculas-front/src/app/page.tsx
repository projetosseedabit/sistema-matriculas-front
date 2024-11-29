'use client';

import { useState, useEffect } from "react";
import { ClassCard } from "@/components/class-card/class-card";
import Header from "../components/header";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { Button } from "@/components/Button";
import Link from "next/link";


interface Class {
  id: number;
  fullName: string;
  lessonSchedule: string;
  mode: ModeEnum;
  maxSeats: number | null;
  availableSeats: number | null;
  createdAt: Date;
}

export enum ModeEnum {
  IN_PERSON = "Presencial",
  ONLINE = "On-line",
}

const getDayName = (lessonSchedule: string): string => {
  return lessonSchedule.split(" ")[0]; // Retorna o dia da semana
};

const getTime = (lessonSchedule: string): string => {
  return lessonSchedule.split(" ").slice(1).join(" ").trim(); // Extrai tudo após o primeiro espaço
};

export default function RootLayout() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Função que será chamada ao clicar no botão de avançar


  useEffect(() => {

    // Fetch para buscar os dados do backend
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://king-prawn-app-3bepj.ondigitalocean.app/class");
        const data = await response.json();

        // Mapeia os dados para o formato esperado, convertendo createdAt para Date
        const formattedClasses = data.allClass.map((classData: Class) => ({
          ...classData,
          createdAt: new Date(classData.createdAt),
        }));
        setClasses(formattedClasses);
      } catch (error) {
        console.error("Erro ao buscar as classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleSelection = (value: number) => {
    setSelectedOption(value); // Atualiza a turma selecionada
    console.log(value); // Exibe no console para debug
  };

  // Define o passo atual da barra de progresso
  const currentStep = 1;

  return (
    <>
      <Header />
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
              dayOfWeek={getDayName(classData.lessonSchedule)}
              modality={classData.mode}
              totalVacancies={classData.maxSeats}
              vacanciesFilled={classData.availableSeats}
              time={getTime(classData.lessonSchedule)}
              price={90} // Exemplo de valor fixo
            />
          </div>
        ))}
        <div className="flex justify-center mx-60 mt-8">
          <Link href="/forms">
          <Button color="bg-[#FFA12B]" label="Avançar"/>
          </Link>
        </div>
      </main>
    </>
  );
}
