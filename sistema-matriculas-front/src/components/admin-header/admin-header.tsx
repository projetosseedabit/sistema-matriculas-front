import Logo from "../../../public/logoAzul.jpg";
import Image from 'next/image';
import { Button } from "../Button";

export default function AdminHeader() {
    return (
        <>

            <div className="flex flex-col bg-sky-950 gap-16 px-8 py-8">
                <header className="flex flex-col items-center">
                    <Image src={Logo} alt={"Logo Azul - Isolada de Redação VK"} className="w-[100px] h-[100px] rounded-full my-4" />
                    <h1 className="text-white font-bold text-lg font-montserrat ">Vanilma Karla B. de Freitas</h1>
                    <h2 className="text-white font-light text-base font-montserrat">Administrador</h2>
                </header>
                <section className="flex flex-col gap-8">
                    <Button color={"bg-amber-500"} label={"Inicio"}></Button>
                    <Button color={"bg-amber-500"} label={"Criar Turmas"}></Button>
                    <Button color={"bg-amber-500"} label={"Editar Turmas"}></Button>
                    <Button color={"bg-amber-500"} label={"Excluir Turmas"}></Button>
                    <Button color={"bg-amber-500"} label={"Gerar Relatório"}></Button>
                </section>
            </div>


        </>
    );
}