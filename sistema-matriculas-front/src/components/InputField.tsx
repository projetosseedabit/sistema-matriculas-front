type InputFieldProps = {
    label: string;
    labelObs?: string;
    required?: boolean;
    name: string;
    type: string;
    placeholder: string;
    colSpan?: number;
    error?: string;
    touched?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({
    label,
    labelObs,
    required,
    name,
    type,
    placeholder,
    colSpan,
    error,
    touched,
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
            <input
                required={required}
                type={type}
                name={name}
                placeholder={placeholder}
                id={name}
                data-error={error !== "" && error !== undefined && touched}
                className="w-full px-4 py-2 border-[1.5px] border-azul rounded-md focus:outline-none focus:ring-1 focus:ring-azul disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-not-allowed data-[error=true]:border-vermelho"
                {...rest}
            />
            {error !== "" && touched ? (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            ) : null}
        </div>
    );
}
