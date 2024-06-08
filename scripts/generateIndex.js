const fs = require('fs');
const path = require('path');

// Directory to scan for components
const componentsDir = path.join(__dirname, 'themedV2');

// Function to recursively get all JS/JSX files in a directory
const getComponentFiles = (dir) => {
  const files = fs.readdirSync(dir);
  let componentFiles = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      componentFiles = componentFiles.concat(getComponentFiles(filePath));
    } else if (file.match(/\.(js|jsx)$/)) {
      componentFiles.push(filePath);
    }
  });

  return componentFiles;
};

// Get all component files
const componentFiles = getComponentFiles(componentsDir);

// Generate export statements
const exportStatements = componentFiles
  .map((filePath) => {
    const relativePath = `./${path.relative(componentsDir, filePath).replace(/\\/g, '/')}`;
    const fileName = path.basename(filePath, path.extname(filePath));
    return `export { default as ${fileName} } from '${relativePath}';`;
  })
  .join('\n');

// Write to index.js
const indexPath = path.join(componentsDir, 'index.js');
fs.writeFileSync(indexPath, exportStatements, 'utf8');

console.log(`index.js file has been generated at ${indexPath}`);
