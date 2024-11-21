'use client'
import { ClassCard } from "@/components/class-card/class-card";
import Header from "../components/header";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    console.log(value);
  };
  return (
    <>

      <Header />
      <main className="min-h-screen p-8">
      <ClassCard  value="underage"
      checked={selectedOption === "underage"}
      onChange={handleSelection} dayOfWeek={"Segunda-feira"} modality={"Presencial"} id={"0"} price={0} totalVacancies={45} vacanciesFilled={0} startTime={"19h"} endTime={"20h"}></ClassCard>
      </main>

    </>
  );
}

