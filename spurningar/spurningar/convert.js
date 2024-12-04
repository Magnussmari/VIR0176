// convert.js
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const md = new markdownIt();

const inputDir = './markdown';
const outputDir = './html';

fs.readdirSync(inputDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const filePath = path.join(inputDir, file);
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const result = md.render(markdown);
    const outputFilePath = path.join(outputDir, file.replace('.md', '.html'));
    
    // Add a back button and wrap content in a basic HTML structure
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${file.replace('.md', '')}</title>
          <link rel="stylesheet" href="../styles.css">
      </head>
      <body>
          <nav>
              <button onclick="window.history.back()">Back</button>
          </nav>
          <div id="content">
              ${result}
          </div>
      </body>
      </html>
    `;
    
    fs.writeFileSync(outputFilePath, htmlContent);
  }
});