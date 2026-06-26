#!/usr/bin/env node

/**
 * spec-harness updater
 * Usage: node scripts/update.js [--check] [--target <agent>] [--with-extras]
 *   --check       Only check for updates, don't install
 *   --target      Update specific agent (default: reinstall to all previously installed)
 *   --with-extras  Include extras on update
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATE_DIR = path.join(process.env.HOME || process.env.USERPROFILE, '.spec-harness');
const STATE_FILE = path.join(STATE_DIR, 'state.json');

function getCurrentVersion() {
  try {
    const pkg = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(pkg)) {
      return JSON.parse(fs.readFileSync(pkg, 'utf8')).version || '0.0.0';
    }
  } catch (e) {}
  return '0.0.0';
}

function readState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {}
  return { version: '0.0.0', targets: [], extras: false, installedAt: null };
}

function writeState(state) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getRemoteVersion() {
  try {
    const result = execSync('git ls-remote --tags origin', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      timeout: 10000,
    });
    const tags = result.trim().split('\n').filter(Boolean);
    if (tags.length === 0) return null;
    const versions = tags
      .map(t => t.split('refs/tags/')[1])
      .filter(Boolean)
      .sort()
      .reverse();
    return versions[0] || null;
  } catch (e) {
    return null;
  }
}

function getLocalChanges() {
  try {
    const result = execSync('git log --oneline HEAD..origin/main 2>nul', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      timeout: 10000,
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (e) {
    return [];
  }
}

function check() {
  const state = readState();
  const current = getCurrentVersion();

  console.log('spec-harness update check\n');
  console.log(`  Current version: ${state.version}`);
  console.log(`  Installed at:    ${state.installedAt || 'unknown'}`);

  const pending = getLocalChanges();
  if (pending.length > 0) {
    console.log(`  Unpulled commits: ${pending.length}`);
    console.log('');
    console.log('  Pending changes:');
    for (const commit of pending.slice(0, 5)) {
      console.log(`    ${commit}`);
    }
    if (pending.length > 5) {
      console.log(`    ... and ${pending.length - 5} more`);
    }
    return true;
  }

  const remoteVersion = getRemoteVersion();
  if (remoteVersion && remoteVersion !== state.version) {
    console.log(`  Remote version:  ${remoteVersion}`);
    console.log('');
    console.log('  A new version is available!');
    return true;
  }

  console.log('');
  console.log('  ✓ spec-harness is up to date.');
  return false;
}

function update(withExtras) {
  const state = readState();

  console.log('Updating spec-harness...\n');

  // Git pull
  try {
    console.log('  Pulling latest changes...');
    execSync('git pull origin main', { cwd: path.join(__dirname, '..'), stdio: 'pipe', timeout: 30000 });
    console.log('  ✓ Git pull complete');
  } catch (e) {
    console.error('  ✗ Git pull failed. Check your network or git status.');
    process.exit(1);
  }

  // Get version
  const version = getCurrentVersion();

  // Reinstall to all previous targets
  const targets = state.targets.length > 0 ? state.targets : ['claude'];
  for (const target of targets) {
    try {
      const installScript = path.join(__dirname, 'install.js');
      const args = ['node', installScript, '--target', target];
      if (withExtras || state.extras) args.push('--with-extras');
      execSync(args.join(' '), { cwd: path.join(__dirname, '..'), stdio: 'pipe', timeout: 30000 });
      console.log(`  ✓ Reinstalled for ${target}`);
    } catch (e) {
      console.error(`  ✗ Failed to reinstall for ${target}`);
    }
  }

  // Update state
  writeState({
    version,
    targets: state.targets,
    extras: withExtras || state.extras,
    installedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  console.log('');
  console.log(`  ✓ spec-harness updated to ${version}!`);
}

const args = process.argv.slice(2);
const isCheck = args.includes('--check');

if (isCheck) {
  check();
} else {
  update(args.includes('--with-extras'));
}
