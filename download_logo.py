import urllib.request
import os

url = "https://myschool.ng/storage/images/schools/university-of-ibadan-ui-logo.png"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    image_data = response.read()

with open('public/ui_logo_real.png', 'wb') as f:
    f.write(image_data)

print("Downloaded real logo successfully!")
