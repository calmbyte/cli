import path from 'path';
import fs from 'fs/promises';
import { dashToPascal } from 'caseparser';

import { parseReactComponentTemplate } from '../../../lib/template-parser';

const templatePath = '../../../templates';

async function functionDeclaration(componentName: string) {
  const templatesPath = path.join(__dirname, templatePath);
  const template = await fs.readFile(
    `${templatesPath}/function-declaration.jsx.template`,
    'utf-8',
  );
  const context = {
    parsedComponentName: dashToPascal(componentName),
    componentName,
  };
  return parseReactComponentTemplate({ template, context });
}

async function functionExpression(componentName: string) {
  const templatesPath = path.join(__dirname, templatePath);
  const template = await fs.readFile(
    `${templatesPath}/function-expression.jsx.template`,
    'utf-8',
  );
  const context = {
    parsedComponentName: dashToPascal(componentName),
    componentName,
  };
  return parseReactComponentTemplate({ template, context });
}

/**
 *
 * @param {string} type
 */
export function generateComponent(type: ComponentType, componentName: string) {
  switch (type) {
    case ComponentType.Declaration:
      return functionDeclaration(componentName);
    case ComponentType.Expression:
      return functionExpression(componentName);
    default:
      throw new Error('Invalid component type');
  }
}

export enum ComponentType {
  Declaration = 'dcl',
  Expression = 'expr',
}
