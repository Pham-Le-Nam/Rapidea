import requests
from datetime import datetime

url = "http://localhost:1234/api/auth/login"
# url = "http://localhost:1234/api/education/update"

jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZGUyNmI2ZS04ZmZlLTQ4ZjYtYWZiZi0zMzdjODhiYmZlNTUiLCJlbWFpbCI6ImxlbmFtLnBoYW1Ac3R1ZGVudC51dHMuZWR1LmF1Iiwic2Vzc2lvblZlcnNpb24iOjEyLCJpYXQiOjE3NzM2MTE2NDYsImV4cCI6MTc3MzY5ODA0Nn0.zNeNxT8FiM-VLNKUjxARbdT-uGsktm5X0lDJgzgSPAM"
startedAt = datetime(2022,8,28)
endedAt = datetime(2024,12,28)

# Login body
data = {
    "email":"lenam.pham@student.uts.edu.au",
    "password":"Password",
    # "platform": "WEBSITE",
    # "url": "https://www.facebook.com/pham.lenam.5",
    "id": "0f85f6ed-5b87-47e4-9746-fc95c1e4efe5",
    "name": "Facebook",
    # "role": "Software Engineer",
    "startedAt": "2022-08-28",
    "endedAt": "2024-12-28",
    # "details": "This is a educational social media website where users could upload lectures about anything and learners come to learn from the lectures.",
    # "projectId": "9c1b2afa-484d-4d0f-804c-b5992e070836",
    "major": "Computer Science",
    "degree": "Bachelor",
    "location": "268 Lý Thường Kiệt, Diên Hồng District, Ho Chi Minh City, Vietnam",
    "achievement": "Top 32 OISP Presentation Contest. Average GPA: 3.6. Implemented shortest-path program in Neo4j.",
    # "position": "Intern",
    # "projectId": "9c1b2afa-484d-4d0f-804c-b5992e070836"
}

headers = {
    "Authorization": f"Bearer {jwt_token}",
}

response = requests.post(url, json=data, headers=headers)
print(response.json())