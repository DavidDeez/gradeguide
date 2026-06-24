const https = require('https');
const fs = require('fs');

const url = 'https://myschool.ng/storage/images/schools/university-of-ibadan-ui-logo.png';
const file = fs.createWriteStream('src/assets/ui_logo.png');

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Logo downloaded successfully!');
  });
}).on('error', (err) => {
  console.error('Error downloading:', err.message);
});
