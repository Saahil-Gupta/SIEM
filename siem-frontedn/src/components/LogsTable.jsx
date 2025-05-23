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

    return (
        <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Logs</h2>

        <input
            type="text"
            placeholder="Search logs..."
            className="mb-4 px-3 py-2 border rounded w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        <table className="w-full text-sm">
            <thead className="bg-gray-200">
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

                const rowClass = isSSH ? "bg-red-50" : isApache ? "bg-yellow-50" : "";

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