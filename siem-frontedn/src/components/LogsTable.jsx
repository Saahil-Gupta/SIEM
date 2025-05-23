import React, { useEffect, useState } from "react";
import axios from "axios";

export function LogsTable() {
    const [logs, setLogs] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/logs")
        .then(res => setLogs(res.data.logs))
        .catch(err => console.error("Failed to fetch logs", err));
    }, []);

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(filter.toLowerCase()) ||
        log.source.toLowerCase().includes(filter.toLowerCase())
    );

    const exportToCSV = () => {
        const headers = ["Source", "Message", "Timestamp"];
        const rows = filteredLogs.map(log => [
        log.source,
        log.message,
        new Date(log.timestamp).toLocaleString()
        ]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "logs.csv");
        link.click();
    };

    return (
        <div className="bg-black rounded shadow p-4">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-green-400">Recent Logs</h2>
            <button onClick={exportToCSV} className="text-sm bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600">Export CSV</button>
        </div>

        <input
            type="text"
            placeholder="Search logs..."
            className="mb-4 px-3 py-2 border rounded w-full text-black"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        <table className="w-full text-sm text-white">
            <thead className="bg-red-800">
            <tr>
                <th className="text-left px-2 py-1">Source</th>
                <th className="text-left px-2 py-1">Message</th>
                <th className="text-left px-2 py-1">Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {filteredLogs.length > 0 ? filteredLogs.map(log => {
                const isSSH = log.source === "ssh";
                const isApache = log.source === "apache";

                const rowClass = isSSH ? "bg-red-900" : isApache ? "bg-green-900" : "";

                return (
                <tr key={log.id} className={`border-b ${rowClass}`}>
                    <td className="px-2 py-1 font-medium">{log.source}</td>
                    <td className="px-2 py-1">{log.message}</td>
                    <td className="px-2 py-1">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
                );
            }) : (
                <tr>
                <td className="px-2 py-2" colSpan="3">No logs found.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
}