import {describe, it, expect} from 'vitest'
import {computeTrustScore} from '../src/eval/scoring.js'
import {DEFAULT_PROMPTS} from '../src/eval/prompts.js'

describe('computeTrustScore', () => {
  it('returns 100 when all prompts pass with low latency', () => {
    const results = DEFAULT_PROMPTS.map((p) => ({
      promptId: p.id,
      category: p.category,
      passed: true,
      durationMs: 200,
    }))
    const {score} = computeTrustScore(results)
    expect(score).toBe(100)
  })

  it('returns a very low score when all prompts fail', () => {
    const results = DEFAULT_PROMPTS.map((p) => ({
      promptId: p.id,
      category: p.category,
      passed: false,
      durationMs: 10_000,
      error: 'simulated failure',
    }))
    const {score} = computeTrustScore(results)
    // passRate=0 and high latency dominate; small taxonomy residual is expected
    expect(score).toBeLessThan(15)
    expect(score).toBeGreaterThanOrEqual(0)
  })

  it('correctly computes pass rate', () => {
    const results = DEFAULT_PROMPTS.map((p, i) => ({
      promptId: p.id,
      category: p.category,
      passed: i % 2 === 0,
      durationMs: 300,
    }))
    const trust = computeTrustScore(results)
    expect(trust.passRate).toBeCloseTo(0.5, 1)
  })

  it('penalizes high p95 latency', () => {
    const fastResults = DEFAULT_PROMPTS.map((p) => ({
      promptId: p.id,
      category: p.category,
      passed: true,
      durationMs: 100,
    }))
    const slowResults = DEFAULT_PROMPTS.map((p) => ({
      promptId: p.id,
      category: p.category,
      passed: true,
      durationMs: 5000,
    }))
    const fast = computeTrustScore(fastResults)
    const slow = computeTrustScore(slowResults)
    expect(fast.score).toBeGreaterThan(slow.score)
  })

  it('DEFAULT_PROMPTS contains exactly 50 entries', () => {
    expect(DEFAULT_PROMPTS).toHaveLength(50)
  })
})
