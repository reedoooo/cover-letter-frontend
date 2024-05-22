const fs = require('fs');
const path = require('path');

const directoryPath = './src'; // Change this to your project directory

function updateImports(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Unable to scan directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);

      fs.stat(fullPath, (err, stat) => {
        if (err) {
          console.error(`Unable to stat file: ${err}`);
          return;
        }

        if (stat.isDirectory()) {
          updateImports(fullPath); // Recursively update imports in subdirectories
        } else if (
          path.extname(file) === '.jsx' ||
          path.extname(file) === '.js'
        ) {
          fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Unable to read file: ${err}`);
              return;
            }

            const updatedData = data.replace(
              /(import.*from\s+['"])(.*?)(['"];?)/g,
              (match, p1, p2, p3) => {
                if (p2.endsWith('.js')) {
                  return `${p1}${p2.slice(0, -3)}.jsx${p3}`;
                }
                return match;
              }
            );

            fs.writeFile(fullPath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error(`Unable to write file: ${err}`);
              } else {
                console.log(`Updated imports in: ${fullPath}`);
              }
            });
          });
        }
      });
    });
  });
}

updateImports(directoryPath);
