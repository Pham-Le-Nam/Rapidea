import requests
from datetime import datetime

# url = "http://localhost:1234/api/auth/login"
url = "http://localhost:1234/api/file-in-post/add"

jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTYwMmUzNC00MzQ3LTQwNGYtOWQ4My0yMWE4NmVlZjYyNjIiLCJlbWFpbCI6InBoYW1sZW5hbTk3QGdtYWlsLmNvbSIsInNlc3Npb25WZXJzaW9uIjoyNSwiaWF0IjoxNzc1MTg2MzM0LCJleHAiOjE3NzUyNzI3MzR9.hRceumpcHp9mrylHCvbKplBz4OrpGwpng0krbz8qeAQ"
startedAt = datetime(2022,8,28)
endedAt = datetime(2024,12,28)

# Login body
data = {
    # "email":"phamlenam97@gmail.com",
    # "password":"Password",
    # "platform": "WEBSITE",
    # "url": "https://www.facebook.com/pham.lenam.5",
    # "id": "0f85f6ed-5b87-47e4-9746-fc95c1e4efe5",
    # "name": "Facebook",
    # "role": "Software Engineer",
    # "startedAt": "2022-08-28",
    # "endedAt": "2024-12-28",
    # "details": "This is a educational social media website where users could upload lectures about anything and learners come to learn from the lectures.",
    # "projectId": "9c1b2afa-484d-4d0f-804c-b5992e070836",
    # "major": "Computer Science",
    # "degree": "Bachelor",
    # "location": "268 Lý Thường Kiệt, Diên Hồng District, Ho Chi Minh City, Vietnam",
    # "achievement": "Top 32 OISP Presentation Contest. Average GPA: 3.6. Implemented shortest-path program in Neo4j.",
    # "position": "Intern",
    # "projectId": "9c1b2afa-484d-4d0f-804c-b5992e070836"
    # "title": "title",
    "fileId": "18f2e216-0057-47cb-8196-5d3d0c5c799e",
    "postId": "65d00122-4965-4013-95fa-f682b44ef89f", 
}

headers = {
    "Authorization": f"Bearer {jwt_token}",
}

response = requests.post(url, json=data, headers=headers)
print(response.json())