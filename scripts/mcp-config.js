#!/usr/bin/env node

/**
 * spec-harness MCP auto-configuration
 * Detects agent MCP config files and registers context7 + open-design servers.
 *
 * Usage: node scripts/mcp-config.js [--list] [--apply] [--no-mcp]
 */

const fs = require('fs');
const path = require('path');

const home = process.env.HOME || process.env.USERPROFILE;

const MCP_SERVERS = {
  'context7': {
    description: 'Up-to-date library docs for any framework/API',
    command: 'npx',
    args: ['@upstash/context7-mcp'],
    env: {},
  },
  'open-design': {
    description: 'Brand-grade design contracts with multi-format output',
    command: 'npx',
    args: ['@nexu-io/open-design-mcp'],
    env: {},
  },
};

const MCP_CONFIGS = [
  {
    name: 'Claude Desktop',
    file: path.join(home, 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json'),
    type: 'json',
    mcpKey: 'mcpServers',
    priority: 1,
  },
  {
    name: 'Windsurf / Devin',
    file: path.join(home, '.codeium', 'windsurf', 'mcp_settings.json'),
    type: 'json',
    mcpKey: 'mcpServers',
    priority: 2,
  },
  {
    name: 'VS Code / Cursor',
    file: path.join(home, '.vscode', 'mcp.json'),
    type: 'json',
    mcpKey: 'servers',
    priority: 3,
  },
  {
    name: 'Antigravity / Gemini',
    file: path.join(home, '.gemini', 'config', 'mcp.json'),
    type: 'json',
    mcpKey: 'mcpServers',
    priority: 4,
  },
];

function detectConfigs() {
  const found = [];
  for (const cfg of MCP_CONFIGS) {
    try {
      if (fs.existsSync(cfg.file)) {
        found.push({ ...cfg, exists: true });
      } else {
        found.push({ ...cfg, exists: false });
      }
    } catch (e) {
      // skip
    }
  }
  return found;
}

function readJson(file) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
}

function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getMcpEntries(config, servers) {
  const entries = {};
  for (const [name, server] of Object.entries(servers)) {
    entries[name] = {
      description: server.description,
      command: server.command,
      args: server.args,
      env: server.env,
    };
  }
  return entries;
}

function list() {
  const configs = detectConfigs();
  console.log('\nMCP Configuration Status\n');

  for (const cfg of configs) {
    const status = cfg.exists ? '✓' : '○';
    console.log(`  ${status} ${cfg.name}: ${cfg.file}`);
    if (cfg.exists) {
      try {
        const data = readJson(cfg.file);
        const servers = data[cfg.mcpKey] || {};
        const hasContext7 = 'context7' in servers;
        const hasOpenDesign = 'open-design' in servers;
        console.log(`      context7:    ${hasContext7 ? '✓ configured' : '— missing'}`);
        console.log(`      open-design: ${hasOpenDesign ? '✓ configured' : '— missing'}`);
      } catch (e) {
        console.log(`      (unreadable format)`);
      }
    }
  }

  console.log('');
  const total = configs.filter(c => c.exists).length;
  console.log(`  ${total} MCP configs found.`);
}

function apply() {
  const configs = detectConfigs();
  let applied = 0;

  console.log('\nApplying MCP Configuration\n');

  for (const cfg of configs) {
    if (!cfg.exists) {
      console.log(`  ○ ${cfg.name}: config not found, creating...`);
    }

    const data = readJson(cfg.file);
    const existing = data[cfg.mcpKey] || {};

    // Only add servers that don't already exist
    let changed = false;
    for (const [name, server] of Object.entries(MCP_SERVERS)) {
      if (!(name in existing)) {
        existing[name] = {
          description: server.description,
          command: server.command,
          args: server.args,
        };
        changed = true;
        console.log(`  ✓ ${cfg.name}: added ${name}`);
      } else {
        console.log(`  — ${cfg.name}: ${name} already configured`);
      }
    }

    if (changed || !cfg.exists) {
      data[cfg.mcpKey] = existing;
      writeJson(cfg.file, data);
      applied++;
    }
  }

  console.log(`\n  ${applied} configs updated.`);
  if (applied > 0) {
    console.log('  Restart your agents to pick up new MCP servers.');
  }
}

const args = process.argv.slice(2);

if (args.includes('--list')) {
  list();
} else if (args.includes('--no-mcp')) {
  console.log('MCP configuration skipped (--no-mcp)');
  process.exit(0);
} else {
  apply();
}
