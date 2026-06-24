const fs = require('fs');

const code = fs.readFileSync('Evaluate.jsx', 'utf8');
const base64 = fs.readFileSync('src/assets/ui_logo.png').toString('base64');
const dataUri = 'data:image/png;base64,' + base64;

// Replace the problematic import statement with a raw base64 string
const newCode = code.replace("import uiLogo from './src/assets/ui_logo.png';", `const uiLogo = "${dataUri}";`);

fs.writeFileSync('Evaluate.jsx', newCode);
console.log('Successfully injected base64 image into Evaluate.jsx!');
