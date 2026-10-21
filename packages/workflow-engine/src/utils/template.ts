/**
 * Resolves nested property path in an object, supporting dot and bracket notations.
 * Examples: "user.name", "googleForm.responses['Question 1']", "items[0].id"
 */
export function getContextValue(context: Record<string, unknown>, path: string): unknown {
  if (!path || !context) return undefined;

  const normalizedPath = path
    .trim()
    .replace(/\[['"]?([^'"\]]+)['"]?\]/g, ".$1")
    .replace(/^\./, "");

  const parts = normalizedPath.split(".");
  let current: any = context;

  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }

  return current;
}

/**
 * Replaces {{variable.path}} and {{json variable.path}} expressions with values from context.
 */
export function resolveTemplate(template: string, context: Record<string, unknown>): string {
  if (!template || typeof template !== "string") return "";

  return template.replace(/\{\{\s*(json\s+)?([^}]+)\s*\}\}/g, (_match, isJson, expr) => {
    const rawExpr = expr.trim();
    const value = getContextValue(context, rawExpr);

    if (value === undefined || value === null) {
      return "";
    }

    if (isJson) {
      try {
        return JSON.stringify(value, null, 2);
      } catch {
        return String(value);
      }
    }

    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }

    return String(value);
  });
}
