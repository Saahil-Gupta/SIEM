from fastapi import FastAPI, Query
from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from database import insert_log
from database import get_logs


app = FastAPI()

class RawLog(BaseModel):
    source: str
    message: str
    timestamp: datetime

@app.get("/")
def health():
    return {"status": "SIEM API running"}

@app.get("/logs")
def fetch_logs(
    source: Optional[str] = Query(None),
    ip: Optional[str] = Query(None),
    start_time: Optional[datetime] = Query(None),
    end_time: Optional[datetime] = Query(None)
):
    logs = get_logs(source, ip, start_time, end_time)
    return {"count": len(logs), "logs": logs}
