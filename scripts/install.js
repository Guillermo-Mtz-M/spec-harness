#!/usr/bin/env node

/**
 * spec-harness installer
 * Copies skills, agents, rules, and integrations to the target agent's config directory.
 * Usage: node scripts/install.js [target] [--with-extras]
 *   target: claude (default), opencode, cursor
 *   --with-extras: also install extras integrations (ui-ux-pro-max, open-design, etc.)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TARGETS = {
  claude: {
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/skills'),
    agents: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/agents'),
    commands: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/commands'),
    rules: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/rules'),
    integrations: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/skills/integrations'),
    templates: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/templates'),
    references: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/references'),
    docs: path.join(process.env.HOME || process.env.USERPROFILE, '.claude/docs'),
  },
  opencode: {
    agents: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/agents'),
    skills: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/skills'),
    integrations: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/skills/integrations'),
    templates: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/templates'),
    references: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode/references'),
  },
  cursor: {
    rules: path.join(process.env.HOME || process.env.USERPROFILE, '.cursor/rules'),
  },
};

const EXTRAS_INTEGRATIONS = [
  'ui-ux-pro-max',
  'open-design',
  'ian-xiaohei-illustrations',
  'small-business',
];

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

function install(target, withExtras) {
  const dirs = TARGETS[target];
  if (!dirs) {
    console.error(`Unknown target: ${target}. Options: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  const root = path.join(__dirname, '..');
  const profile = withExtras ? 'full' : 'core';

  console.log(`Installing spec-harness (${profile} profile) for ${target}...`);

  if (dirs.skills && fs.existsSync(path.join(root, 'skills'))) {
    console.log(`  Copying skills to ${dirs.skills}`);
    copyRecursive(path.join(root, 'skills'), dirs.skills);
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
      console.log(`  Copying integration ${isExtra ? '(extras) ' : ''}${entry.name} to ${destPath}`);
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
  console.log('  ✓ spec-harness installed successfully!');
  if (withExtras) {
    console.log('  ✓ Extras integrations installed (ui-ux-pro-max, open-design, xiaohei-illustrations, small-business)');
  } else {
    console.log('  ℹ️  Extras not installed. Use --with-extras for design tools and plugins.');
  }
  console.log('');
  console.log(`Next steps:`);
  console.log(`  1. Restart your agent or run /using-spec-harness`);
  console.log(`  2. Start with /grill-me for a new feature`);
  console.log(`  3. Read WORKFLOW/README.md for the full workflow`);
  if (!withExtras) {
    console.log(`  4. Re-run with --with-extras for extra design tools`);
  }
}

const args = process.argv.slice(2);
const withExtras = args.includes('--with-extras');
const target = args.find(a => !a.startsWith('--')) || 'claude';

install(target, withExtras);
