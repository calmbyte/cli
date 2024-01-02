import { Option } from 'commander';

export class PathOption extends Option {
  constructor() {
    super('-p, --path <path>', 'Custom path for component');
    this.default('./');
    // TODO (implement validPathParser)
    // this.argParser(validPathParser);
  }
}
