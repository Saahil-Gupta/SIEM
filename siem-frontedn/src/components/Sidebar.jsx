import React from "react";
import { FiHome, FiFileText, FiAlertTriangle } from "react-icons/fi";

export function Sidebar() {
        return (
            <aside className="w-64 bg-gradient-to-b from-red-900 to-red-700 text-white p-4 space-y-6">
            <h2 className="text-xl font-semibold">SIEM</h2>
            <nav className="space-y-2">
                <a href="#" className="flex items-center gap-2 text-sm hover:text-green-400">
                <FiHome className="text-lg" /> Dashboard
                </a>
                <a href="#" className="flex items-center gap-2 text-sm hover:text-green-400">
                <FiFileText className="text-lg" /> Logs
                </a>
                <a href="#" className="flex items-center gap-2 text-sm hover:text-green-400">
                <FiAlertTriangle className="text-lg" /> Alerts
                </a>
            </nav>
            </aside>
        );
}