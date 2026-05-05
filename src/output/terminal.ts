import chalk from 'chalk'
import type {TrustScore} from '../eval/scoring.js'

function scoreColor(score: number): chalk.Chalk {
  if (score >= 80) return chalk.green
  if (score >= 60) return chalk.yellow
  return chalk.red
}

function bar(value: number, max = 100, width = 20): string {
  const filled = Math.round((value / max) * width)
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

export function printTrustScore(serverUrl: string, trust: TrustScore): void {
  const color = scoreColor(trust.score)

  console.log('')
  console.log(chalk.bold('Vouqis Trust Score Report'))
  console.log(chalk.dim('─'.repeat(48)))
  console.log(`  Server:     ${chalk.cyan(serverUrl)}`)
  console.log(`  Score:      ${color.bold(String(trust.score))} / 100  ${color(bar(trust.score))}`)
  console.log(`  Pass rate:  ${(trust.passRate * 100).toFixed(1)}%  (${trust.passedPrompts}/${trust.totalPrompts} prompts)`)
  console.log(`  P95 latency: ${trust.p95LatencyMs}ms`)

  if (Object.keys(trust.errorsByCategory).length > 0) {
    console.log('')
    console.log(chalk.bold('  Errors by category:'))
    for (const [cat, count] of Object.entries(trust.errorsByCategory)) {
      console.log(`    ${chalk.red('✗')} ${cat}: ${count} failure${count === 1 ? '' : 's'}`)
    }
  }

  console.log(chalk.dim('─'.repeat(48)))
  console.log('')
}
