const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs-extra');

// Helper function to parse a JavaScript file and extract the default export
const extractComponentName = (fileContent) => {
  const ast = babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties'],
  });

  let componentName = null;

  traverse(ast, {
    ExportDefaultDeclaration: ({ node }) => {
      if (node.declaration.type === 'Identifier') {
        componentName = node.declaration.name;
      } else if (
        node.declaration.type === 'ClassDeclaration' ||
        node.declaration.type === 'FunctionDeclaration'
      ) {
        componentName = node.declaration.id.name;
      }
    },
  });

  return componentName;
};

// Helper function to generate a story for a component
const generateStory = (componentName, componentPath) => {
  return `import React from 'react';
import ${componentName} from '${componentPath}';

export default {
  title: '${componentName}',
  component: ${componentName},
};

const Template = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
`;
};

// Main function to traverse the components directory and generate stories
const generateStories = async (componentsDir, storiesDir) => {
  const files = await fs.readdir(componentsDir);

  for (const file of files) {
    const fullPath = path.join(componentsDir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await generateStories(fullPath, storiesDir);
    } else if (path.extname(fullPath) === '.jsx') {
      const content = await fs.readFile(fullPath, 'utf-8');
      const componentName = extractComponentName(content);

      if (componentName) {
        const relativePath = path
          .relative(storiesDir, fullPath)
          .replace(/\\/g, '/')
          .replace(/\.jsx$/, '');
        const storyContent = generateStory(componentName, relativePath);
        const storyPath = path.join(storiesDir, `${componentName}.stories.jsx`);

        await fs.outputFile(storyPath, storyContent);
        console.log(`Generated story for ${componentName} at ${storyPath}`);
      }
    }
  }
};

// Run the script
(async () => {
  const componentsDir = path.join(__dirname, 'src', 'components');
  const storiesDir = path.join(__dirname, 'src', 'stories');

  await generateStories(componentsDir, storiesDir);
  console.log('Story generation complete.');
})();
