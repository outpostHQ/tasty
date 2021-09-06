/**
 * Generate data DOM attributes from modifier map.
 */
export function modAttrs(map: Record<string, boolean | undefined | null> ): Record<string, string> {
  return Object.keys(map).reduce((attrs, key) => {
    if (map[key]) {
      attrs[`data-is-${key}`] = '';
    }

    return attrs;
  }, {});
}
