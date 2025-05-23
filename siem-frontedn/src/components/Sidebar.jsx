import React from "react";

export function Sidebar() {
    return (
        <aside className="w-64 bg-primary text-white p-4 space-y-6">
        <h2 className="text-xl font-semibold">SIEM</h2>
        <nav className="space-y-2">
            <a href="#" className="block text-sm hover:text-accent">Dashboard</a>
            <a href="#" className="block text-sm hover:text-accent">Logs</a>
            <a href="#" className="block text-sm hover:text-accent">Alerts</a>
        </nav>
        </aside>
    );
}