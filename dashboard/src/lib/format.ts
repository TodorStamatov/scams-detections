export function formatPct(x: number) {
  return `${(100 * x).toFixed(3)}%`
}

export function formatCount(n: number) {
  return n.toLocaleString('bg-BG')
}
