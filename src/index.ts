#!/usr/bin/env node

import 'colors';
import { Command } from 'commander';

import { commands } from './cli';

const cli = new Command()
  .name('cb')
  .version('0.0.1')
  .description('@calmbyte/cli for generating React components');

commands.forEach((command) => {
  cli.addCommand(command);
});

cli.parse();
