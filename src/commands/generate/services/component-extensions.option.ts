import { Option, InvalidArgumentError } from 'commander';

export class ComponentExtensionsOption extends Option {
  constructor() {
    super('-ext, --extension <ext>', 'File extension ts|js|tsx|jsx');
    this.default('tsx');
    this.argParser((value: string) => {
      if (!/^(ts|js|jsx|tsx)$/.test(value)) {
        throw new InvalidArgumentError(`\nAvailable types: ts|js|jsx|tsx`);
      }
      return value;
    });
  }
}
