const functionDeclaration = (
  componentName
) => `export function ${componentName}() {
    return <span>Hello from ${componentName}</span>;
  }
`;

const functionExpression = (
  componentName
) => `export const ${componentName} = () => {
  return <span>Hello from ${componentName}</span>;
}
`;

/**
 *
 * @param {string} type
 */
export function generateComponent(type, componentName) {
  switch (type) {
    case ComponentType.Declaration:
      return functionDeclaration(componentName);
    case ComponentType.Expression:
      return functionExpression(componentName);
    default:
      break;
  }
}

export const ComponentType = {
  Declaration: 'dcl',
  Expression: 'expr',
};
