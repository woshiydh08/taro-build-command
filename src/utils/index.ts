export const transformObjectToArray = (obj: Record<string, string>) => {
  return Object.entries(obj).map(([value, name]) => ({ name, value }))
}
