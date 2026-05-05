import {Args, Command, Flags} from '@oclif/core'

export default class Score extends Command {
  static override description =
    'Score an MCP server reliability and return a trust score from 0 to 100'

  static override examples = [
    '<%= config.bin %> score https://your-mcp-server.example.com',
    '<%= config.bin %> score https://your-mcp-server.example.com --output json',
  ]

  static override args = {
    url: Args.string({
      description: 'URL of the MCP server to score',
      required: true,
    }),
  }

  static override flags = {
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      default: 'terminal',
      options: ['terminal', 'json'],
    }),
    'json-path': Flags.string({
      description: 'File path to write JSON report (implies --output json)',
      default: './vouqis-report.json',
    }),
  }

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Score)

    if (!process.env.ANTHROPIC_API_KEY) {
      this.error(
        'ANTHROPIC_API_KEY environment variable is not set.\n' +
          'Export it before running: export ANTHROPIC_API_KEY=sk-ant-...',
      )
    }

    this.log(`Scoring MCP server: ${args.url}`)
    this.log(`Output format: ${flags.output}`)
    this.log('')
    this.log('Full eval harness coming in v0.1 — scaffold verified.')
  }
}
