import React, { useEffect, useState } from "react";
import axios from "axios";

export function AlertsPanel() {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/alerts")
        .then(res => setAlerts(res.data.alerts))
        .catch(err => console.error("Failed to fetch alerts", err));
    }, []);

    const filteredAlerts = alerts.filter(alert =>
        alert.type.toLowerCase().includes(filter.toLowerCase()) ||
        alert.description.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-black rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2 text-green-400">Recent Alerts</h2>

        <input
            type="text"
            placeholder="Filter alerts by type or description..."
            className="mb-4 px-3 py-2 border rounded w-full text-black"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        {filteredAlerts.length > 0 ? (
            <ul className="space-y-2 text-white">
            {filteredAlerts.map(alert => (
                <li key={alert.id} className="border-b py-2">
                <div className="font-medium text-red-500">{alert.type}</div>
                <div className="text-sm text-green-400">{alert.description}</div>
                <div className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</div>
                </li>
            ))}
            </ul>
        ) : (
            <div className="text-sm text-green-400">No alerts found.</div>
        )}
        </div>
    );
}