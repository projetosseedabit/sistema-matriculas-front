import { Button } from "./components/button/Button";
import Header from "./components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between max-w-screen-xl mx-auto px-4">
          <Button label="Voltar" color="bg-sky-950 hover:bg-sky-900"/>
          <Button label="Avançar" color="bg-yellow-500 hover:bg-yellow-400"/>
        </div>
        </div>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
