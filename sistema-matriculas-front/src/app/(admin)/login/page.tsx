"use client";

import React, { Suspense, useState } from "react";
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
        <div className="flex h-screen items-center">
            <Image
                src="/imagemAluno.jpg"
                alt="Imagem de um aluno do curso"
                className="w-[27rem] h-full object-cover"
                width={692}
                height={1325}
            />
            <div className="flex items-center justify-center flex-1">
                <form
                    onSubmit={handleLogin}
                    className="px-8 py-10 flex flex-col items-center bg-branco border-2 border-azul rounded-lg gap-8 justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        fill="none"
                        viewBox="0 0 80 80"
                    >
                        <path
                            fill="#000"
                            d="M40 8a32.1 32.1 0 0 0-17.501 5.233 32.04 32.04 0 0 0-11.8 13.935 32.01 32.01 0 0 0 5.736 34.52A32.06 32.06 0 0 0 40 72a32.08 32.08 0 0 0 23.565-10.312 32.008 32.008 0 0 0 5.736-34.52 32.04 32.04 0 0 0-11.8-13.935A32.1 32.1 0 0 0 40 8m0 57.66a25.66 25.66 0 0 1-17.794-7.208 19.22 19.22 0 0 1 7.083-8.662 19.25 19.25 0 0 1 21.422 0 19.22 19.22 0 0 1 7.083 8.662A25.66 25.66 0 0 1 40 65.66m-6.412-32.033a6.4 6.4 0 0 1 3.958-5.92 6.42 6.42 0 0 1 6.988 1.39A6.406 6.406 0 0 1 40 40.032c-1.7 0-3.332-.675-4.534-1.876a6.4 6.4 0 0 1-1.878-4.53m28.566 19.22a25.64 25.64 0 0 0-12.536-10.828 12.808 12.808 0 0 0-2.661-19.239 12.832 12.832 0 0 0-18.646 5.492 12.8 12.8 0 0 0 2.07 13.747 25.64 25.64 0 0 0-12.535 10.827 25.35 25.35 0 0 1-3.495-12.813 25.62 25.62 0 0 1 7.513-18.12A25.66 25.66 0 0 1 40 14.406a25.66 25.66 0 0 1 18.136 7.505 25.62 25.62 0 0 1 7.513 18.121 25.35 25.35 0 0 1-3.495 12.813"
                        ></path>
                    </svg>
                    <div className="w-[26rem] space-y-4">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                                className="font-sans font-bold text-base text-azul"
                            >
                                E-mail
                            </label>
                            <input
                                // type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                className="bg-transparent border-b-2 border-azul outline-none py-2 text-sm placeholder:text-azul/60 text-azul font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className="font-sans font-bold text-base text-azul"
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Digite sua senha"
                                className="bg-transparent border-b-2 border-azul outline-none py-2 text-sm placeholder:text-azul/60 text-azul font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="text-red-500 mb-4">{error}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-laranja hover:bg-[#E38714] text-white py-2 px-4 rounded w-full flex items-center justify-center"
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

export default function Page() {
    return (
        <Suspense>
            <LoginPage />
        </Suspense>
    );
}
