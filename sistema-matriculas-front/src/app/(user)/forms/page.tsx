"use client";
import React, { Suspense, useState } from "react";
import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import { ProgressBar } from "@/components/progress-bar/progress-bar"; // Importe o componente da barra de progresso
// import { ModeEnum } from "../../page";
// import FormStudent from "@/components/formStudent/page.";
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
        <div className="border-2 border-azul rounded-md px-4 sm:px-6 lg:px-8 py-5 bg-branco text-gray-700 mx-4 sm:mx-8 md:mx-16 lg:mx-60 h-96 overflow-y-auto">
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
                Eu, CONTRATANTE, AUTORIZO o uso da imagem do meu filho(a)/ minha
                imagem em todo e qualquer material entre imagens de vídeo,
                fotos, documentos, entre outros, nos canais de comunicação
                vinculados a empresa ISOLADA DE REDAÇÃO VANILMA KARLA;
            </p>
            <br />
            <p>
                A CONTRATANTE garantirá as condições necessárias ao adequado
                desempenho das atividades para a CONTRATADA. Devendo cumprir com
                o pagamento das mensalidades até o DIA 05 DE CADA MÊS. A
                CONTRATADA trabalha com 10 mensalidades (de fevereiro a
                novembro), os meses de janeiro e dezembro não são cobrados. Os
                valores das mensalidades serão de R$95,00 (noventa e cinco
                reais) para o ensino presencial e R$ 75,00 (setenta e cinco
                reais) para o ensino on-line. A matrícula não está inclusa nas
                10 parcelas. O pagamento da matrícula é referente aos materiais
                que os estudantes receberão;
            </p>
            <br />
            <p>
                Caso o CONTRATANTE não pague a mensalidade dentro do prazo
                estabelecido, arcará com uma multa de 10% do valor da parcela,
                mais juros de 1% ao mês. O presente contrato poderá ser
                rescindido pelo CONTRATANTE, mediante pedido formal endereçado à
                CONTRATADA, bem como pela CONTRATADA (caso ocorra situações que
                transgridam a urbanidade , bem como atos de violência, agressão
                e danos materiais ). PARÁGRAFO QUARTO: O pedido de rescisão,
                antes do início das aulas, mediante pedido formal nos termos
                previstos no caput, não comportará a restituição dos valores
                pagos pelo CONTRATANTE, referente à taxa de matrícula , a título
                de remuneração dos custos operacionais despendidos pela
                CONTRATADA para a inicialização dos cursos;
            </p>
            <br />
            <p>
                PARÁGRAFO QUINTO: O pedido de rescisão, após do início das
                aulas, mediante pedido formal nos termos previstos no caput,
                ensejará cobrança de multa compensatória equivalente a 20% sobre
                o valor total do curso, a título de remuneração dos custos
                operacionais despendidos pela CONTRATADA. Além disso, a
                CONTRATANTE deve estar com as mensalidades em dia. Caso não
                esteja, o valor será acrescido no valor total a ser pago.
                PARÁGRAFO SEXTO: Enquanto não apresentado o pedido formal de
                cancelamento, o(a) CONTRATANTE continuará obrigado aos
                pagamentos pelas aulas ministradas, sem exceção, não ocorrendo,
                por parte da CONTRATADA, reembolsos de valores retroativos
                anteriores à data de comunicação da rescisão relacionados às
                aulas. O contrato mais detalhado será enviado para o email dos
                responsáveis financeiros para ser assinado(digitalmente) em um
                prazo de até 48h.
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
            <label
                htmlFor="acceptContract"
                className="border-sky-950 border-2 rounded-md px-4 sm:px-6 lg:px-8 py-5 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-60 flex items-center space-x-4 sm:space-x-6"
            >
                <input
                    type="radio"
                    className="accent-sky-950 scale-125"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    id="acceptContract"
                />
                <p className="text-sky-950 text-base sm:text-lg lg:text-1xl xl:text-2xl font-normal">
                    Eu aceito os termos do contrato.
                </p>
            </label>
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
                        <Suspense>
                            <FormGuardian />
                        </Suspense>
                    </div>
                </div>
            </main>
        </>
    );
}
