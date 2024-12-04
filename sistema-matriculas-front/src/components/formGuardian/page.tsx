"use client";

import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
import { ErrorMessage } from "formik";
import buildAddress from "@/utils/buildAddress";
// import { IsAdultEnum } from "@/app/(user)/forms/page";

// const validationSchema = Yup.object().shape({
//   birthDate: Yup.date()
//     .required("Campo obrigatório")
//     .max(new Date(), "A data deve ser no passado"),
//   fullStudentName: Yup.string().required("Campo obrigatório"),
//   socialName: Yup.string(), // Opcional, sem validação específica
//   studentCpf: Yup.string().required("Campo obrigatório"),
//   studentRg: Yup.string().required("Campo obrigatório"),
//   studentPhone: Yup.string().required("Campo obrigatório"),
//   studentEmail: Yup.string().email("Digite um e-mail válido").required("Campo obrigatório"),
//   studentCep: Yup.string().required("Campo obrigatório"),
//   studentNeighborhood: Yup.string().required("Campo obrigatório"),
//   studentCity: Yup.string().required("Campo obrigatório"),
//   studentState: Yup.string().required("Campo obrigatório"),
//   studentRoad: Yup.string().required("Campo obrigatório"),
//   studentHouseNumber: Yup.string().required("Campo obrigatório"),
//   fullMotherName: Yup.string().required("Campo obrigatório"),
//   motherCpf: Yup.string().required("Campo obrigatório"),
//   motherRg: Yup.string().required("Campo obrigatório"),
//   motherPhone: Yup.string().required("Campo obrigatório"),
//   motherEmail: Yup.string().email("Digite um e-mail válido").required("Campo obrigatório"),
//   motherAddress: Yup.string().required("Campo obrigatório"),
//   fullFatherName: Yup.string().required("Campo obrigatório"),
//   fatherCpf: Yup.string().required("Campo obrigatório"),
//   fatherRg: Yup.string().required("Campo obrigatório"),
//   fatherPhone: Yup.string().required("Campo obrigatório"),
//   fatherEmail: Yup.string().email("Digite um e-mail válido").required("Campo obrigatório"),
//   fatherAddress: Yup.string().required("Campo obrigatório"),
// });

export default function FormGuardian() {
    const searchParams = new URLSearchParams(window.location.search);
    const classId = searchParams.get("classId");
    const mode = searchParams.get("mode");

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
                    console.log(values);

                    const data = {
                        fullStudentName: values.fullStudentName,
                        studentCpf: values.studentCpf,
                        studentRg: values.studentRg,
                        studentPhone: values.studentPhone,
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
                        isAdult: "MINOR",
                        mode: mode,
                        id: classId,
                        fullMotherName: values.fullMotherName,
                        motherCpf: values.motherCpf,
                        motherRg: values.motherRg,
                        motherPhone: values.motherPhone,
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
                        fatherCpf: values.fatherCpf,
                        fatherRg: values.fatherRg,
                        fatherPhone: values.fatherPhone,
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
                    };
                    console.log("formulário:", data);

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
                        .then((response) => response.json()) // Assume que a resposta será um JSON
                        .then((result) => {
                            console.log("Sucesso:", result);
                        })
                        .catch((error) => {
                            console.error("Erro:", error);
                        });
                }}
                //validationSchema={validationSchema}// esquema de validação yup
            >
                {({ handleSubmit }) => (
                    <div className="max-w-4xl mx-auto p-8 bg-white border border-gray-300 rounded-md shadow-md">
                        <Form
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Campos do estudante */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Data de Nascimento{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="date"
                                    name="birthDate"
                                    placeholder="Digite a data de nascimento"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="birthDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Nome do aluno (a){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="fullStudentName"
                                    placeholder="Digite o nome do aluno (a)"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="fullStudentName"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Nome social
                                </label>
                                <Field
                                    type="text"
                                    name="socialName"
                                    placeholder="Digite o nome social"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    CPF do aluno{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="studentCpf"
                                    placeholder="Digite o CPF"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    RG do aluno
                                </label>
                                <Field
                                    type="text"
                                    name="studentRg"
                                    placeholder="Digite o RG"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Telefone do aluno
                                </label>
                                <Field
                                    type="text"
                                    name="studentPhone"
                                    placeholder="Digite o telefone"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    E-mail do aluno
                                </label>
                                <Field
                                    type="email"
                                    name="studentEmail"
                                    placeholder="Digite o e-mail"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    CEP do estudante{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="studentCep"
                                    placeholder="Digite o CEP"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Bairro
                                </label>
                                <Field
                                    type="text"
                                    name="studentNeighborhood"
                                    placeholder="Digite o bairro"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Cidade
                                </label>
                                <Field
                                    type="text"
                                    name="studentCity"
                                    placeholder="Digite a cidade"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Estado
                                </label>
                                <Field
                                    type="text"
                                    name="studentState"
                                    placeholder="Digite o estado"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Rua
                                </label>
                                <Field
                                    type="text"
                                    name="studentRoad"
                                    placeholder="Digite a rua"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">
                                    Número da casa
                                </label>
                                <Field
                                    type="text"
                                    name="studentHouseNumber"
                                    placeholder="Digite o número da casa"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Campos para a mãe */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Nome completo da mãe{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="fullMotherName"
                                    placeholder="Digite o nome completo da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    CPF da mãe{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="motherCpf"
                                    placeholder="Digite o CPF da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    RG da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherRg"
                                    placeholder="Digite o RG da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Telefone da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherPhone"
                                    placeholder="Digite o telefone da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    E-mail da mãe
                                </label>
                                <Field
                                    type="email"
                                    name="motherEmail"
                                    placeholder="Digite o e-mail da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    CEP da mãe{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="motherCep"
                                    placeholder="Digite o CEP da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Bairro da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherNeighborhood"
                                    placeholder="Digite o bairro da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Cidade da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherCity"
                                    placeholder="Digite a cidade da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Estado da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherState"
                                    placeholder="Digite o estado da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Rua da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherRoad"
                                    placeholder="Digite a rua da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Número da casa da mãe
                                </label>
                                <Field
                                    type="text"
                                    name="motherHouseNumber"
                                    placeholder="Digite o número da casa da mãe"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {/* Campos para o pai */}
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Nome completo do pai{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="fullFatherName"
                                    placeholder="Digite o nome completo do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    CPF do pai{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="fatherCpf"
                                    placeholder="Digite o CPF do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    RG do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherRg"
                                    placeholder="Digite o RG do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Telefone do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherPhone"
                                    placeholder="Digite o telefone do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    E-mail do pai
                                </label>
                                <Field
                                    type="email"
                                    name="fatherEmail"
                                    placeholder="Digite o e-mail do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    CEP do pai{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Field
                                    type="text"
                                    name="fatherCep"
                                    placeholder="Digite o CEP do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Bairro do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherNeighborhood"
                                    placeholder="Digite o bairro do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Cidade do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherCity"
                                    placeholder="Digite a cidade do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Estado do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherState"
                                    placeholder="Digite o estado do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Rua do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherRoad"
                                    placeholder="Digite a rua do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="text-gray-700 font-medium mb-1">
                                    Número da casa do pai
                                </label>
                                <Field
                                    type="text"
                                    name="fatherHouseNumber"
                                    placeholder="Digite o número da casa do pai"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-[#FFA12B] text-white px-8 py-4 rounded-md w-full sm:w-auto font-montserrat font-medium text-[18px] sm:text-[20px] lg:text-[22px] transition-all duration-200`"
                            >
                                Enviar
                            </button>
                        </Form>
                    </div>
                )}
            </Formik>
        </>
    );
}
