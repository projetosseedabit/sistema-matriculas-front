'use client';
import React, { useState } from "react";
import Header from "@/components/header";
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import Form from "@/components/form-student/Formstudent";

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "number";
  placeholder: string;
  value: string;
  required?: boolean;
}

export default function Forms() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    console.log("Opção selecionada:", value);
    setSelectedOption(value);
  };

  const handleSubmit = (formData: Record<string, string>) => {
    console.log("Dados enviados:", formData);
    alert("Formulário enviado com sucesso!");
  };

  const commonFields: FormField[] = [
    { label: "Nome do aluno (a)", name: "studentName", type: "text", placeholder: "Digite o nome do aluno (a)", value: "", required: true },
    { label: "Nome social", name: "socialName", type: "text", placeholder: "Digite o nome social", value: "" },
    { label: "CPF do aluno", name: "cpf", type: "text", placeholder: "Digite o CPF", value: "", required: true },
    { label: "RG do aluno", name: "rg", type: "text", placeholder: "Digite o RG", value: "" },
    { label: "Telefone do aluno", name: "phone", type: "text", placeholder: "Digite o telefone", value: "" },
    { label: "E-mail do aluno", name: "email", type: "email", placeholder: "Digite o e-mail", value: "" },
    { label: "CEP do estudante", name: "cep", type: "text", placeholder: "Digite o CEP", value: "", required: true },
    { label: "Bairro", name: "neighborhood", type: "text", placeholder: "Digite o bairro", value: "" },
    { label: "Cidade", name: "city", type: "text", placeholder: "Digite a cidade", value: "" },
    { label: "Estado", name: "state", type: "text", placeholder: "Digite o estado", value: "" },
    { label: "Endereço", name: "address", type: "text", placeholder: "Digite o endereço", value: "" },
    { label: "Número", name: "number", type: "text", placeholder: "Digite o número", value: "" },
  ];

  const parentFields: FormField[] = [
    { label: "Nome da mãe", name: "motherName", type: "text", placeholder: "Digite o nome da mãe", value: "", required: true },
    { label: "CPF da mãe", name: "motherCPF", type: "text", placeholder: "Digite o CPF da mãe", value: "" },
    { label: "RG da mãe", name: "motherRG", type: "text", placeholder: "Digite o RG da mãe", value: "" },
    { label: "Telefone da mãe", name: "motherPhone", type: "text", placeholder: "Digite o telefone da mãe", value: "" },
    { label: "Endereço da mãe", name: "motherAddress", type: "text", placeholder: "Digite o endereço da mãe", value: "" },
    { label: "E-mail da mãe", name: "motherEmail", type: "email", placeholder: "Digite o e-mail da mãe", value: "" },
    { label: "Nome do pai", name: "fatherName", type: "text", placeholder: "Digite o nome do pai", value: "" },
    { label: "CPF do pai", name: "fatherCPF", type: "text", placeholder: "Digite o CPF do pai", value: "" },
    { label: "RG do pai", name: "fatherRG", type: "text", placeholder: "Digite o RG do pai", value: "" },
    { label: "Telefone do pai", name: "fatherPhone", type: "text", placeholder: "Digite o telefone do pai", value: "" },
    { label: "Endereço do pai", name: "fatherAddress", type: "text", placeholder: "Digite o endereço do pai", value: "" },
    { label: "E-mail do pai", name: "fatherEmail", type: "email", placeholder: "Digite o e-mail do pai", value: "" },
  ];

  const formFields: FormField[] = selectedOption === "underage"
    ? [
        { label: "Data de Nascimento", name: "birthDate", type: "text", placeholder: "DD/MM/AAAA", value: "", required: true },
        ...commonFields,
      ]
    : selectedOption === "overEighteen"
    ? [
        { label: "Nome do Responsável", name: "responsibleName", type: "text", placeholder: "Digite o nome", value: "", required: true },
        { label: "CPF do Responsável", name: "responsibleCPF", type: "text", placeholder: "Digite o CPF", value: "", required: true },
        ...commonFields,
      ]
    : [];

  return (
    <>
      <Header />
      <h1 className="text-sky-950 text-4xl text-center font-light py-8">
        Preencha o formulário
      </h1>
      <div className="space-y-8">
        <CardStudentType
          label="Sou maior de idade, sou meu próprio responsável financeiro e quero me inscrever para a Isolada de Redação VK."
          name="studentType"
          value="underage"
          checked={selectedOption === "underage"}
          onChange={handleSelection}
        />
        <CardStudentType
          label="Sou pai/responsável e quero matricular filho(a) ou alguém de minha responsabilidade para a Isolada de Redação VK."
          name="studentType"
          value="overEighteen"
          checked={selectedOption === "overEighteen"}
          onChange={handleSelection}
        />
      </div>

      {selectedOption && formFields.length > 0 && (
        <div className="mt-10 space-y-8">
          <Form fields={formFields} onSubmit={handleSubmit} />
          <Form fields={parentFields} onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
}
