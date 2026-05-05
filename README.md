# Vouqis

**The trust layer for MCP servers.**

Vouqis scores, monitors, and replays Model Context Protocol (MCP) server interactions so your AI agents stop failing in production. Run a 50-prompt eval suite against any MCP server, get a single trust score from 0 to 100, and see exactly where your tool calls break — in under 90 seconds.

```bash
npm install -g @vouqis/cli
export ANTHROPIC_API_KEY=sk-ant-...
vouqis score https://your-mcp-server.example.com
```

```
Vouqis Trust Score Report
────────────────────────────────────────────────
  Server:      https://your-mcp-server.example.com
  Score:       87 / 100  ████████████████░░░░
  Pass rate:   92.0%  (46/50 prompts)
  P95 latency: 340ms

  Errors by category:
    ✗ error-handling: 2 failures
    ✗ schema-validation: 2 failures
────────────────────────────────────────────────
```

> 17,468 MCP servers run in production. 87% score below the high-trust threshold. 73% of agent outages start at the JSON-RPC layer — the layer where most teams have zero observability. Vouqis fixes that.

## Installation

```bash
npm install -g @vouqis/cli
```

Node.js 20 or later required.

## Usage

```bash
# Score an MCP server against the default 50-prompt eval suite
vouqis score https://your-mcp-server.example.com

# Run eval with custom prompts and write JSON report
vouqis score https://your-mcp-server.example.com --output json

# Run eval with a custom prompts file
vouqis eval https://your-mcp-server.example.com --prompts ./my-prompts.json
```

## Trust Score Algorithm

The score is a weighted average of three signals:

| Signal | Weight | Description |
|---|---|---|
| Pass rate | 60% | Fraction of prompts where the MCP server responded correctly |
| P95 latency | 25% | 95th-percentile response time across all tool calls |
| Error taxonomy | 15% | Penalty for failures spread across multiple error categories |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Claude API key used as the foundation model for evals |

## Roadmap

- **v0.1** (May 16): Full eval harness running 50 real tool calls via Claude
- **v0.2** (May 23): Runtime SDK (5-line install, JSON-RPC trace capture)
- **v0.3** (May 28): Hosted dashboard at vouqis.dev — trace search and replay

## License

MIT © [Sundar Sasi](https://github.com/Sasisundar2211)
