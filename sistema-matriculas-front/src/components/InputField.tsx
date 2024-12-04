import { ErrorMessage, Field } from "formik";

export function InputField({
    label,
    labelObs,
    required,
    name,
    type,
    placeholder,
}: {
    label: string;
    labelObs?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder: string;
}) {
    return (
        <div>
            <label className="text-gray-700 font-medium mb-1" htmlFor={name}>
                {label}
                {labelObs ? (
                    <span className="text-sm"> {labelObs}</span>
                ) : null}{" "}
                {required ? <span className="text-red-500">*</span> : null}
            </label>
            <Field
                required={required}
                type={type}
                name={name}
                placeholder={placeholder}
                id={name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-sm mt-1"
            />
        </div>
    );
}
