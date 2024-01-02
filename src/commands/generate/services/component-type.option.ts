import { Option, InvalidArgumentError } from 'commander';

import { ComponentType } from './component.model';

export class ComponentTypeOption extends Option {
  constructor() {
    super(
      '-t, --type <type>',
      'Component as function declaration or function expression',
    );
    this.default(ComponentType.Declaration);
    this.argParser((value: string) => {
      if (
        value !== ComponentType.Declaration &&
        value !== ComponentType.Expression
      ) {
        throw new InvalidArgumentError(
          `\nAvailable types: '${ComponentType.Declaration}' or '${ComponentType.Expression}'`,
        );
      }
      return value;
    });
  }
}
