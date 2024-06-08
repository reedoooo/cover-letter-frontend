/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'src/components/themedV2/icons');

const replaceCreateIcon = (content) => {
  const createIconRegex =
    /const createIcon = \(.+\) => {\n\s+const { displayName, viewBox, path } = props;\n\s+return \(\n\s+<SvgIcon[^>]*>([^]*?)<\/SvgIcon>\n\s+<\/SvgIcon>\n\s+\);\n};\n\n/gm;
  const iconDeclarationRegex = /export const (\w+) = createIcon\({([^}]+)}\);/g;

  return content.replace(iconDeclarationRegex, (match, p1, p2) => {
    const viewBoxMatch = p2.match(/viewBox: '([^']+)'/);
    const pathMatch = p2.match(/path: \(([^]+?)\)/m);

    if (!viewBoxMatch || !pathMatch) {
      console.error(`Failed to match viewBox or path for icon ${p1}`);
      return match;
    }

    const viewBox = viewBoxMatch[1];
    const pathContent = pathMatch[1];

    return `
export const ${p1} = (props) => (
  <SvgIcon viewBox="${viewBox}" style={{ width: '100%', height: '100%' }} {...props}>
    ${pathContent}
  </SvgIcon>
);`;
  });
};

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }

  files.forEach((file) => {
    const filePath = path.join(iconsDir, file);
    if (path.extname(filePath) === '.js') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return console.error('Unable to read file:', err);
        }

        const newContent = replaceCreateIcon(data);
        fs.writeFile(filePath, newContent, 'utf8', (err) => {
          if (err) {
            return console.error('Unable to write file:', err);
          }

          console.log(`Refactored ${file}`);
        });
      });
    }
  });
});
