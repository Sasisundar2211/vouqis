import type {EvalResult} from './scoring.js'
import type {EvalPrompt} from './prompts.js'

export interface HarnessOptions {
  anthropicApiKey: string
  mcpServerUrl: string
  prompts: EvalPrompt[]
  concurrency?: number
}

export async function runEval(_options: HarnessOptions): Promise<EvalResult[]> {
  throw new Error('runEval() not implemented — coming in v0.1')
}
