import urllib.request
import os

url = "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/University_of_Ibadan_logo.svg/512px-University_of_Ibadan_logo.svg.png"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    image_data = response.read()

os.makedirs('public', exist_ok=True)
with open('public/ui_logo_real.png', 'wb') as f:
    f.write(image_data)

print("Downloaded real logo successfully!")
