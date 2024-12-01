'use client';
import React, {useState } from "react";
import Header from "@/components/header";
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import Form from "@/components/form-student/Formstudent";
import { ProgressBar } from "@/components/progress-bar/progress-bar"; // Importe o componente da barra de progresso
import { Button } from "@/components//Button";
import Link from "next/link";


interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "number";
  placeholder: string;
  value: string;
  required?: boolean;
  validate?: (value: string) => boolean | null; // Função de validação opcional
}

export default function Forms() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelection = (value: string) => {
    console.log("Opção selecionada:", value);
    setSelectedOption(value);
  };

  const handleSubmit = async () => {
    console.log("Enviando")
    
    if (validateFields(commonFields)) {
      
      try {
        const formData = {
          // Mapeie os campos para o formato esperado pelo backend
          fullStudentName: commonFields.find((field) => field.name === "studentName")?.value,
          studentCpf: commonFields.find((field) => field.name === "cpf")?.value,
          studentRg: commonFields.find((field) => field.name === "rg")?.value,
          studentPhone: commonFields.find((field) => field.name === "phone")?.value,
          studentEmail: commonFields.find((field) => field.name === "email")?.value,
          studentAddress: commonFields.find((field) => field.name === "address")?.value,
          socialName: commonFields.find((field) => field.name === "socialName")?.value,
          isAdult: selectedOption,
          mode: "IN_PERSON",
          fullResponsibleName: parentFields.find((field) => field.name === "motherName")?.value,
          responsibleCpf: parentFields.find((field) => field.name === "motherCPF")?.value,
          responsibleRg: parentFields.find((field) => field.name === "motherRG")?.value,
          responsiblePhone: parentFields.find((field) => field.name === "motherPhone")?.value,
          responsibleEmail: parentFields.find((field) => field.name === "motherEmail")?.value,
          responsibleAddress: parentFields.find((field) => field.name === "motherAddress")?.value,
          relationship: "MOTHER",
          status: "RESERVED",
          transactionId: 25,
          paymentMethod: "PIX",
        };
  
        const response = await fetch("https://king-prawn-app-3bepj.ondigitalocean.app/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) throw new Error("Erro ao enviar os dados.");
        alert("Formulário enviado com sucesso!");
      } catch (error) {
        console.error("Erro no envio:", error);
        alert("Erro ao enviar os dados. Por favor, tente novamente.");
      }
    } else {
      alert("Por favor, corrija os erros no formulário.");
    }
  };

  function isValidCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Verifica formato e repetições

    let sum = 0;
    let remainder: number;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;

    // Valida o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;

    return remainder === parseInt(cpf.charAt(10));
}

function isValidRG(rg: string): boolean {
  console.log(rg);
  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
  
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/; // Aceita formatos brasileiros
  return phoneRegex.test(phone);
}

function isValidCEP(cep: string): boolean {
  const cepRegex = /^\d{5}-?\d{3}$/; // Formato brasileiro (XXXXX-XXX ou XXXXXXXX)
  return cepRegex.test(cep);
}

function validateFields(fields: FormField[]): boolean {
  for (const field of fields) {
      const { value, required, validate, label } = field;

      // Verifica se o campo obrigatório está vazio
      if (required && !value.trim()) {
          console.error(`${label} é obrigatório.`);
          return false;
      }

      // Executa a função de validação, se existir
      if (validate && !validate(value)) {
          console.error(`${label} contém um valor inválido.`);
          return false;
      }
  }
  return true;
}




  const commonFields: FormField[] = [
    { label: "Nome do aluno (a)", name: "studentName", type: "text", placeholder: "Digite o nome do aluno (a)", value: "", required: true },
    { label: "Nome social", name: "socialName", type: "text", placeholder: "Digite o nome social", value: "" },
    { label: "CPF do aluno", name: "cpf", type: "number", placeholder: "Digite o CPF", value: "", required: true, validate: isValidCPF },
    { label: "RG do aluno", name: "rg", type: "number", placeholder: "Digite o RG", value: "", validate: isValidRG },
    { label: "Telefone do aluno", name: "phone", type: "number", placeholder: "Digite o telefone", value: "", validate: isValidPhone },
    { label: "E-mail do aluno", name: "email", type: "email", placeholder: "Digite o e-mail", value: "", validate: isValidEmail },
    { label: "CEP do estudante", name: "cep", type: "text", placeholder: "Digite o CEP", value: "", required: true, validate: isValidCEP },
    { label: "Bairro", name: "neighborhood", type: "text", placeholder: "Digite o bairro", value: "" },
    { label: "Cidade", name: "city", type: "text", placeholder: "Digite a cidade", value: "" },
    { label: "Estado", name: "state", type: "text", placeholder: "Digite o estado", value: "" },
    { label: "Endereço", name: "address", type: "text", placeholder: "Digite o endereço", value: "" },
    { label: "Número", name: "number", type: "text", placeholder: "Digite o número", value: "" },
  ];

  const parentFields: FormField[] = [
    { label: "Nome da mãe", name: "motherName", type: "text", placeholder: "Digite o nome da mãe", value: "", required: true,   },
    { label: "CPF da mãe", name: "motherCPF", type: "number", placeholder: "Digite o CPF da mãe", value: "", validate: isValidCPF },
    { label: "RG da mãe", name: "motherRG", type: "number", placeholder: "Digite o RG da mãe", value: "", validate: isValidRG },
    { label: "Telefone da mãe", name: "motherPhone", type: "number", placeholder: "Digite o telefone da mãe", value: "", validate: isValidPhone },
    { label: "Endereço da mãe", name: "motherAddress", type: "text", placeholder: "Digite o endereço da mãe", value: "" },
    { label: "E-mail da mãe", name: "motherEmail", type: "email", placeholder: "Digite o e-mail da mãe", value: "", validate: isValidEmail },
    { label: "Nome do pai", name: "fatherName", type: "text", placeholder: "Digite o nome do pai", value: "" },
    { label: "CPF do pai", name: "fatherCPF", type: "number", placeholder: "Digite o CPF do pai", value: "", validate: isValidCPF },
    { label: "RG do pai", name: "fatherRG", type: "number", placeholder: "Digite o RG do pai", value: "", validate: isValidRG },
    { label: "Telefone do pai", name: "fatherPhone", type: "number", placeholder: "Digite o telefone do pai", value: "", validate: isValidPhone },
    { label: "Endereço do pai", name: "fatherAddress", type: "text", placeholder: "Digite o endereço do pai", value: "" },
    { label: "E-mail do pai", name: "fatherEmail", type: "email", placeholder: "Digite o e-mail do pai", value: "", validate: isValidEmail },
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
        
        <Button color="bg-[#FFA12B]" label="Avançar" onClick={handleSubmit} />
      
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
    <Button
      color="bg-[#003960]"
      label="Voltar"
    />
  </Link>
    <Button
      color="bg-[#FFA12B]"
      label="Avançar"
      onClick={handleSubmit}
    />

</div>

    </div>
  )}
</>

  );
}
