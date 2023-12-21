import path from 'path';
import fs from 'fs/promises';
import { Command, InvalidArgumentError } from 'commander';

import { parseExtension } from '../lib/extension-parser';
import {
  generateComponent,
  ComponentType,
} from '../templates/components/react-component';

function parseType(value: string) {
  if (
    value !== ComponentType.Declaration &&
    value !== ComponentType.Expression
  ) {
    throw new InvalidArgumentError(
      `\nAvailable types: '${ComponentType.Declaration}' or '${ComponentType.Expression}'`,
    );
  }
  return value;
}

async function generateAction(
  componentName: string,
  {
    extension,
    path: relativePath,
    type,
    dry,
  }: { type: ComponentType; extension: string; path: string; dry: boolean },
) {
  if (dry) {
    console.log(`+ ${relativePath}${componentName}.${extension}`.gray);
    return;
  }

  const pathLike = path.join(process.cwd(), relativePath, componentName);

  await fs.writeFile(
    `${pathLike}.${extension}`,
    generateComponent(type, componentName),
    'utf-8',
  );

  console.log(`+ ${path.join(relativePath, componentName)}.${extension}`.green);
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
    'tsx',
  )
  .option('-p, --path <path>', 'Custom path for component', './')
  .option('-d, --dry', 'Dry run')
  .option(
    '-t, --type <type>',
    'Component as function declaration or function expression',
    parseType,
    ComponentType.Declaration,
  )
  .description('Create component')
  .configureOutput({
    writeErr: (str) => process.stdout.write(`${str}`.red),
  })
  .action(generateAction);
