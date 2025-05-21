from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
from database import insert_log

app = FastAPI()

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
