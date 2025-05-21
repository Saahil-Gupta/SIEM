import psycopg2
from psycopg2.extras import RealDictCursor
import json

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
