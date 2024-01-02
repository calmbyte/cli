import { Command } from 'commander';

import { ComponentCmd } from './commands';

export class GenerateCmd extends Command {
  constructor() {
    super('generate');
    this.description('Generates and/or modify files').alias('g');

    this.addCommand(new ComponentCmd());
  }
}
