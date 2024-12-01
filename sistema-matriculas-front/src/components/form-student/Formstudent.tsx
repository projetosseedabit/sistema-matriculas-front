import React, { useState, useCallback } from "react";

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "number";
  placeholder: string;
  value: string;
  required?: boolean;
  validate?: (value: string) => boolean | null; // Função de validação que retorna boolean
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {})
  );

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string }): void => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Aplica validação ao campo durante a digitação
      const field = fields.find((f) => f.name === name);
      if (field?.validate) {
        const isValid = field.validate(value);
        setErrors((prev) => ({
          ...prev,
          [name]: !isValid, // Define true se inválido
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: false, // Nenhum erro
        }));
      }
    },
    [fields]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = true;
      } else if (field.validate) {
        newErrors[field.name] = !field.validate(formData[field.name]);
      }
    });

    setErrors(newErrors);

    // Verifica se há erros
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      // Foca no primeiro campo com erro
      const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key]);
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-sky-950 border-2 rounded-md px-8 py-5 mx-4 sm:mx-8 lg:mx-60 bg-[#FAFAFA] space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <label
              htmlFor={field.name}
              className="text-xl font-normal text-sky-950 mb-1"
            >
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={(e) =>
                handleChange({ name: field.name, value: e.target.value })
              }
              required={field.required}
              className={`border-b-2 px-1 py-1 placeholder-[#888] text-sky-950 transition-all duration-200 ${
                errors[field.name] ? "border-red-500" : "border-sky-950"
              }`}
            />
            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">
                {field.label} está inválido.
              </span>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default Form;
