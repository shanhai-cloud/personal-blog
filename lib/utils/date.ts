export function formatDisplayDate(input?: string | null): string {
  if (!input) {
    return "";
  }

  const directDateMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (directDateMatch) {
    return `${directDateMatch[1]}-${directDateMatch[2]}-${directDateMatch[3]}`;
  }

  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return input;
  }

  const year = parsed.getUTCFullYear();
  const month = String(parsed.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsed.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
