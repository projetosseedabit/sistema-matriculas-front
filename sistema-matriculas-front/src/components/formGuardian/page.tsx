"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import buildAddress from "@/utils/buildAddress";
import { useRouter, useSearchParams } from "next/navigation";
import { InputField } from "../InputField";
import { useState } from "react";
// import { IsAdultEnum } from "@/app/(user)/forms/page";

function getAgeClassification(birthDate: string): "ADULT" | "MINOR" {
    const today: Date = new Date();
    const birth: Date = new Date(birthDate);

    let age: number = today.getFullYear() - birth.getFullYear();
    const monthDifference: number = today.getMonth() - birth.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age >= 18 ? "ADULT" : "MINOR";
}

function validateCpf(cpf: string) {
    const onlyNumbers = cpf.replace(/\D/g, "");
    if (onlyNumbers.length !== 11) {
        return false;
    }

    const numbers = onlyNumbers.split("").map(Number);

    let sum = 0;
    let rest;

    for (let i = 0; i <= 8; i++) {
        sum += numbers[i] * (i + 1);
    }

    rest = sum % 11;

    if (rest === 10) {
        rest = 0;
    }

    if (rest !== numbers[9]) {
        return false;
    }

    sum = 0;

    for (let i = 0; i <= 9; i++) {
        sum += numbers[i] * i;
    }

    rest = sum % 11;

    if (rest === 10) {
        rest = 0;
    }

    if (rest !== numbers[10]) {
        return false;
    }

    return true;
}

function validatePhoneNumber(phone: string) {
    const onlyNumbers = phone.replace(/\D/g, "");
    return onlyNumbers.length === 11 || onlyNumbers.length === 10;
}

function validateCep(cep: string) {
    const onlyNumbers = cep.replace(/\D/g, "");
    return onlyNumbers.length === 8;
}

const validationSchema = Yup.object().shape({
    birthDate: Yup.date()
        .required("Campo obrigatório")
        .max(new Date(), "A data deve ser no passado"),
    fullStudentName: Yup.string().required("Campo obrigatório"),
    socialName: Yup.string().required("Campo obrigatório"),
    studentCpf: Yup.string()
        .required("Campo obrigatório")
        .test({ test: validateCpf, message: "Digite um CPF válido" }),
    studentRg: Yup.string().required("Campo obrigatório"),
    studentPhone: Yup.string().required("Campo obrigatório").test({
        test: validatePhoneNumber,
        message: "Digite um telefone válido",
    }),
    studentEmail: Yup.string()
        .email("Digite um e-mail válido")
        .required("Campo obrigatório"),
    studentCep: Yup.string().required("Campo obrigatório").test({
        test: validateCep,
        message: "Digite um CEP válido",
    }),
    studentNeighborhood: Yup.string().required("Campo obrigatório"),
    studentCity: Yup.string().required("Campo obrigatório"),
    studentState: Yup.string().required("Campo obrigatório"),
    studentRoad: Yup.string().required("Campo obrigatório"),
    studentHouseNumber: Yup.string().required("Campo obrigatório"),
    fullMotherName: Yup.string().required("Campo obrigatório"),
    motherCpf: Yup.string()
        .required("Campo obrigatório")
        .test({ test: validateCpf, message: "Digite um CPF válido" }),
    motherRg: Yup.string().required("Campo obrigatório"),
    motherPhone: Yup.string().required("Campo obrigatório").test({
        test: validatePhoneNumber,
        message: "Digite um telefone válido",
    }),
    motherEmail: Yup.string()
        .email("Digite um e-mail válido")
        .required("Campo obrigatório"),
    motherCep: Yup.string().required("Campo obrigatório").test({
        test: validateCep,
        message: "Digite um CEP válido",
    }),
    motherNeighborhood: Yup.string().required("Campo obrigatório"),
    motherCity: Yup.string().required("Campo obrigatório"),
    motherState: Yup.string().required("Campo obrigatório"),
    motherRoad: Yup.string().required("Campo obrigatório"),
    motherHouseNumber: Yup.string().required("Campo obrigatório"),
    fullFatherName: Yup.string().required("Campo obrigatório"),
    fatherCpf: Yup.string()
        .required("Campo obrigatório")
        .test({ test: validateCpf, message: "Digite um CPF válido" }),
    fatherRg: Yup.string().required("Campo obrigatório"),
    fatherPhone: Yup.string().required("Campo obrigatório").test({
        test: validatePhoneNumber,
        message: "Digite um telefone válido",
    }),
    fatherEmail: Yup.string()
        .email("Digite um e-mail válido")
        .required("Campo obrigatório"),
    fatherCep: Yup.string().required("Campo obrigatório").test({
        test: validateCep,
        message: "Digite um CEP válido",
    }),
    fatherNeighborhood: Yup.string().required("Campo obrigatório"),
    fatherCity: Yup.string().required("Campo obrigatório"),
    fatherState: Yup.string().required("Campo obrigatório"),
    fatherRoad: Yup.string().required("Campo obrigatório"),
    fatherHouseNumber: Yup.string().required("Campo obrigatório"),
});

