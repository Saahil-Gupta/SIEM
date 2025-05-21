# Here instead of just storing raw messages, we will start storing 
# structured information like IP addresses, event types, URL, status codes and the such

import re

def parse_log(source: str, message: str) -> dict:
    """
    Extract structured info from raw log messages based on source.
    """
    if source == "ssh":
        match = re.search(r"Failed login from ([\d\.]+)", message)
        if match:
            return {
                "event": "failed_login",
                "ip": match.group(1)
            }

    elif source == "apache":
        match = re.search(r"(\d{3}) error at (.+)", message)
        if match:
            return {
                "event": "http_error",
                "status_code": int(match.group(1)),
                "path": match.group(2)
            }

    return {}
