export function parseReactComponentTemplate({
  template,
  context,
}: {
  template: string;
  context: Record<string, string>;
}) {
  const str = template.matchAll(/<%.+%>/gm);
  let interpolatedTemplate: string = JSON.parse(JSON.stringify(template));

  for (const [key] of str) {
    const interpolatedValue = context[key.replace(/<%|%>/g, '').trim()];
    interpolatedTemplate = interpolatedTemplate.replace(key, interpolatedValue);
  }

  return interpolatedTemplate;
}
