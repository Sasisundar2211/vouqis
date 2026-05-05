export interface McpTool {
  name: string
  description: string
  inputSchema: Record<string, unknown>
}

export interface McpToolCall {
  toolName: string
  input: Record<string, unknown>
  output: unknown
  durationMs: number
  error?: string
}

export interface McpServerInfo {
  url: string
  tools: McpTool[]
}
