import psycopg2
from psycopg2.extras import RealDictCursor
import json
from datetime import datetime

# Change these for your setup
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "siem"
DB_USER = "postgres"
DB_PASSWORD = "Saahil2005@"

def get_connection():
    return psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )


def get_logs(source=None, ip=None, start_time=None, end_time=None):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    # Base query
    query = "SELECT * FROM logs WHERE TRUE"
    params = []

    if source:
        query += " AND source = %s"
        params.append(source)

    if ip:
        query += " AND parsed_fields->>'ip' = %s"
        params.append(ip)

    if start_time:
        query += " AND timestamp >= %s"
        params.append(start_time)

    if end_time:
        query += " AND timestamp <= %s"
        params.append(end_time)

    query += " ORDER BY timestamp DESC LIMIT 100"

    cursor.execute(query, params)
    logs = cursor.fetchall()
    cursor.close()
    conn.close()
    return logs

def insert_log(source, message, timestamp):
    from log_parser import parse_log  # import locally to avoid circular import
    parsed = parse_log(source, message)

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO logs (source, message, timestamp, parsed_fields)
            VALUES (%s, %s, %s, %s)
        """, (source, message, timestamp, json.dumps(parsed)))
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        print("Error inserting log:", e)


def get_alerts(alert_type=None, start_time=None, end_time=None):
    conn = get_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    query = "SELECT * FROM alerts WHERE TRUE"
    params = []

    if alert_type:
        query += " AND type = %s"
        params.append(alert_type)

    if start_time:
        query += " AND timestamp >= %s"
        params.append(start_time)

    if end_time:
        query += " AND timestamp <= %s"
        params.append(end_time)

    query += " ORDER BY timestamp DESC LIMIT 100"

    cursor.execute(query, params)
    alerts = cursor.fetchall()
    cursor.close()
    conn.close()
    return alerts
