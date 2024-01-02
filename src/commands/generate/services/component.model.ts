import path from 'path';
import fsSync from 'fs';
import fs from 'fs/promises';
import { dashToPascal } from 'caseparser';

import { parseReactComponentTemplate } from '../../../lib/template-parser';

export enum ComponentType {
  Declaration = 'dcl',
  Expression = 'expr',
}

export class ReactComponent {
  content: string;

  #templatePath = '../../../templates';

  constructor(type: ComponentType, componentName: string) {
    const template = fsSync.readFileSync(this.#getTemplatePath(type), 'utf-8');
    const context = {
      parsedComponentName: dashToPascal(componentName),
      componentName,
    };

    this.content = parseReactComponentTemplate({ template, context });
  }

  writeFile(path: string) {
    return fs.writeFile(path, this.content, 'utf-8');
  }

  #getTemplatePath(type: ComponentType) {
    const templatesPath = path.join(__dirname, this.#templatePath);
    return `${templatesPath}/${this.#parseType(type)}.jsx.template`;
  }

  #parseType(type: ComponentType) {
    switch (type) {
      case ComponentType.Declaration:
        return 'function-declaration';
      case ComponentType.Expression:
        return 'function-expression';
      default:
        throw new Error('Invalid component type');
    }
  }
}
