import type {McpServerInfo, McpToolCall} from './types.js'

export class McpClient {
  constructor(private readonly url: string) {}

  async connect(): Promise<McpServerInfo> {
    throw new Error('McpClient.connect() not implemented — coming in v0.1')
  }

  async callTool(
    _toolName: string,
    _input: Record<string, unknown>,
  ): Promise<McpToolCall> {
    throw new Error('McpClient.callTool() not implemented — coming in v0.1')
  }

  async disconnect(): Promise<void> {
    // no-op stub
  }
}
