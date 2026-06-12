export function formatReadingMinutes(minutes?: number | null): string {
  const safeMinutes = Math.max(1, Math.round(minutes ?? 0));
  return `${safeMinutes} 分钟读完`;
}

export function formatWordCount(wordCount?: number | null): string {
  const safeWordCount = Math.max(0, Math.round(wordCount ?? 0));
  return `${safeWordCount}`;
}
