export interface EvalResult {
  promptId: string
  category: string
  passed: boolean
  durationMs: number
  error?: string
}

export interface TrustScore {
  score: number
  passRate: number
  p95LatencyMs: number
  errorsByCategory: Record<string, number>
  totalPrompts: number
  passedPrompts: number
}

const WEIGHTS = {
  passRate: 0.6,
  latency: 0.25,
  errorTaxonomy: 0.15,
} as const

function latencyScore(p95Ms: number): number {
  if (p95Ms <= 500) return 100
  if (p95Ms <= 1000) return 90
  if (p95Ms <= 2000) return 75
  if (p95Ms <= 4000) return 50
  if (p95Ms <= 8000) return 25
  return 0
}

function errorTaxonomyScore(results: EvalResult[]): number {
  const failed = results.filter((r) => !r.passed)
  if (failed.length === 0) return 100

  const categories = new Set(failed.map((r) => r.category))
  // Penalize 15 points per distinct error category beyond the first
  const penalty = (categories.size - 1) * 15
  return Math.max(0, 100 - penalty)
}

function percentile(sortedMs: number[], p: number): number {
  if (sortedMs.length === 0) return 0
  const idx = Math.ceil((p / 100) * sortedMs.length) - 1
  return sortedMs[Math.max(0, idx)]
}

export function computeTrustScore(results: EvalResult[]): TrustScore {
  const passed = results.filter((r) => r.passed)
  const passRate = results.length > 0 ? passed.length / results.length : 0

  const sortedLatencies = results.map((r) => r.durationMs).sort((a, b) => a - b)
  const p95 = percentile(sortedLatencies, 95)

  const errorsByCategory = results
    .filter((r) => !r.passed)
    .reduce<Record<string, number>>((acc, r) => {
      acc[r.category] = (acc[r.category] ?? 0) + 1
      return acc
    }, {})

  const rawScore =
    passRate * 100 * WEIGHTS.passRate +
    latencyScore(p95) * WEIGHTS.latency +
    errorTaxonomyScore(results) * WEIGHTS.errorTaxonomy

  return {
    score: Math.round(rawScore),
    passRate,
    p95LatencyMs: p95,
    errorsByCategory,
    totalPrompts: results.length,
    passedPrompts: passed.length,
  }
}
