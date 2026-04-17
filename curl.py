import requests
from datetime import datetime

# url = "http://localhost:8000/api/auth/login"
url = "http://localhost:8000/api/user/lenam.pham"

jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZWMwZWJkZS05NWI4LTRiMDgtYjdiMi00MjVlMTI3M2YxZjAiLCJlbWFpbCI6ImxlbmFtLnBoYW1Ac3R1ZGVudC51dHMuZWR1LmF1Iiwic2Vzc2lvblZlcnNpb24iOjIsImlhdCI6MTc3NjM5MzI5MCwiZXhwIjoxNzc2NDc5NjkwfQ.I4lasnHSCZz7MXx6WzyqgZvf3qPEJsf2xiYozH0xIgk"
startedAt = datetime(2022,8,28)
endedAt = datetime(2024,12,28)

# Login body
data = {
    # "email":"lenam.pham@student.uts.edu.au",
    # "password":"Password",
    # "platform": "WEBSITE",
    # "url": "https://www.facebook.com/pham.lenam.5",
    # "id": "8c24db94-58f9-456e-bee6-83d5202878a2",
    # "name": "Test Photo",
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
    # "title": "Test Note 123",
    # "fileId": "18f2e216-0057-47cb-8196-5d3d0c5c799e",
    # "postId": "65d00122-4965-4013-95fa-f682b44ef89f", 
    # "studySpaceId": "efe6458f-a208-40b6-af34-40127948fb79",
    # "spaceId": "efe6458f-a208-40b6-af34-40127948fb79",
    # "content": {},
    "fullname": "Nam Pham",
}

headers = {
    "Authorization": f"Bearer {jwt_token}",
}

# 1 File upload
files = {
    "image": ("post.png", open("post.png", "rb"), "image/png")
}
# Multiple files upload
# files = [
#     ("images", ("post.png", open("post.png", "rb"), "image/png")),
#     ("images", ("Profile Page.png", open("Profile Page.png", "rb"), "image/png")),
# ]

response = requests.post(url, data=data, headers=headers)
# response = requests.post(url, json=data, headers=headers, files=files)
print(response.json())