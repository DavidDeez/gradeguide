import urllib.request
import base64
import re
import os

url = "https://myschool.ng/storage/images/schools/university-of-ibadan-ui-logo.png"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    image_data = response.read()

base64_str = base64.b64encode(image_data).decode('utf-8')
data_uri = f"data:image/png;base64,{base64_str}"

with open('Evaluate.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Replace the incorrect screenshot base64 with the REAL logo's base64
new_code = re.sub(r'const uiLogo = "data:image/png;base64,[^"]+";', f'const uiLogo = "{data_uri}";', code)

with open('Evaluate.jsx', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Successfully injected REAL logo base64 into Evaluate.jsx!")
