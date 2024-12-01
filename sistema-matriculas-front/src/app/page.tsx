'use client'
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
  mode: string;
  maxSeats: number | null;
  availableSeats: number | null;
  createdAt: Date;
}

export enum ModeEnum {
  IN_PERSON = "Presencial",
  ONLINE = "On-line",
}

const getDayName = (lessonSchedule: string): string => {
  return lessonSchedule.split(" ")[0];
};

const getTime = (lessonSchedule: string): string => {
  return lessonSchedule.split(" ").slice(1).join(" ").trim();
};

export default function RootLayout() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://king-prawn-app-3bepj.ondigitalocean.app/class");
        const data = await response.json();

        const formattedClasses = data.allClass.map((classData: Class) => ({
          ...classData,
          createdAt: classData.createdAt,
        }));
        setClasses(formattedClasses);
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
          {classes.map((classData) => (
            <div key={classData.id}>
              <ClassCard
                id={classData.id}
                value={classData.id}
                checked={selectedOption === classData.id}
                onChange={handleSelection}
                dayOfWeek={getDayName(classData.lessonSchedule)}
                mode={classData.mode === ModeEnum.IN_PERSON ? "Presencial" : "On-line"}
                totalVacancies={classData.maxSeats}
                vacanciesFilled={classData.availableSeats}
                time={getTime(classData.lessonSchedule)}
                price={90}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
        <Link href={selectedOption !== null ? `/forms?classId=${selectedOption}` : "#"}>
          <Button
            color="bg-[#FFA12B]"
            label="Avançar"
            onClick={() => {
              if (selectedOption === null) {
                alert("Por favor, selecione uma turma antes de avançar.");
              }
            }}
          />
        </Link>
        </div>
      </main>
    </>
  );
}
