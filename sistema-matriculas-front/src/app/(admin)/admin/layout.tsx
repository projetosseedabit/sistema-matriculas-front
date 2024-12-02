"use client";

import Sidebar from "@/components/SidebarAdmin";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen flex-1">{children}</div>
        </div>
    );
}
