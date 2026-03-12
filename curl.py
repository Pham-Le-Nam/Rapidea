import requests
from datetime import datetime

url = "http://localhost:1234/api/social-link/add"

jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTYwMmUzNC00MzQ3LTQwNGYtOWQ4My0yMWE4NmVlZjYyNjIiLCJlbWFpbCI6InBoYW1sZW5hbTk3QGdtYWlsLmNvbSIsInNlc3Npb25WZXJzaW9uIjo1LCJpYXQiOjE3NzMyODE0NDMsImV4cCI6MTc3MzM2Nzg0M30.ds3F5OlHMpSAbrfmeVODUSI3SnoYph6x2LziveScW7Q"
startedAt = datetime(2025,11,10)
endedAt = datetime(2026,2,13)

# Login body
data = {
    "email":"lenam.pham@student.uts.edu.au",
    "password":"Password",
    "platform": "WEBSITE",
    "url": "https://github.com/Pham-Le-Nam/iOS-programming",
    # "id": "a05b69ad-d93a-491e-9501-a206411d02b2",
    "name": "Optik Consultancy",
    "role": "Software Engineer",
    "startedAt": startedAt.isoformat(),
    "endedAt": endedAt.isoformat(),
    "details": "This is a educational social media website where users could upload lectures about anything and learners come to learn from the lectures.",
    "projectId": "9c1b2afa-484d-4d0f-804c-b5992e070836",
    "major": "Bachelor of Engineering (Honour) - Software Engineering",
    "degree": "Bachelor of Engineering (Honour)",
    "location": "32-34 Lord St, Botany, Sydney, Australia",
    "achievement": "Developed AI chatbot with RAG pipeline",
    "position": "Intern"
}

headers = {
    "Authorization": f"Bearer {jwt_token}",
}

response = requests.post(url, json=data, headers=headers)
print(response.json())