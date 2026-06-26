---
name: ian-xiaohei-illustrations
description: Generate Chinese article illustrations in Xiaohei (小黑) hand-drawn style — 16:9 format, limited color annotations, 8 visual structure types. Use when documenting specs, handoffs, or guides with visual illustrations. Original skill by @helloianneo (github.com/helloianneo/ian-xiaohei-illustrations).
---

# ian-xiaohei-illustrations Integration

> **Credit**: Original skill by [@helloianneo](https://github.com/helloianneo/ian-xiaohei-illustrations) · MIT License · https://www.ianneo.xyz

Wraps the Xiaohei illustration skill for generating documentation visuals within Spec-Harness.

## When to Use

- SPEC.md needs explanatory diagrams or concept illustrations
- HANDOFF.md benefits from visual summaries
- Documentation or guides that need illustration support
- Chinese-language documentation projects

## Capabilities

- **Xiaohei IP Character**: distinctive black character with white dot eyes — consistent visual identity
- **16:9 Format**: optimized for article body illustrations with white background, hand-drawn line art
- **Limited Color Annotations**: sparing red, orange, blue Chinese handwritten annotations
- **Cognitive Anchor Mapping**: analyze text → identify key concepts to visualize
- **Shot List Generation**: 4-8 image shot lists per document
- **8 Visual Structures**: Workflow, System Detail, Before/After, Character State, Concept Metaphor, Method Layering, Map Route, Comic Strip

## Workflow Integration

```
/spec-author → SPEC.md
  → /implement produces code
    → /handoff captures session state
      → Xiaohei generates illustration set for documentation
        → /ship packages docs + illustrations
```

## QA Checklist

- [ ] White background with generous whitespace
- [ ] Xiaohei participates in the core action
- [ ] Chinese annotations correct and minimal
- [ ] No "PowerPoint feel" — organic hand-drawn aesthetic
- [ ] Illustration invents low-tech physical metaphor for concept
