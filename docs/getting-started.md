# Getting Started with Agent Benchmark Kit

This guide will walk you through installing the framework, creating your first benchmark suite, and running your first evaluation.

---

## Prerequisites

- **Claude Code** installed and configured
- An AI agent you want to test (in `.claude/agents/` or `.claude/skills/`)
- 30-60 minutes for initial setup

---

## Installation

### Quick Install

```bash
# Clone the repository
git clone https://github.com/BrandCast-Signage/agent-benchmark-kit.git
cd agent-benchmark-kit

# Run the install script
./scripts/install.sh
```

The installer will:
- Copy agents to `~/.claude/agents/`
- Install `/benchmark-agent` skill
- Set up templates in `~/.agent-benchmarks/`
- Optionally install example benchmarks

### Manual Install

If you prefer manual installation:

```bash
# Create directories
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/skills/agent-benchmark
mkdir -p ~/.agent-benchmarks/{templates,examples,registries}

# Copy files
cp agents/*.md ~/.claude/agents/
cp skill/benchmark-agent.md ~/.claude/skills/agent-benchmark/
cp templates/*.{md,json,yml} ~/.agent-benchmarks/templates/
```

---

## Your First Benchmark Suite

### Option 1: Use the Test Suite Creator (Recommended)

The **test-suite-creator** agent is the killer feature. It generates a complete benchmark suite by asking you 5 questions.

**In Claude Code:**

```
/benchmark-agent --create my-content-validator
```

The agent will ask:

1. **What does your agent do?**
   - Example: "Validates blog posts before publishing"

2. **What validations or checks does it perform?**
   - Example: "Checks metadata, citations, formatting, images"

3. **What are common edge cases or failure modes?**
   - Example: "Missing metadata, broken citations, no images"

4. **What would "perfect" output look like?**
   - Example: "All required fields present, all stats cited, proper formatting"

5. **What would "clearly failing" output look like?**
   - Example: "YAML syntax errors, no citations, missing images"

**Result:** Complete benchmark suite in `~/.agent-benchmarks/my-content-validator/`:
- 5 test cases
- 5 ground truth files
- Scoring rubric (METRICS.md)
- Registry configuration
- README

---

### Option 2: Start from Example

Copy an existing example and modify it:

```bash
# Copy example
cp -r ~/.agent-benchmarks/examples/content-quality-agent ~/.agent-benchmarks/my-agent

# Edit test cases and ground truth
cd ~/.agent-benchmarks/my-agent
# Modify test-cases/ and ground-truth/ to match your agent
```

---

### Option 3: Manual Creation

Use the templates:

```bash
# Create structure
mkdir -p ~/.agent-benchmarks/my-agent/{test-cases,ground-truth}

# Copy templates
cp ~/.agent-benchmarks/templates/test-case-template.md ~/.agent-benchmarks/my-agent/test-cases/01-test.md
cp ~/.agent-benchmarks/templates/ground-truth-template.json ~/.agent-benchmarks/my-agent/ground-truth/01-expected.json
cp ~/.agent-benchmarks/templates/metrics-template.md ~/.agent-benchmarks/my-agent/METRICS.md
cp ~/.agent-benchmarks/templates/registry-template.yml ~/.agent-benchmarks/my-agent/registry.yml
```

Then edit each file to match your agent's requirements.

---

## Running Benchmarks

### Basic Usage

```bash
# Run all tests for your agent
/benchmark-agent my-content-validator
```

**Output:**
```
🎯 Running benchmarks for: my-content-validator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Test #01: Perfect Post .......................... 100/100 ✅
Test #02: Missing Metadata ....................... 92/100 ✅
Test #03: Broken Citations ....................... 85/100 ✅
Test #04: Missing Image .......................... 88/100 ✅
Test #05: Format Errors .......................... 78/100 ⚠️

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Overall Score: 88.6/100 (PASS - threshold: 80)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Recommendations:
  - Test #05 scoring below 80 - review YAML syntax detection
  - Consider adding test for invalid date formats
```

### Advanced Usage

```bash
# Run with test rotation (adds new tests if scoring too high)
/benchmark-agent my-agent --rotate

# Run all agents in a category
/benchmark-agent --all --marketing

# Generate marketing-friendly summary
/benchmark-agent my-agent --marketing-summary

# Verbose output (debug mode)
/benchmark-agent my-agent --verbose

# Just generate report from last run
/benchmark-agent my-agent --report-only
```

---

## Understanding Results

### Score Breakdown

Each test is scored 0-100 based on the METRICS.md rubric:

