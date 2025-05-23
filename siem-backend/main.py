from fastapi import FastAPI, Query
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from database import insert_log
from database import get_logs, get_alerts
from alert_engine import detect_alerts
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = BackgroundScheduler()
    scheduler.add_job(detect_alerts, "interval", minutes=5)
    scheduler.start()
    print("🔄 Alert detection job scheduled every 5 minutes.")
    try:
        yield
    finally:
        scheduler.shutdown()
        print("🛑 Scheduler shut down.")

app = FastAPI(lifespan=lifespan)


# CORS fix
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RawLog(BaseModel):
    source: str
    message: str
    timestamp: datetime

@app.get("/")
def health():
    return {"status": "SIEM API running"}


@app.post("/logs")
async def receive_log(log: RawLog):
    insert_log(log.source, log.message, log.timestamp)
    return {"status": "stored", "log": log}

@app.get("/logs")
def fetch_logs(
    source: Optional[str] = Query(None),
    ip: Optional[str] = Query(None),
    start_time: Optional[datetime] = Query(None),
    end_time: Optional[datetime] = Query(None)
):
    logs = get_logs(source, ip, start_time, end_time)
    return {"count": len(logs), "logs": logs}

@app.get("/alerts")
def fetch_alerts(
    alert_type: Optional[str] = Query(None),
    start_time: Optional[datetime] = Query(None),
    end_time: Optional[datetime] = Query(None)
):
    alerts = get_alerts(alert_type, start_time, end_time)
    return {"count": len(alerts), "alerts": alerts}

# Start background job scheduler on app startup



# uvicorn main:app --reload