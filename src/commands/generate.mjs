import path from 'path';
import fs from 'fs/promises';
import { Command, InvalidArgumentError } from 'commander';

import {
  generateComponent,
  ComponentType,
} from '../templates/components/react-component.mjs';
import { parseExtension } from '../lib/extension-parser.mjs';

function parseType(value) {
  if (
    value !== ComponentType.Declaration &&
    value !== ComponentType.Expression
  ) {
    throw new InvalidArgumentError(
      `\nAvailable types: '${ComponentType.Declaration}' or '${ComponentType.Expression}'`
    );
  }
  return value;
}

async function generateAction(
  componentName,
  { extension, path: relativePath, type, dry }
) {
  if (dry) {
    console.log(`+ ${relativePath}${componentName}.${extension}`.gray);
    return;
  }

  const pathLike = path.join(process.cwd(), relativePath, componentName);

  await fs.writeFile(
    `${pathLike}.${extension}`,
    generateComponent(type, componentName),
    'utf-8'
  );

  console.log(`+ ${relativePath}/${componentName}.${extension}`.green);
}

export const generate = new Command('generate')
  .description('Generates and/or modify files')
  .alias('g');

generate
  .command('component')
  .alias('c')
  .argument('<name>', `Component name: e.g. ${'Button'.green}`)
  .option(
    '-ext, --extension <ext>',
    `File extension ts|js|tsx|jsx`,
    parseExtension,
    'tsx'
  )
  .option('-p, --path <path>', 'Custom path for component', './')
  .option('-d, --dry', 'Dry run')
  .option(
    '-t, --type <type>',
    'Component as function declaration or function expression',
    parseType,
    ComponentType.Declaration
  )
  .description('Create component')
  .configureOutput({
    writeErr: (str) => process.stdout.write(`${str}`.red),
  })
  .action(generateAction);
