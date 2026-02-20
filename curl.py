import requests

url = "http://localhost:1234/auth/reset-password"
# data = {"email":"lenam.pham@student.uts.edu.au"}
# data = {"token": "9a6798520437bc6fa067d517c3b7b46e332416281fe150dab31b3a68511506c1"}
data = {"password":"NewPassword","confirmPassword":"NewPassword","token": "9a6798520437bc6fa067d517c3b7b46e332416281fe150dab31b3a68511506c1"}

response = requests.put(url, json=data)
print(response.json())