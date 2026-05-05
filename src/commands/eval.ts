import {Args, Command, Flags} from '@oclif/core'

export default class Eval extends Command {
  static override description =
    'Run an eval suite against an MCP server with a custom prompt file'

  static override examples = [
    '<%= config.bin %> eval https://your-mcp-server.example.com --prompts ./my-prompts.json',
  ]

  static override args = {
    url: Args.string({
      description: 'URL of the MCP server to eval',
      required: true,
    }),
  }

  static override flags = {
    prompts: Flags.string({
      char: 'p',
      description: 'Path to custom prompts JSON file',
      required: true,
    }),
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      default: 'terminal',
      options: ['terminal', 'json'],
    }),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Eval)

    if (!process.env.ANTHROPIC_API_KEY) {
      this.error('ANTHROPIC_API_KEY environment variable is not set.')
    }

    this.log(`Running custom eval against: ${args.url}`)
    this.log(`Prompts file: ${flags.prompts}`)
    this.log('')
    this.log('Custom eval harness coming in v0.1 — scaffold verified.')
  }
}
