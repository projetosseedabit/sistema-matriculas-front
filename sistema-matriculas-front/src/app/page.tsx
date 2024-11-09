import { CardStudentType } from "@/components/card-student-type/CardStudentType";
import Header from "../components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">{children}</main>
    </>
  );
}
