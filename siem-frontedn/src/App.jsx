import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

export default function App() {
    return (
        <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 overflow-auto">
            <h1 className="text-2xl font-bold mb-4">SIEM Dashboard</h1>
            {/* We’ll render logs, alerts, and stats here */}
            </main>
        </div>
        </div>
    );
}