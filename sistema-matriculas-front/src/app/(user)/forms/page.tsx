"use client";
import React, { useState } from "react";
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import { ProgressBar } from "@/components/progress-bar/progress-bar"; // Importe o componente da barra de progresso
import { Button } from "@/components//Button";
import Link from "next/link";
// import { ModeEnum } from "../../page";
import FormStudent from "@/components/formStudent/page.";
import FormGuardian from "@/components/formGuardian/page";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from 'yup';

// export enum IsAdultEnum {
//     MINOR = "Menor de idade",
//     ADULT = "Maior de idade",
// }

// export enum RegistrationStatusEnum {
//     RESERVED = "Reservado",
//     CONFIRMED = "Confirmado",
//     CANCELED = "Cancelado",
// }

// export enum PaymentMethodEnum {
//     CREDIT_CARD = "Cartão de crédito",
//     PIX = "Pix",
//     MONEY = "Dinheiro",
// }

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Campo obrigatório'),
//   email: Yup.string().email('Digite o email válido').required('Campo obrigatório')
// });

export default function Forms() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelection = (value: string) => {
        setSelectedOption(value);
    };

    const ContractBox = () => (
        <div className="border-2 border-sky-950 rounded-md px-4 sm:px-6 lg:px-8 py-5 bg-[#003960] text-[#FFFFFF] mx-4 sm:mx-8 md:mx-16 lg:mx-60">
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                Esse texto diz respeito ao contratado que ainda vai ser
                adicionado. Esse texto diz respeito ao contratado que ainda vai
                ser adicionado. Esse texto diz respeito ao contratado que ainda
                vai ser adicionado. Esse texto diz respeito ao contratado que
                ainda vai ser adicionado. Esse texto diz respeito ao contratado
                que ainda vai ser adicionado. Esse texto diz respeito ao
                contratado que ainda vai ser adicionado. Esse texto diz respeito
                ao contratado que ainda vai ser adicionado. Esse texto diz
                respeito ao contratado que ainda vai ser adicionado. Esse texto
                diz respeito ao contratado que ainda vai ser adicionado. Esse
                texto diz respeito ao contratado que ainda vai ser adicionado.
                Esse texto diz respeito ao contratado que ainda vai ser
                adicionado. Esse texto diz respeito ao contratado que ainda vai
                ser adicionado. Esse texto diz respeito ao contratado que ainda
                vai ser adicionado. Esse texto diz respeito ao contratado que
                ainda vai ser adicionado. Esse texto diz respeito ao contratado
                que ainda vai ser adicionado. Esse texto diz respeito ao
                contratado que ainda vai ser adicionado. Esse texto diz respeito
                ao contratado que ainda vai ser adicionado. Esse texto diz
                respeito ao contratado que ainda vai ser adicionado. Esse texto
                diz respeito ao contratado que ainda vai ser adicionado. Esse
                texto diz respeito ao contratado que ainda vai ser adicionado.
                Esse texto diz respeito ao contratado que ainda vai ser
                adicionado.
            </p>
        </div>
    );

    const ConfirmationBox = ({
        onConfirm,
    }: {
        onConfirm: (isChecked: boolean) => void;
    }) => {
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
                <p className="text-sky-950 text-base sm:text-lg lg:text-1xl xl:text-2xl font-normal">
                    Eu aceito os termos do contrato.
                </p>
            </div>
        );
    };

    return (
        <>
            {/* Barra de progresso entre a navbar e o formulário */}
            <ProgressBar currentStep={2} />{" "}
            {/* Passando o estado atual para a barra de progresso */}
            <main className="mb-8">
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
                            Minuta do contrato
                        </h2>
                        <ContractBox />
                        <ConfirmationBox
                            onConfirm={(isChecked) =>
                                console.log("Confirmação:", isChecked)
                            }
                        />
                        <div className="flex flex-col items-center sm:flex-col sm:justify-items-center mx-4 sm:mx-8 lg:mx-60 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 gap-16">
                            <h2 className="text-sky-950 text-3xl text-center font-light py-4">
                                Preencha o Formulário
                            </h2>
                            <FormStudent />
                            <Link href="/">
                                <Button color="bg-[#003960]" label="Voltar" />
                            </Link>
                        </div>
                    </div>
                )}

                {selectedOption === "underage" && (
                    <div className="mt-10 space-y-8">
                        <h2 className="text-sky-950 text-3xl text-center font-light py-4">
                            Minuta do contrato
                        </h2>
                        <ContractBox />
                        <ConfirmationBox
                            onConfirm={(isChecked) =>
                                console.log("Confirmação:", isChecked)
                            }
                        />
                        <div className="flex flex-col items-center sm:flex-col sm:justify-items-center mx-4 sm:mx-8 lg:mx-60 mt-8 space-y-4 sm:space-y-0 sm:space-x-4 gap-16">
                            <h2 className="text-sky-950 text-3xl text-center font-light py-4">
                                Preencha o Formulário
                            </h2>
                            <FormGuardian />
                            <Link href="/">
                                <Button color="bg-[#003960]" label="Voltar" />
                            </Link>
                        </div>
                    </div>
                )}
                {selectedOption == null && (
                    <div className="flex justify-center mt-8">
                        <Link href="/">
                            <Button color="bg-[#003960]" label="Voltar" />
                        </Link>
                    </div>
                )}
            </main>
        </>
    );
}
