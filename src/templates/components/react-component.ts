const functionDeclaration = (
  componentName: string,
) => `export function ${componentName}() {
    return <span>Hello from ${componentName}</span>;
  }
`;

const functionExpression = (
  componentName: string,
) => `export const ${componentName} = () => {
  return <span>Hello from ${componentName}</span>;
}
`;

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
      return '';
  }
}

export enum ComponentType {
  Declaration = 'dcl',
  Expression = 'expr',
}
