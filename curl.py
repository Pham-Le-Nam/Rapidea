import requests
from datetime import datetime

# url = "http://localhost:8000/api/auth/login"
url = "http://localhost:8000/api/ai/study-space/efe6458f-a208-40b6-af34-40127948fb79/chat"

jwt_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZWMwZWJkZS05NWI4LTRiMDgtYjdiMi00MjVlMTI3M2YxZjAiLCJlbWFpbCI6ImxlbmFtLnBoYW1Ac3R1ZGVudC51dHMuZWR1LmF1Iiwic2Vzc2lvblZlcnNpb24iOjMsImlhdCI6MTc3NzcwNzIwM30.Y5u5rlqwlmaL5dq1o8xdtoVIGLMDeq6h3Jp-N7yxH04"
startedAt = datetime(2022,8,28)
endedAt = datetime(2024,12,28)

# Login body
data = {
    # "email":"lenam.pham@student.uts.edu.au",
    # "password":"Password",
    # "platform": "WEBSITE",
    # "url": "https://www.facebook.com/pham.lenam.5",
    # "id": "f8d07690-2392-4155-b89b-28660c4bf6dc",
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
    # "postId": "430dc6ce-a857-4292-bacc-df3dfc5ca53a", 
    # "studySpaceId": "efe6458f-a208-40b6-af34-40127948fb79",
    # "spaceId": "efe6458f-a208-40b6-af34-40127948fb79",
    # "content": {},
    # "fullname": "Nam Pham",
    # "rating": 3.5,
    # "discussion": {"type": "doc", "content": [{"type": "paragraph", "content": [{"text": "This post have a lot of files. Yes! A lot of files", "type": "text"}]}]},
    # "repliedId": "a413b2b1-4089-4f61-8294-cb1e288d2571",
    "prompt": "How should I improve the UI?"
}

params = {
    "postId": "430dc6ce-a857-4292-bacc-df3dfc5ca53a",
    "raterId": "2de26b6e-8ffe-48f6-afbf-337c88bbfe55",
    "startIndex": 0,
    "amount": 5,
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

response = requests.post(url, json=data, headers=headers, params=params)
# response = requests.post(url, json=data, headers=headers, files=files)
print(response.json())