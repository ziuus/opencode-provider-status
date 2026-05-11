import { tool, type PluginInput, type Hooks } from "@opencode-ai/plugin";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { homedir } from "node:os";
import { join } from "node:path";

const execAsync = promisify(exec);
const PROVIDER_STATUS_SCRIPT = join(homedir(), "bin", "provider-status");

async function runProviderStatus(force: boolean = false): Promise<string> {
  const flag = force ? "--json" : "--json";
  try {
    const { stdout } = await execAsync(`${PROVIDER_STATUS_SCRIPT} ${flag}`, {
      timeout: 15_000,
    });
    return stdout;
  } catch (err: any) {
    return JSON.stringify({ error: err.message || "Unknown error" }, null, 2);
  }
}

const plugin = async (_input: PluginInput): Promise<Hooks> => ({
  tool: {
    check_providers: tool({
      description:
        "Check availability and quota of all AI providers (Copilot, Ollama, OpenRouter, Antigravity, OpenAI). Returns JSON with provider status, quota percentages, and error info.",
      args: {
        force: tool.schema.boolean().optional().default(false),
      },
      execute: async (args) => {
        return await runProviderStatus(args.force ?? false);
      },
    }),
  },
});

export default plugin;
