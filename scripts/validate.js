#!/usr/bin/env node

/**
 * Validate spec-harness skill structure.
 * Skills must have: name, description, triggers, Overview, When to Use, Process, Anti-Rationalization, Verification
 * Agents must have: Operating Rules section
 * Templates must have: # headers
 * References must have: # headers
 */

const fs = require('fs');
const path = require('path');

const SKILL_REQUIRED = [
  'name:',
  'description:',
  'triggers:',
  'Overview',
  'When to Use',
  'Process',
  'Anti-Rationalization',
  'Verification',
];

const AGENT_REQUIRED = ['Operating Rules', '## Output'];

const root = path.join(__dirname, '..');

function validateFile(artifact) {
  const filePath = path.join(root, artifact);
  if (!fs.existsSync(filePath)) {
    return { artifact, status: 'MISSING' };
  }

  const content = fs.readFileSync(filePath, 'utf8');

  if (artifact.startsWith('skills/') && artifact.endsWith('/SKILL.md')) {
    const missing = SKILL_REQUIRED.filter((s) => !content.includes(s));
    if (missing.length > 0) {
      return { artifact, status: 'FAIL', missing };
    }
    return { artifact, status: 'PASS' };
  }

  if (artifact.startsWith('agents/') && artifact.endsWith('.md')) {
    const missing = AGENT_REQUIRED.filter((s) => !content.includes(s));
    if (missing.length > 0) {
      return { artifact, status: 'FAIL', missing };
    }
    return { artifact, status: 'PASS' };
  }

  if (artifact.startsWith('templates/') || artifact.startsWith('references/')) {
    if (!content.includes('#')) {
      return { artifact, status: 'FAIL', missing: 'No headers found' };
    }
    return { artifact, status: 'PASS' };
  }

  return { artifact, status: 'PASS' };
}

const REQUIRED = [
  'skills/grill-me/SKILL.md',
  'skills/spec-author/SKILL.md',
  'skills/spec-review/SKILL.md',
  'skills/implementer/SKILL.md',
  'skills/tdd-loop/SKILL.md',
  'skills/reviewer/SKILL.md',
  'skills/mutation-tester/SKILL.md',
  'skills/context-engineer/SKILL.md',
  'skills/subagent-driven-dev/SKILL.md',
  'skills/handoff/SKILL.md',
  'skills/diagnose/SKILL.md',
  'skills/zoom-out/SKILL.md',
  'skills/ship/SKILL.md',
  'skills/using-spec-harness/SKILL.md',
  'skills/council-review/SKILL.md',
  'agents/spec-author.md',
  'agents/implementer.md',
  'agents/judge.md',
  'agents/mutation-tester.md',
  'agents/council-chairman.md',
  'templates/SPEC.md',
  'templates/HANDOFF.md',
  'templates/REVIEW.md',
  'templates/MUTATION_REPORT.md',
  'templates/PRD.md',
  'references/ears-notation.md',
  'references/testing-anti-patterns.md',
  'references/context-minimization.md',
  'references/harness-principles.md',
];

let passed = 0;
let failed = 0;

console.log('Validating spec-harness...\n');

for (const artifact of REQUIRED) {
  const result = validateFile(artifact);
  if (result.status === 'MISSING') {
    console.log(`MISSING: ${artifact}`);
    failed++;
  } else if (result.status === 'FAIL') {
    console.log(`FAIL: ${artifact} — missing: ${result.missing.join(', ')}`);
    failed++;
  } else {
    passed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All validations passed!');
}