import React from "react";

interface FormField {
  label: string;
  name: string;
  type: "text" | "email" | "number";
  placeholder: string;
  value: string;
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = React.useState<Record<string, string>>(
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {})
  );

  function handleChange({ name, value }: { name: string; value: string }): void {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              {field.label}
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
              className="border-b-2 border-sky-950 focus:border-sky-950 focus:outline-none focus:ring-0 text-sky-950 placeholder-[#888] px-1 py-1 transition-all duration-200"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-sky-950 text-white px-6 py-2 rounded-md hover:bg-sky-800 transition-all duration-200"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Form;
