import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { LogsTable } from "./components/LogsTable";
import { AlertsPanel } from "./components/AlertsPanel";

export default function App() {
    return (
        <div className="flex h-screen bg-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 overflow-auto space-y-6">
            <h1 className="text-2xl font-bold text-green-400">SIEM Dashboard</h1>
            <LogsTable />
            <AlertsPanel />
            </main>
        </div>
        </div>
    );
}