import requests
import json

try:
    # Try to get posts. The endpoint is likely /api/blog/posts/
    # We might need to login first if it's protected, but let's try public access first or simulate a user.
    # Wait, the ListView might be PermissionAllowAny? Let's check views.py
    
    response = requests.get('http://127.0.0.1:8000/api/blog/posts/')
    
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("API Response Sample (First Post):")
        if data and isinstance(data, list) and len(data) > 0:
            print(json.dumps(data[0], indent=2))
        else:
            print("No posts found or data is not a list.")
            print(data)
    else:
        print(f"Error: {response.text}")

except Exception as e:
    print(f"Exception: {e}")
