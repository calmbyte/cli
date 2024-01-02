import path from 'path';
import { Command } from 'commander';

import { PathOption, DryRunOption } from '../../../services';
import {
  ComponentExtensionsOption,
  ComponentTypeOption,
  ComponentType,
  ReactComponent,
} from '../services';

interface Options {
  type: ComponentType;
  extension: string;
  path: string;
  dry: boolean;
}

export class ComponentCmd extends Command {
  constructor() {
    super('component');
    this.alias('c')
      .description('Create ReactJS component')
      .argument('<name>', `Component name: e.g. ${'Button'.green}`)
      .addOption(new PathOption())
      .addOption(new DryRunOption())
      .addOption(new ComponentExtensionsOption())
      .addOption(new ComponentTypeOption())
      .configureOutput({
        writeErr: (str) => process.stdout.write(`${str}`.red),
      })
      .action(this.main);
  }

  async main(
    componentName: string,
    { extension, path: relativePath, type, dry }: Options,
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

    const component = new ReactComponent(type, componentName);
    await component.writeFile(pathLike);

    console.log(
      `+ ${path.join(relativePath, componentName)}.${extension}`.green,
    );
  }
}
