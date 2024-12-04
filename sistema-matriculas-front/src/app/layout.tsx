import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Matrículas VK",
    description: "Matrículas da Isolada de Redação Vanilma Karla",
};

const montserrat = Montserrat({
    preload: true,
    subsets: ["latin-ext"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br" className={`${montserrat.className}`}>
            <body>{children}</body>
        </html>
    );
}
