from database import get_connection
from datetime import datetime, timedelta
import json

# Creating human readabale alerts
def insert_alert(alert_type, description, metadata=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO alerts (type, description, metadata)
        VALUES (%s, %s, %s)
    """, (alert_type, description, json.dumps(metadata)))
    conn.commit()
    cursor.close()
    conn.close()

# Scanning for all known attack patterns
def detect_alerts():
    conn = get_connection()
    cursor = conn.cursor()

    # Looking for 5+ failed logins from the same IP in the last 10 mins
    cursor.execute("""
        SELECT parsed_fields->>'ip' AS ip, COUNT(*) as count
        FROM logs
        WHERE source = 'ssh'
          AND parsed_fields->>'event' = 'failed_login'
          AND timestamp >= %s
        GROUP BY ip
        HAVING COUNT(*) >= 5
    """, (datetime.utcnow() - timedelta(minutes=10),))

    suspicious_ips = cursor.fetchall()

    for ip_row in suspicious_ips:
        ip = ip_row[0]
        count = ip_row[1]
        description = f"{count} failed logins from IP {ip} in the last 10 minutes"
        insert_alert("brute_force_ssh", description, {"ip": ip, "count": count})

        # Look for 10+ HTTP 500 errors from the same path in the last 10 mins
    cursor.execute("""
        SELECT parsed_fields->>'path' AS path, COUNT(*) as count
        FROM logs
        WHERE source = 'apache'
          AND parsed_fields->>'event' = 'http_error'
          AND parsed_fields->>'status_code' = '500'
          AND timestamp >= %s
        GROUP BY path
        HAVING COUNT(*) >= 10
    """, (datetime.utcnow() - timedelta(minutes=10),))

    error_paths = cursor.fetchall()

    for path_row in error_paths:
        path = path_row[0]
        count = path_row[1]
        description = f"{count} HTTP 500 errors at path '{path}' in the last 10 minutes"
        insert_alert("server_error_spam", description, {"path": path, "count": count})
    
    cursor.close()
    conn.close()
