import React, { useEffect, useState } from "react";
import axios from "axios";

export function SummaryStats() {
    const [logCount, setLogCount] = useState(0);
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/logs")
        .then(res => setLogCount(res.data.logs.length))
        .catch(() => setLogCount(0));

        axios.get("http://localhost:8000/alerts")
        .then(res => setAlertCount(res.data.alerts.length))
        .catch(() => setAlertCount(0));
    }, []);

    return (
        <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-900 text-white p-4 rounded shadow">
            <div className="text-sm">Total Logs</div>
            <div className="text-2xl font-bold">{logCount}</div>
        </div>
        <div className="bg-red-900 text-white p-4 rounded shadow">
            <div className="text-sm">Total Alerts</div>
            <div className="text-2xl font-bold">{alertCount}</div>
        </div>
        </div>
    );
}