import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { name: "Início", route: "/admin" },
        { name: "Criar turma", route: "/admin/criar-turma" },
        { name: "Visualizar turmas", route: "/admin/turmas" },
    ];

    const handleFetch = async () => {
      try {
          const response = await fetch("https://king-prawn-app-3bepj.ondigitalocean.app/report");
          if (!response.ok) {
              throw new Error(`Erro na requisição: ${response.status}`);
          }
      } catch (error) {
          console.error("Erro ao fazer fetch:", error);
      }
  };

    return (
        <aside className="flex-shrink-0 sticky top-0 left-0 bg-blue-900 text-white py-16 px-10 flex flex-col justify-between h-screen">
            <div className="w-64">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        className="w-24 h-24 mb-4"
                        width={96}
                        height={96}
                    />
                    <h1 className="text-lg font-bold text-center mb-1">
                        Vanilma Karla B. de Freitas
                    </h1>
                    <p className="text-sm text-center font-medium">
                        Administradora
                    </p>
                </div>

                <nav>
                    <ul className="space-y-4">
                        {menuItems.map((item) => (
                            <li key={item.route}>
                                <button
                                    onClick={() => router.push(item.route)}
                                    className={`w-full text-center border-2 rounded px-4 py-2 font-medium ${
                                        pathname === item.route
                                            ? "bg-laranja text-azul border-laranja"
                                            : "bg-transparent text-white border-laranja hover:bg-laranja hover:text-azul"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))} 
                            <li key={"btnReport"}>
                                <button
                                    onClick={handleFetch}
                                    className={`w-full text-center border-2 rounded px-4 py-2 font-medium bg-transparent text-white border-laranja hover:bg-laranja hover:text-azul`}
                                >
                                    Gerar relatório
                                  </button>
                            </li> 
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
