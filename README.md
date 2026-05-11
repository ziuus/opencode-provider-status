# opencode-provider-status

OpenCode plugin that checks availability and quota of all AI providers.

## Features

- **Copilot quota** — remaining percentage and plan info
- **Ollama** — local daemon health and available models
- **OpenRouter** — API reachability and model count
- **Antigravity** — auth plugin registration status
- **OpenAI** — availability check

## Installation

```bash
# Via npm (once published)
npm install -g opencode-provider-status

# Or from source
git clone https://github.com/ziuus/opencode-provider-status.git
cd opencode-provider-status
npm install && npm run build
```

Then add to `~/.config/opencode/opencode.json`:
```json
"plugin": [
  "...",
  "opencode-provider-status"
]
```

## Usage

In any OpenCode session, call the `check_providers` tool:

```
Check what AI providers are available right now.
```

The plugin returns JSON with provider status, quota percentages, and error info.

## Requirements

- Node.js >= 20
- OpenCode >= 1.2.0

## License

MIT
