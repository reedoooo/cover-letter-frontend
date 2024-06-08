const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const ts = require('typescript');

// Convert TypeScript code to JavaScript
const convertTsToJs = (code) => {
  const result = ts.transpileModule(code, {
    compilerOptions: {
      jsx: 'preserve',
      // Preserve JSX
      target: ts.ScriptTarget.ESNext, // Target latest JavaScript version
    },
  });
  return result.outputText;
};

// Convert JS code with JSX to regular JavaScript
const convertJsxToJs = (code) => {
  const result = babel.transformSync(code, {
    presets: ['@babel/preset-react'],
  });
  return result.code;
};

// Recursively process files in a directory
const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        await processDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      await processFile(fullPath);
    }
  }
};

// Process individual file
const processFile = async (filePath) => {
  const ext = path.extname(filePath);
  const isTsFile = ext === '.ts' || ext === '.tsx';
  if (isTsFile) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const jsCode = convertTsToJs(code);
    const finalCode = ext === '.tsx' ? convertJsxToJs(jsCode) : jsCode;
    const newExt = ext === '.tsx' ? '.jsx' : '.js';
    const newFilePath = filePath.replace(ext, newExt);
    fs.writeFileSync(newFilePath, finalCode);
    fs.unlinkSync(filePath); // Remove original file
    console.log(`Converted ${filePath} to ${newFilePath}`);
  } else if (filePath.endsWith('tsconfig.json')) {
    await convertTsConfig(filePath);
  }
};

// Convert tsconfig.json to jsconfig.json
const convertTsConfig = async (filePath) => {
  const stripJsonComments = (await import('strip-json-comments')).default;
  const rawConfig = fs.readFileSync(filePath, 'utf-8');
  try {
    const config = JSON.parse(stripJsonComments(rawConfig));

    // Convert TypeScript-specific compiler options to JavaScript
    const newConfig = {
      ...config,
      compilerOptions: {
        ...config.compilerOptions,
        allowJs: true,
        checkJs: false,
        jsx: 'react',
      },
      exclude: config.exclude
        ? config.exclude.filter(
            (item) => item !== '**/*.ts' && item !== '**/*.tsx',
          )
        : undefined,
      include: config.include
        ? config.include.map((item) =>
            item.replace('*.ts', '*.js').replace('*.tsx', '*.jsx'),
          )
        : undefined,
    };
    const newFilePath = filePath.replace('tsconfig.json', 'jsconfig.json');
    fs.writeFileSync(newFilePath, JSON.stringify(newConfig, null, 2));
    fs.unlinkSync(filePath); // Remove original tsconfig.json
    console.log(`Converted ${filePath} to ${newFilePath}`);
  } catch (error) {
    console.error(`Failed to convert ${filePath}: ${error.message}`);
  }
};

// Entry point
const projectRoot = path.resolve(__dirname); // Adjust as necessary
processDirectory(projectRoot).then(() => {
  console.log('Project conversion complete.');
});
