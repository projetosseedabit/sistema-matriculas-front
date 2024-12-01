'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LoginPage: React.FC = () => {
    const router = useRouter(); 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Requisição ao backend
            const response = await fetch("https://king-prawn-app-3bepj.ondigitalocean.app/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Credenciais inválidas ou erro no servidor");
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);

            router.push("/teste");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };  
      
    return (
        <div className="flex h-screen">

            <div className="w-1/2 bg-cover flex items-center justify-center">
               <Image src='/imagemAluno.png' alt="Imagem de um aluno do curso" className="w-432 h-720" width={692} height={1325} />
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Bem-vindo</h1>
                <form onSubmit={handleLogin} className="w-3/4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="block w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="block w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <button
                        type="submit"
                        className="bg-laranja hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;