export function formatDate(input: string) {
  const d = new Date(input);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function estimateReadTime(text: string) {
  const words = text?.split(/\s+/g).filter(Boolean).length || 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function compactNumber(n: number) {
  try {
    return new Intl.NumberFormat(undefined, { notation: 'compact' }).format(n);
  } catch {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }
}
