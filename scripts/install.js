#!/usr/bin/env node

/**
 * spec-harness installer
 * Primary: npx skills add guillermo-mtz-m/spec-harness (recommended)
 * Fallback: node scripts/install.js [--target <agent>] [--with-extras] [--auto]
 *
 * Targets: claude, opencode, cursor, codex, gemini, antigravity, windsurf, copilot
 * Auto-detect: analyzes environment to find which agents are installed
 */

const fs = require('fs');
const path = require('path');

const STATE_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.spec-harness');
const STATE_FILE = path.join(STATE_DIR, 'state.json');

const TARGETS = {
  claude: {
    name: 'Claude Code',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/skills'),
    commands: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/commands'),
    rules: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/rules'),
    agents: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/agents'),
    templates: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/templates'),
    references: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/references'),
    integrations: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/skills/integrations'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.claude')),
  },
  opencode: {
    name: 'OpenCode',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/skills'),
    agents: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/agents'),
    integrations: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/skills/integrations'),
    templates: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/templates'),
    references: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/references'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.opencode')),
  },
  cursor: {
    name: 'Cursor',
    rules: path.join(process.env.HOME || process.env.USERPROFILE, '.cursor/rules'),
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.cursor/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.cursor')),
  },
  codex: {
    name: 'Codex CLI',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.agents/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.codex')),
  },
  gemini: {
    name: 'Gemini CLI',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.gemini/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.gemini')),
  },
  antigravity: {
    name: 'Antigravity IDE/CLI',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.gemini/config/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.gemini/antigravity')),
  },
  windsurf: {
    name: 'Windsurf / Devin',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.codeium/windsurf/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.codeium/windsurf')),
  },
  copilot: {
    name: 'GitHub Copilot',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.copilot/skills'),
    detect: () => fs.existsSync(path.join(process.env.HOME || process.env.USERPROFILE, '.copilot')),
  },
  universal: {
    name: 'Universal (.agents/skills/)',
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.agents/skills'),
    detect: () => true,
  },
};

const EXTRAS_INTEGRATIONS = [
  'ui-ux-pro-max',
  'open-design',
  'ian-xiaohei-illustrations',
  'small-business',
];

const UNIVERSAL_SKILL_TARGETS = ['codex', 'cursor', 'windsurf'];

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function installSkills(srcSkills, destSkills) {
  if (!fs.existsSync(srcSkills)) return;
  fs.mkdirSync(destSkills, { recursive: true });
  const entries = fs.readdirSync(srcSkills, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const srcPath = path.join(srcSkills, entry.name);
    const destPath = path.join(destSkills, entry.name);
    if (fs.existsSync(path.join(srcPath, 'SKILL.md'))) {
      copyRecursive(srcPath, destPath);
    }
  }
}

let installedTargets = [];