export default function FormGuardian() {
    const searchParams = useSearchParams();
    const classId = searchParams.get("classId");
    const mode = searchParams.get("mode");
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "Erro ao criar matrícula, por favor, revise suas informações!"
    );

    type FormField = {
        label: string;
        labelObs?: string;
        name: string;
        type: string;
        required: boolean;
        placeholder: string;
        inputType?: "select" | "input";
    };

    const fields: FormField[] = [
        {
            label: "Data de Nascimento",
            name: "birthDate",
            type: "date",
            required: true,
            placeholder: "Digite a data de nascimento",
        },
        {
            label: "Nome do aluno (a)",
            name: "fullStudentName",
            type: "text",
            required: true,
            placeholder: "Digite o nome do aluno (a)",
        },
        {
            label: "Nome social",
            labelObs: "(repetir nome, caso não possua)",
            name: "socialName",
            type: "text",
            required: true,
            placeholder: "Digite o nome social",
        },
        {
            label: "CPF do aluno",
            name: "studentCpf",
            type: "text",
            required: true,
            placeholder: "Digite o CPF",
        },
        {
            label: "RG do aluno",
            name: "studentRg",
            type: "text",
            required: true,
            placeholder: "Digite o RG",
        },
        {
            label: "Telefone do aluno",
            labelObs: "(com DDD)",
            name: "studentPhone",
            type: "text",
            required: true,
            placeholder: "Digite o telefone",
        },
        {
            label: "E-mail do aluno",
            name: "studentEmail",
            type: "email",
            required: true,
            placeholder: "Digite o e-mail",
        },
        {
            label: "CEP do aluno",
            name: "studentCep",
            type: "text",
            required: true,
            placeholder: "Digite o CEP",
        },
        {
            label: "Bairro do aluno",
            name: "studentNeighborhood",
            type: "text",
            required: true,
            placeholder: "Digite o bairro",
        },
        {
            label: "Cidade do aluno",
            name: "studentCity",
            type: "text",
            required: true,
            placeholder: "Digite a cidade",
        },
        {
            label: "Estado do aluno",
            name: "studentState",
            type: "text",
            required: true,
            placeholder: "Digite o estado",
            inputType: "select",
        },
        {
            label: "Rua do aluno",
            name: "studentRoad",
            type: "text",
            required: true,
            placeholder: "Digite a rua",
        },
        {
            label: "Número da casa",
            name: "studentHouseNumber",
            type: "text",
            required: true,
            placeholder: "Digite o número da casa",
        },
        {
            label: "Nome completo da mãe",
            name: "fullMotherName",
            type: "text",
            required: true,
            placeholder: "Digite o nome completo da mãe",
        },
        {
            label: "CPF da mãe",
            name: "motherCpf",
            type: "text",
            required: true,
            placeholder: "Digite o CPF",
        },
        {
            label: "RG da mãe",
            name: "motherRg",
            type: "text",
            required: true,
            placeholder: "Digite o RG",
        },
        {
            label: "Telefone da mãe",
            labelObs: "(com DDD)",
            name: "motherPhone",
            type: "text",
            required: true,
            placeholder: "Digite o telefone",
        },
        {
            label: "E-mail da mãe",
            name: "motherEmail",
            type: "email",
            required: true,
            placeholder: "Digite o e-mail",
        },
        {
            label: "CEP da mãe",
            name: "motherCep",
            type: "text",
            required: true,
            placeholder: "Digite o CEP",
        },
        {
            label: "Bairro da mãe",
            name: "motherNeighborhood",
            type: "text",
            required: true,
            placeholder: "Digite o bairro",
        },
        {
            label: "Cidade da mãe",
            name: "motherCity",
            type: "text",
            required: true,
            placeholder: "Digite a cidade",
        },
        {
            label: "Estado da mãe",
            name: "motherState",
            type: "text",
            required: true,
            placeholder: "Digite o estado",
            inputType: "select",
        },
        {
            label: "Rua da mãe",
            name: "motherRoad",
            type: "text",
            required: true,
            placeholder: "Digite a rua",
        },
        {
            label: "Número da casa da mãe",
            name: "motherHouseNumber",
            type: "text",
            required: true,
            placeholder: "Digite o número da casa",
        },
        {
            label: "Nome completo do pai",
            name: "fullFatherName",
            type: "text",
            required: true,
            placeholder: "Digite o nome completo do pai",
        },
        {
            label: "CPF do pai",
            name: "fatherCpf",
            type: "text",
            required: true,
            placeholder: "Digite o CPF",
        },
        {
            label: "RG do pai",
            name: "fatherRg",
            type: "text",
            required: true,
            placeholder: "Digite o RG",
        },
        {
            label: "Telefone do pai",
            labelObs: "(com DDD)",
            name: "fatherPhone",
            type: "text",
            required: true,
            placeholder: "Digite o telefone",
        },
        {
            label: "E-mail do pai",
            name: "fatherEmail",
            type: "email",
            required: true,
            placeholder: "Digite o e-mail",
        },
        {
            label: "CEP do pai",
            name: "fatherCep",
            type: "text",
            required: true,
            placeholder: "Digite o CEP",
        },
        {
            label: "Bairro do pai",
            name: "fatherNeighborhood",
            type: "text",
            required: true,
            placeholder: "Digite o bairro",
        },
        {
            label: "Cidade do pai",
            name: "fatherCity",
            type: "text",
            required: true,
            placeholder: "Digite a cidade",
        },
        {
            label: "Estado do pai",
            name: "fatherState",
            type: "text",
            required: true,
            placeholder: "Digite o estado",
            inputType: "select",
        },
        {
            label: "Rua do pai",
            name: "fatherRoad",
            type: "text",
            required: true,
            placeholder: "Digite a rua",
        },
        {
            label: "Número da casa do pai",
            name: "fatherHouseNumber",
            type: "text",
            required: true,
            placeholder: "Digite o número da casa",
        },
    ];

    return (
        <>
            <Formik
                initialValues={{
                    birthDate: "",
                    fullStudentName: "",
                    socialName: "",
                    studentCpf: "",
                    studentRg: "",
                    studentPhone: "",
                    studentEmail: "",
                    studentCep: "",
                    studentNeighborhood: "",
                    studentCity: "",
                    studentState: "",
                    studentRoad: "",
                    studentHouseNumber: "",
                    fullMotherName: "",
                    motherCpf: "",
                    motherRg: "",
                    motherPhone: "",
                    motherEmail: "",
                    motherCep: "",
                    motherNeighborhood: "",
                    motherCity: "",
                    motherState: "",
                    motherRoad: "",
                    motherHouseNumber: "",
                    fullFatherName: "",
                    fatherCpf: "",
                    fatherRg: "",
                    fatherPhone: "",
                    fatherEmail: "",
                    fatherCep: "",
                    fatherNeighborhood: "",
                    fatherCity: "",
                    fatherState: "",
                    fatherRoad: "",
                    fatherHouseNumber: "",
                }}
                onSubmit={async (values) => {
                    setIsError(false);
                    if (
                        values.studentEmail === values.motherEmail ||
                        values.studentEmail === values.fatherEmail ||
                        values.motherEmail === values.fatherEmail
                    ) {
                        setIsError(true);
                        setErrorMessage("Os e-mails devem ser diferentes");
                        return;
                    }

                    if (
                        values.studentCpf.replace(/\D/g, "") ===
                            values.motherCpf.replace(/\D/g, "") ||
                        values.studentCpf.replace(/\D/g, "") ===
                            values.fatherCpf.replace(/\D/g, "") ||
                        values.motherCpf.replace(/\D/g, "") ===
                            values.fatherCpf.replace(/\D/g, "")
                    ) {
                        setIsError(true);
                        setErrorMessage("Os CPFs devem ser diferentes");
                        return;
                    }

                    if (
                        values.studentRg.replace(/\D/g, "") ===
                            values.motherRg.replace(/\D/g, "") ||
                        values.studentRg.replace(/\D/g, "") ===
                            values.fatherRg.replace(/\D/g, "") ||
                        values.motherRg.replace(/\D/g, "") ===
                            values.fatherRg.replace(/\D/g, "")
                    ) {
                        setIsError(true);
                        setErrorMessage("Os RGs devem ser diferentes");
                        return;
                    }

                    const data = {
                        fullStudentName: values.fullStudentName,
                        studentCpf: values.studentCpf.replace(/\D/g, ""),
                        studentRg: values.studentRg.replace(/\D/g, ""),
                        studentPhone: values.studentPhone.replace(/\D/g, ""),
                        studentEmail: values.studentEmail,
                        studentAddress: buildAddress(
                            values.studentState,
                            values.studentCity,
                            values.studentNeighborhood,
                            values.studentRoad,
                            values.studentHouseNumber,
                            values.studentCep
                        ),
                        socialName: values.socialName,
                        isAdult: getAgeClassification(values.birthDate),
                        mode: mode,
                        id: classId,
                        fullMotherName: values.fullMotherName,
                        motherCpf: values.motherCpf.replace(/\D/g, ""),
                        motherRg: values.motherRg.replace(/\D/g, ""),
                        motherPhone: values.motherPhone.replace(/\D/g, ""),
                        motherEmail: values.motherEmail,
                        motherAddress: buildAddress(
                            values.motherState,
                            values.motherCity,
                            values.motherNeighborhood,
                            values.motherRoad,
                            values.motherHouseNumber,
                            values.motherCep
                        ),
                        fullFatherName: values.fullFatherName,
                        fatherCpf: values.fatherCpf.replace(/\D/g, ""),
                        fatherRg: values.fatherRg.replace(/\D/g, ""),
                        fatherPhone: values.fatherPhone.replace(/\D/g, ""),
                        fatherEmail: values.fatherEmail,
                        fatherAddress: buildAddress(
                            values.fatherState,
                            values.fatherCity,
                            values.fatherNeighborhood,
                            values.fatherRoad,
                            values.fatherHouseNumber,
                            values.fatherCep
                        ),
                        status: "RESERVED",
                        paymentMethod: "MERCADO_PAGO",
                    };

                    fetch(
                        "https://king-prawn-app-3bepj.ondigitalocean.app/forms",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                            // Envia os dados como uma string JSON
                        }
                    )
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(
                                    "Erro ao criar matrícula, por favor, revise suas informações!"
                                );
                            }

                            return response.json();
                        }) // Assume que a resposta será um JSON
                        .then((result) => {
                            router.push(result.init_point);
                        })
                        .catch((error) => {
                            setIsError(true);
                            if (error instanceof Error) {
                                setErrorMessage(error.message);
                            } else {
                                setErrorMessage(
                                    "Erro ao criar matrícula, por favor, revise suas informações!"
                                );
                            }
                        });
                }}
                validationSchema={validationSchema} // esquema de validação yup
            >
                {({ handleSubmit }) => (
                    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 rounded-md shadow-md">
                        <Form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {fields.map((field: FormField) => (
                                <InputField
                                    key={field.name}
                                    label={field.label}
                                    labelObs={field.labelObs}
                                    name={field.name}
                                    type={field.type}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    inputType={field.inputType}
                                />
                            ))}

                            <button
                                type="submit"
                                className="bg-[#FFA12B] text-white px-8 py-4 rounded-md w-full sm:w-auto font-montserrat font-medium text-[18px] sm:text-[20px] lg:text-[22px] transition-all duration-200`"
                            >
                                Enviar
                            </button>
                            {isError ? (
                                <p className="col-span-2 sm:col-span-1 text-vermelho">
                                    {errorMessage}
                                </p>
                            ) : null}
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
