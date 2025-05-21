import psycopg2
from psycopg2.extras import RealDictCursor

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
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO logs (source, message, timestamp)
        VALUES (%s, %s, %s)
    """, (source, message, timestamp))
    conn.commit()
    cursor.close()
    conn.close()
