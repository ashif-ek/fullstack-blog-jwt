import requests
import json

try:
    response = requests.get('http://127.0.0.1:8000/api/blog/posts/')
    if response.status_code == 200:
        data = response.json()
        print(f"Total Posts: {len(data)}")
        for post in data:
            print(f"Post ID: {post['id']}")
            print(f"Title: {post['title']}")
            print(f"Image Field: '{post.get('image')}'")
            print("-" * 20)
    else:
        print(f"Error: {response.text}")

except Exception as e:
    print(f"Exception: {e}")
