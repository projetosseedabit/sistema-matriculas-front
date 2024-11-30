import React, { useState } from 'react';

const CreateClass:React.FC = () => {
  const [formData, setFormData] = useState({
    dia: '',
    modalidade: '',
    horarioInicio: '',
    horarioFim: '',
    valorMatricula: '',
    valorMensalidade: '',
    quantidadeAlunos: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex">

      {/*Formulário*/}
      <div className="w-4/5 p-8">
        <h1 className="text-2xl font-bold mb-4">Criar turma</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label htmlFor="dia" className="block text-sm font-medium">Selecione o dia da turma</label>
            <select
              id="dia"
              name="dia"
              value={formData.dia}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Dia da turma</option>
              <option value="segunda">Segunda-feira</option>
              <option value="terca">Terça-feira</option>
              <option value="quarta">Quarta-feira</option>
              <option value="quinta">Quinta-feira</option>
              <option value="sexta">Sexta-feira</option>
            </select>
          </div>

          <div>
            <label htmlFor="modalidade" className="block text-sm font-medium">Selecione a modalidade</label>
            <select
              id="modalidade"
              name="modalidade"
              value={formData.modalidade}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Modalidade da turma</option>
              <option value="presencial">Presencial</option>
              <option value="online">Online</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="horarioInicio" className="block text-sm font-medium">Horário de início</label>
              <input
                type="time"
                id="horarioInicio"
                name="horarioInicio"
                value={formData.horarioInicio}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="horarioFim" className="block text-sm font-medium">Horário de término</label>
              <input
                type="time"
                id="horarioFim"
                name="horarioFim"
                value={formData.horarioFim}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="valorMatricula" className="block text-sm font-medium">Valor da matrícula</label>
              <input
                type="number"
                id="valorMatricula"
                name="valorMatricula"
                value={formData.valorMatricula}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="R$ 000,00"
              />
            </div>
            <div>
              <label htmlFor="valorMensalidade" className="block text-sm font-medium">Valor da mensalidade</label>
              <input
                type="number"
                id="valorMensalidade"
                name="valorMensalidade"
                value={formData.valorMensalidade}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="R$ 000,00"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quantidadeAlunos" className="block text-sm font-medium">Quantidade de alunos</label>
            <input
              type="number"
              id="quantidadeAlunos"
              name="quantidadeAlunos"
              value={formData.quantidadeAlunos}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Digite"
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded w-full"
          >
            Criar turma
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
