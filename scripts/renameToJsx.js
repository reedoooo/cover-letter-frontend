const fs = require('fs');
const path = require('path');

const directoryPath = './src'; // Change this to your project directory

function renameFiles(dirPath) {
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
          renameFiles(fullPath); // Recursively rename files in subdirectories
        } else if (path.extname(file) === '.js') {
          const newFullPath = fullPath.replace('.js', '.jsx');
          fs.rename(fullPath, newFullPath, (err) => {
            if (err) {
              console.error(`Unable to rename file: ${err}`);
            } else {
              console.log(`Renamed: ${fullPath} -> ${newFullPath}`);
            }
          });
        }
      });
    });
  });
}

renameFiles(directoryPath);
