import { InvalidArgumentError } from 'commander';

import { ComponentType } from '../commands/generate/services/component';

export function parseExtension(value: string) {
  if (!/^(ts|js|jsx|tsx)$/.test(value)) {
    throw new InvalidArgumentError(`\nAvailable types: ts|js|jsx|tsx`);
  }
  return value;
}

export function parseType(value: string) {
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
