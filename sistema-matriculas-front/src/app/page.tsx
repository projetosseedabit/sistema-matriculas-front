import PurchaseConfirmation from "@/components/purchaseConfirmation/PurchaseConfirmation";
import Header from "../components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <PurchaseConfirmation />
      </main>
    </>
  );
}

