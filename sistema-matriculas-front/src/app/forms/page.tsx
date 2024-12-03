'use client';
import React, {useState } from "react";
import Header from "@/components/header";
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import Form from "@/components/form-student/Formstudent";
import { Button } from "@/components//Button";
import { ProgressBar } from "@/components/progress-bar/progress-bar"; // Importe o componente da barra de progresso
import Link from "next/link";
import PaymentButton from "@/components/PaymentButton.tsx/PaymentButton"

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

  const formFields: FormField[] = [
    { label: "Data de Nascimento", name: "birthDate", type: "text", placeholder: "DD/MM/AAAA", value: "", required: true },
    ...commonFields,
  ];

  const ContractBox = () => (
    <div className="border-2 border-sky-950 rounded-md px-4 sm:px-6 lg:px-8 py-5 bg-[#003960] text-[#FFFFFF] mx-4 sm:mx-8 md:mx-16 lg:mx-60">
      <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado. Esse texto diz respeito ao contratado que ainda vai ser adicionado.
        Esse texto diz respeito ao contratado que ainda vai ser adicionado.
      </p>
    </div>
);


  const ConfirmationBox = ({ onConfirm }: { onConfirm: (isChecked: boolean) => void }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      onConfirm(newCheckedState);
    };


    return (
      <div className="border-sky-950 border-2 rounded-md px-4 sm:px-6 lg:px-8 py-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 flex items-center space-x-4 sm:space-x-6">
        <input
          type="radio"
          className="accent-sky-950 scale-125"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className="text-sky-950 text-base sm:text-lg lg:text-2xl xl:text-3xl font-normal">
          Eu aceito os termos do contrato.
        </p>
      </div>

    
    
    );
  };

  return (
    <>
  <Header />
  
  {/* Barra de progresso entre a navbar e o formulário */}
  <ProgressBar currentStep={2} />  {/* Passando o estado atual para a barra de progresso */}
  
  <h1 className="text-sky-950 text-4xl text-center font-light py-8">
    Preencha o formulário
  </h1>
  
  <div className="space-y-8">
    <CardStudentType
      label="Sou maior de idade, sou meu próprio responsável financeiro e quero me inscrever para a Isolada de Redação VK."
      name="studentType"
      value="overEighteen"
      checked={selectedOption === "overEighteen"}
      onChange={handleSelection}
    />
    <CardStudentType
      label="Sou pai/responsável e quero matricular filho(a) ou alguém de minha responsabilidade para a Isolada de Redação VK."
      name="studentType"
      value="underage"
      checked={selectedOption === "underage"}
      onChange={handleSelection}
    />
  </div>

  {selectedOption === "overEighteen" && (
    <div className="mt-10 space-y-8">
      <h2 className="text-sky-950 text-3xl text-center font-light py-4">
        Dados do aluno
      </h2>
      <Form fields={formFields} onSubmit={handleSubmit} />
      <h2 className="text-sky-950 text-3xl text-center font-light py-4">
        Minuta do contrato
      </h2>
      <ContractBox />
      <ConfirmationBox onConfirm={(isChecked) => console.log("Confirmação:", isChecked)} />
      <div className="flex flex-col sm:flex-row sm:justify-between mx-4 sm:mx-8 lg:mx-60 mt-8">
        <Link href="/">
          <Button color="bg-[#003960]" label="Voltar" />
        </Link>
        <Link href="/purchaseConfirmationPage">
          <Button color="bg-[#FFA12B]" label="Avançar" />
        </Link>
      </div>
    </div>
  )}

  {selectedOption === "underage" && (
    <div className="mt-10 space-y-8">
      <h2 className="text-sky-950 text-3xl text-center font-light py-4">
        Dados do aluno
      </h2>
      <Form fields={formFields} onSubmit={handleSubmit} />
      <h2 className="text-sky-950 text-3xl text-center font-light py-4">
        Dados do responsável
      </h2>
      <Form fields={parentFields} onSubmit={handleSubmit} />
      <h2 className="text-sky-950 text-3xl text-center font-light py-4">
        Minuta do contrato
      </h2>
      <ContractBox />
      <ConfirmationBox onConfirm={(isChecked) => console.log("Confirmação:", isChecked)} />
      <div className="flex flex-col sm:flex-row sm:justify-between mx-4 sm:mx-8 lg:mx-60 mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/">
              <Button color="bg-[#003960]" label="Voltar" />
            </Link>
            <PaymentButton
              courseType={selectedOption === "underage" ? "IN_PERSON" : "ONLINE"}
              student={{ fullName: "Nome Exemplo", email: "exemplo@email.com" }}
              classObj={{
                id: "12345",
                fullName: "Curso Exemplo",
                paymentAmount: 150,
              }}
            />
          </div>



    </div>
  )}
</>

  );
}