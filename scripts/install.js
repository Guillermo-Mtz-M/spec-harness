#!/usr/bin/env node

/**
 * spec-harness installer
 * Copies skills, agents, and rules to the target agent's config directory.
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
  },
  opencode: {
    agents: path.join(process.env.HOME || process.env.USERPROFILE, '.opencode'),
  },
  cursor: {
    rules: path.join(process.env.HOME || process.env.USERPROFILE, '.cursor/rules'),
  },
};

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

function install(target) {
  const dirs = TARGETS[target];
  if (!dirs) {
    console.error(`Unknown target: ${target}. Options: ${Object.keys(TARGETS).join(', ')}`);
    process.exit(1);
  }

  const root = path.join(__dirname, '..');

  console.log(`Installing spec-harness for ${target}...`);

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

  console.log('Done!');
  console.log(`\nNext steps:`);
  console.log(`  1. Restart your agent or run /using-spec-harness`);
  console.log(`  2. Start with /grill-me for a new feature`);
  console.log(`  3. Read WORKFLOW/README.md for the full workflow`);
}

const target = process.argv[2] || 'claude';
install(target);