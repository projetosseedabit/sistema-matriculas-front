'use client'
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import Header from "@/components/header";
import { useState } from "react";

export default function Forms() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    console.log(value);
  };
  return (
    <>
      <Header />
      <h1 className="text-sky-950 text-4xl text-center font-light py-8">Preencha o formulário</h1>
      <div className="space-y-8">
        <CardStudentType label='Sou maior de idade, sou meu próprio responsável financeiro e quero me inscrever para a Isolada de Redação VK.' name="studentType" value="underage"
          checked={selectedOption === "underage"}
          onChange={handleSelection}></CardStudentType>
          <CardStudentType label='Sou pai/responsável e quero matricular filho(a) ou alguém de minha responsabilidade para a Isolada de Redação VK.' name="studentType" value="overEighteen"
          checked={selectedOption === "overEighteen"}
          onChange={handleSelection}></CardStudentType>
      </div>
      { selectedOption === "underage" && (<p>Eu sou MENOR de idade</p>)} 
      {selectedOption === "overEighteen" && (<p>Eu sou MAIOR de idade</p>) }
        
      
    
    </>
  )
}