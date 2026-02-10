import React from "react"
import { DashboardNavbar } from "./components/DashboardNavbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardNavbar />
            <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
                {children}
            </main>
        </div>
    );
}
