import { Option } from 'commander';

export class DryRunOption extends Option {
  constructor() {
    super('-d, --dry', 'Dry run');
  }
}