- **100/100:** Perfect - agent caught everything
- **85-99:** Excellent - minor misses
- **80-84:** Good - meets threshold
- **70-79:** Fair - needs improvement
- **<70:** Poor - significant issues

### Common Issues

#### False Positives (Test #01 fails)

**Problem:** Agent flags valid content

**Fix:**
- Review agent's validation logic
- Check if rules are too strict
- Verify test #01 truly represents "perfect" input

#### Missed Violations

**Problem:** Agent doesn't catch known issues

**Fix:**
- Add specific checks to agent
- Review ground truth expectations (are they realistic?)
- Check if agent has access to necessary context

#### Inconsistent Scoring

**Problem:** Same test scores differently across runs

**Fix:**
- Agent may be non-deterministic (using randomness)
- Ground truth may be too subjective
- Tighten scoring criteria in METRICS.md

---

## Improving Your Agent

### Iteration Cycle

1. **Run benchmarks** → Identify failures
2. **Fix agent** → Address specific issues
3. **Re-run** → Verify improvements
4. **Track progress** → performance-history.json

### Example Improvement Session

**Initial run:**
```
Test #03: Broken Citations .......... 65/100 ❌
Issue: Agent not detecting uncited statistics
```

**Fix agent:**
```markdown
## Step 3: Validate Citations

For each statistic or claim:
- Check if source link is present
- Verify link is valid URL
- Flag vague attributions ("experts say")
```

**Re-run:**
```
Test #03: Broken Citations .......... 92/100 ✅
Improvement: +27 points
```

**Result:** Track in performance-history.json

---

## Test Rotation

When your agent scores 95+ consistently, it's time to add harder tests:

```bash
/benchmark-agent my-agent --rotate
```

**The orchestrator will:**
- Detect high scores
- Suggest new test scenarios
- Help you create them
- Add to rotation
- Retire tests scoring 100 three times

**Goal:** Keep tests challenging as agent improves

---

## Best Practices

### Writing Test Cases

**DO:**
- Start with Test #01 = perfect (baseline for false positives)
- Cover diverse scenarios (single issue, multiple issues, edge cases)
- Make issues OBJECTIVE (measurable)
- Include real-world failures you've seen

**DON'T:**
- Make all tests similar
- Use subjective criteria ("this content is bad")
- Create impossible-to-pass tests
- Skip the perfect baseline test

### Writing Ground Truth

**DO:**
- Be specific about expected issues
- Provide concrete examples
- Make scoring objective
- Include must-catch issues

**DON'T:**
- Use vague descriptions
- Make expectations subjective
- Require perfect scores on everything
- Forget to test for false positives

### Creating Scoring Rubrics

**DO:**
- Total 100 points across 5 categories
- Weight by importance
- Define objective criteria
- Include penalties for false positives
- Set realistic pass threshold (usually 80)

**DON'T:**
- Make everything equally weighted
- Use only subjective criteria
- Set impossibly high thresholds
- Forget to penalize false positives

---

## Troubleshooting

### "Agent not found"

**Check:**
- Is agent in `.claude/agents/` or `.claude/skills/`?
- Is agent name spelled correctly?
- Does registry.yml reference the right agent?

### "Ground truth validation failed"

**Fix:**
- Validate JSON syntax in ground-truth files
- Ensure required fields are present
- Check file paths in registry.yml

### "Scoring seems wrong"

**Debug:**
- Run with `--verbose` flag
- Review METRICS.md criteria
- Check judge's reasoning in output
- Verify ground truth expectations are realistic

### "Tests keep failing"

**Options:**
1. Agent needs improvement (most common)
2. Ground truth expectations unrealistic
3. Test cases don't represent real usage
4. Scoring rubric too strict

**Solution:** Review each possibility systematically

---

## Next Steps

1. **Explore examples**
   ```bash
   ls ~/.agent-benchmarks/examples/
   ```

2. **Create benchmark for your agents**
   ```bash
   /benchmark-agent --create your-agent-name
   ```

3. **Set up tracking**
   - Run benchmarks regularly
   - Track performance-history.json
   - Share results publicly (transparency!)

4. **Contribute back**
   - Sanitize your benchmark suite
   - Submit as example
   - Help others avoid your mistakes

---

## Getting Help

- **Documentation:** Browse `/docs`
- **Examples:** Study `examples/` directory
- **Issues:** https://github.com/BrandCast-Signage/agent-benchmark-kit/issues
- **Discussions:** GitHub discussions

---

**Built by BrandCast** - Production-tested agent benchmarking

*Happy benchmarking! 🎯*
