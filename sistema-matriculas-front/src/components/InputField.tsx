import { ErrorMessage, Field } from "formik";

type InputFieldProps = {
    label: string;
    labelObs?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder: string;
    inputType?: "select" | "input";
    colSpan?: number;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({
    label,
    labelObs,
    required,
    name,
    type,
    placeholder,
    inputType = "input",
    colSpan,
    ...rest
}: InputFieldProps) {
    return (
        <div className={`col-span-1 ${colSpan === 2 ? "sm:col-span-2" : null}`}>
            <label
                className="text-azul font-semibold mb-1 block"
                htmlFor={name}
            >
                {label}
                {labelObs ? (
                    <span className="text-sm"> {labelObs}</span>
                ) : null}{" "}
                {required ? <span className="text-red-500">*</span> : null}
            </label>
            <Field
                as={inputType}
                required={required}
                type={type}
                name={name}
                placeholder={placeholder}
                id={name}
                className="w-full px-4 py-2 border-[1.5px] border-azul rounded-md focus:outline-none focus:ring-1 focus:ring-azul disabled:bg-gray-200 disabled:text-gray-100 disabled:cursor-not-allowed"
                {...rest}
            >
                {inputType === "select" ? (
                    <>
                        <option disabled value="">
                            Selecione seu estado
                        </option>
                        <option value="Acre">Acre</option>
                        <option value="Alagoas">Alagoas</option>
                        <option value="Amapá">Amapá</option>
                        <option value="Amazonas">Amazonas</option>
                        <option value="Bahia">Bahia</option>
                        <option value="Ceará">Ceará</option>
                        <option value="Distrito Federal">
                            Distrito Federal
                        </option>
                        <option value="Espírito Santo">Espírito Santo</option>
                        <option value="Goiás">Goiás</option>
                        <option value="Maranhão">Maranhão</option>
                        <option value="Mato Grosso">Mato Grosso</option>
                        <option value="Mato Grosso do Sul">
                            Mato Grosso do Sul
                        </option>
                        <option value="Minas Gerais">Minas Gerais</option>
                        <option value="Pará">Pará</option>
                        <option value="Paraíba">Paraíba</option>
                        <option value="Paraná">Paraná</option>
                        <option value="Pernambuco">Pernambuco</option>
                        <option value="Piauí">Piauí</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Rio Grande do Norte">
                            Rio Grande do Norte
                        </option>
                        <option value="Rio Grande do Sul">
                            Rio Grande do Sul
                        </option>
                        <option value="Rondônia">Rondônia</option>
                        <option value="Roraima">Roraima</option>
                        <option value="Santa Catarina">Santa Catarina</option>
                        <option value="São Paulo">São Paulo</option>
                        <option value="Sergipe">Sergipe</option>
                        <option value="Tocantins">Tocantins</option>
                    </>
                ) : null}
            </Field>
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm mt-1"
            />
        </div>
    );
}
