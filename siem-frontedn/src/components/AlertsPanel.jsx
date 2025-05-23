import React, { useEffect, useState } from "react";
import axios from "axios";

export function AlertsPanel() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/alerts")
        .then(res => setAlerts(res.data.alerts))
        .catch(err => console.error("Failed to fetch alerts", err));
    }, []);

    return (
        <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Alerts</h2>
        {alerts.length > 0 ? (
            <ul className="space-y-2">
            {alerts.map(alert => (
                <li key={alert.id} className="border-b py-2">
                <div className="font-medium text-danger">{alert.type}</div>
                <div className="text-sm text-muted">{alert.description}</div>
                <div className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</div>
                </li>
            ))}
            </ul>
        ) : (
            <div className="text-sm text-muted">No alerts found.</div>
        )}
        </div>
    );
}