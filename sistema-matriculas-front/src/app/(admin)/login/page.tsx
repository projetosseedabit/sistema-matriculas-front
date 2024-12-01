"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "https://king-prawn-app-3bepj.ondigitalocean.app/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userName: email,
                        userPassword: password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Credenciais inválidas ou erro no servidor");
            }

            const data = await response.json();
            const token = data.data.token;

            document.cookie = `token=${token}; max-age=3600; secure`;

            if (redirectTo) {
                router.push(`/admin${redirectTo}`);
            } else {
                router.push("/admin");
            }
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Erro desconhecido"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-cover flex items-center justify-center">
                <Image
                    src="/imagemAluno.jpg"
                    alt="Imagem de um aluno do curso"
                    className="w-432 h-720"
                    width={692}
                    height={1325}
                />
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Bem-vindo</h1>
                <form onSubmit={handleLogin} className="w-3/4">
                    <input
                        // type="email"
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
                        className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="opacity-25"
                                ></circle>
                                <path
                                    fill="currentColor"
                                    d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z"
                                    className="opacity-75"
                                ></path>
                            </svg>
                        ) : (
                            "Entrar"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
