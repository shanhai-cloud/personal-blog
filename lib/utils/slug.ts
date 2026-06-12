export function slugifyCategory(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}