function install(target, withExtras) {
  const dirs = TARGETS[target];
  if (!dirs) {
    console.error(`Unknown target: ${target}. Options: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  const root = path.join(__dirname, '..');
  const profile = withExtras ? 'full' : 'core';

  console.log(`Installing spec-harness (${profile} profile) for ${dirs.name}...`);

  if (dirs.skills) {
    const srcSkills = path.join(root, 'skills');
    if (fs.existsSync(srcSkills)) {
      console.log(`  Copying skills to ${dirs.skills}`);
      installSkills(srcSkills, dirs.skills);
    }
  }

  if (dirs.agents && fs.existsSync(path.join(root, 'agents'))) {
    console.log(`  Copying agents to ${dirs.agents}`);
    copyRecursive(path.join(root, 'agents'), dirs.agents);
  }

  if (dirs.commands && fs.existsSync(path.join(root, '.claude/commands'))) {
    console.log(`  Copying commands to ${dirs.commands}`);
    copyRecursive(path.join(root, '.claude/commands'), dirs.commands);
  }

  if (dirs.rules) {
    const commonRules = path.join(root, 'rules/common');
    if (fs.existsSync(commonRules)) {
      const dest = path.join(dirs.rules, 'spec-harness');
      console.log(`  Copying rules to ${dest}`);
      fs.mkdirSync(dest, { recursive: true });
      copyRecursive(commonRules, dest);
    }
  }

  if (dirs.integrations && fs.existsSync(path.join(root, 'integrations'))) {
    const integrationsDir = path.join(root, 'integrations');
    const entries = fs.readdirSync(integrationsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const isExtra = EXTRAS_INTEGRATIONS.includes(entry.name);
      if (isExtra && !withExtras) continue;
      const srcPath = path.join(integrationsDir, entry.name);
      const destPath = path.join(dirs.integrations, entry.name);
      console.log(`  Copying integration ${isExtra ? '(extras) ' : ''}${entry.name}`);
      copyRecursive(srcPath, destPath);
    }
  }

  if (dirs.templates && fs.existsSync(path.join(root, 'templates'))) {
    console.log(`  Copying templates to ${dirs.templates}`);
    copyRecursive(path.join(root, 'templates'), dirs.templates);
  }

  if (dirs.references && fs.existsSync(path.join(root, 'references'))) {
    console.log(`  Copying references to ${dirs.references}`);
    copyRecursive(path.join(root, 'references'), dirs.references);
  }

  console.log('');
  console.log(`  ✓ spec-harness installed successfully for ${dirs.name}!`);
  if (withExtras) {
    console.log('  ✓ Extras integrations installed (ui-ux-pro-max, open-design, xiaohei-illustrations, small-business)');
  } else {
    console.log('  ℹ️  Extras not installed. Use --with-extras for design tools and plugins.');
  }
  console.log('');
  console.log(`Next steps:`);
  console.log(`  1. Restart your agent or run /using-spec-harness`);
  console.log(`  2. Start with /grill-me for a new feature`);
  console.log(`  3. Read README.md for the full workflow`);

  installedTargets.push(target);
}

function saveState(withExtras) {
  const version = '1.0.0';
  const state = {
    version,
    targets: [...new Set(installedTargets)],
    extras: withExtras,
    installedAt: new Date().toISOString(),
  };
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function autoDetect() {
  console.log('Auto-detecting installed agents...\n');
  const detected = [];
  for (const [key, target] of Object.entries(TARGETS)) {
    if (key === 'universal') continue;
    try {
      if (target.detect()) {
        detected.push(key);
        console.log(`  ✓ ${target.name}`);
      }
    } catch (e) {
      // skip if detect throws
    }
  }
  console.log('');
  return detected;
}

const args = process.argv.slice(2);
const withExtras = args.includes('--with-extras');
const isAuto = args.includes('--auto');
const noMcp = args.includes('--no-mcp');
const explicitTarget = args.find(a => !a.startsWith('--'));

function configureMcp() {
  if (noMcp) {
    console.log('  ℹ️  MCP configuration skipped (--no-mcp)');
    return;
  }
  console.log('  Configuring MCP servers...');
  try {
    const mcpScript = path.join(__dirname, 'mcp-config.js');
    if (fs.existsSync(mcpScript)) {
      require(mcpScript);
    } else {
      console.log('  (mcp-config.js not found)');
    }
  } catch (e) {
    console.log(`  ℹ️  MCP config skipped: ${e.message}`);
  }
}

if (isAuto) {
  const detected = autoDetect();
  if (detected.length === 0) {
    console.log('No agents detected. Install to universal path? (y/N)');
    install('universal', withExtras);
  } else {
    for (const target of detected) {
      install(target, withExtras);
    }
  }
  if (withExtras) configureMcp();
  saveState(withExtras);
} else if (explicitTarget) {
  install(explicitTarget, withExtras);
  if (withExtras) configureMcp();
  saveState(withExtras);
} else {
  console.log('Usage: node scripts/install.js [--target <agent>] [--with-extras] [--auto]');
  console.log('');
  console.log('  --target <agent>   Install for specific agent: ' + Object.keys(TARGETS).filter(k => k !== 'universal').join(', '));
  console.log('  --with-extras      Install extras integrations (design tools, plugins)');
  console.log('  --auto             Auto-detect agents and install for all found');
  console.log('');
  console.log('  Quick start:');
  console.log('    npx skills add guillermo-mtz-m/spec-harness  (recommended)');
  console.log('    node scripts/install.js --auto               (auto-detect + install)');
  console.log('    node scripts/install.js --target claude      (single agent)');
}
