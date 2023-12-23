import path from 'path';
import fs from 'fs/promises';
import { Command } from 'commander';

import { parseExtension, parseType } from '../../lib/args-parser';
import { generateComponent, ComponentType } from './services/component';

async function generateComponentAction(
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

  const pathLike = `${path.join(
    process.cwd(),
    relativePath,
    componentName,
  )}.${extension}`;

  const component = await generateComponent(type, componentName);
  await fs.writeFile(pathLike, component, 'utf-8');

  console.log(`+ ${path.join(relativePath, componentName)}.${extension}`.green);
}

export const generate = new Command('generate')
  .description('Generates and/or modify files')
  .alias('g');

generate
  .command('component')
  .description('Create ReactJS component')
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
  .configureOutput({
    writeErr: (str) => process.stdout.write(`${str}`.red),
  })
  .action(generateComponentAction);
