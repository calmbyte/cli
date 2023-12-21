import { InvalidArgumentError } from 'commander';

export function parseExtension(value: string) {
  if (!/^(ts|js|jsx|tsx)$/.test(value)) {
    throw new InvalidArgumentError(`\nAvailable types: ts|js|jsx|tsx`);
  }
  return value;
}
