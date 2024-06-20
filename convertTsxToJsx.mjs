import path from 'path';
import { fileURLToPath } from 'url';
import * as babel from '@babel/core';
import babelGenerator from '@babel/generator';
import babelParser from '@babel/parser';
import babelTraverse from '@babel/traverse';
import * as babelTypes from '@babel/types';
import fs from 'fs-extra';

// Helper to resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src/api/convertFromTsx'); // Change directory name if needed
const destDir = path.join(__dirname, 'src/api/convertToJsx'); // Change directory name if needed

// Ensure destination directory exists
fs.ensureDirSync(destDir);

// Function to convert TypeScript types to PropTypes
const convertTypeToPropTypes = typeAnnotation => {
  switch (typeAnnotation.type) {
    case 'TSStringKeyword':
      return babelTypes.memberExpression(
        babelTypes.identifier('PropTypes'),
        babelTypes.identifier('string')
      );
    case 'TSNumberKeyword':
      return babelTypes.memberExpression(
        babelTypes.identifier('PropTypes'),
        babelTypes.identifier('number')
      );
    case 'TSBooleanKeyword':
      return babelTypes.memberExpression(
        babelTypes.identifier('PropTypes'),
        babelTypes.identifier('bool')
      );
    // Add more type conversions as needed
    default:
      return babelTypes.memberExpression(
        babelTypes.identifier('PropTypes'),
        babelTypes.identifier('any')
      );
  }
};

// Function to process a single file
const processFile = async filePath => {
  console.log(`Processing file: ${filePath}`);

  try {
    const code = await fs.readFile(filePath, 'utf-8');
    console.log(`Read file: ${filePath}`);

    // Parse the TypeScript code
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    });

    // Traverse and convert TypeScript types to PropTypes
    babelTraverse.default(ast, {
      // Convert type annotations
      TSPropertySignature(path) {
        const key = path.node.key;
        const typeAnnotation = path.node.typeAnnotation.typeAnnotation;
        const propType = convertTypeToPropTypes(typeAnnotation);
        const propTypeAssignment = babelTypes.objectProperty(key, propType);
        path.replaceWith(propTypeAssignment);
      },
      // Remove TypeScript types
      TSTypeAnnotation(path) {
        path.remove();
      },
      // Convert functional component types
      TSTypeParameterDeclaration(path) {
        path.remove();
      },
    });

    // Generate the transformed code
    const output = babelGenerator.default(ast).code;
    console.log(`Generated output for file: ${filePath}`);

    // Change file extension from .ts to .jsx
    const newFilePath = path.join(
      destDir,
      path.basename(filePath, '.ts') + '.jsx'
    );
    await fs.writeFile(newFilePath, output);
    console.log(`Converted and wrote file: ${newFilePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
};

// Read the directory and process each file
fs.readdir(srcDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  console.log(`Found ${files.length} files in ${srcDir}`);

  files
    .filter(file => file.endsWith('.ts'))
    .forEach(file => {
      const filePath = path.join(srcDir, file);
      processFile(filePath)
        .then(() => {
          console.log(`Successfully processed ${filePath}`);
        })
        .catch(err => {
          console.error(`Error processing ${filePath}:`, err);
        });
    });
});
