# /benchmark-agent

Run automated benchmark tests on Claude Code agents and track performance over time.

---

## Usage

```bash
# Create a new benchmark suite
/benchmark-agent --create <agent-name>

# Run benchmarks
/benchmark-agent <agent-name>
/benchmark-agent --all
/benchmark-agent --all --marketing
/benchmark-agent --all --tech

# Advanced options
/benchmark-agent <agent-name> --rotate
/benchmark-agent --report-only
/benchmark-agent <agent-name> --verbose
/benchmark-agent <agent-name> --marketing-summary
```

---

## Commands

### Create New Benchmark

```bash
/benchmark-agent --create my-content-agent
```

**What happens:**
1. Launches `test-suite-creator` agent
2. Asks you 5 questions about your agent
3. Generates complete benchmark suite:
   - 5 diverse test cases
   - Ground truth expectations (JSON)
   - Scoring rubric (METRICS.md)
   - Documentation

**Time:** < 1 hour from start to first benchmark

---

### Run Single Agent

```bash
/benchmark-agent seo-specialist
```

**What happens:**
1. Loads test suite for `seo-specialist`
2. Executes all test cases
3. Scores results via `benchmark-judge`
4. Updates performance history
5. Generates detailed report

**Output:**
```markdown
# Benchmark Results: seo-specialist

Overall Score: 90/100 ✅ PASS
Trend: ⬆️ Improving (+2 from baseline)

Individual Tests:
- Test #01: 82/100 ✓
- Test #02: 96/100 ✓
- Test #03: 92/100 ✓

Recommendation: DEPLOY v2
```

**Time:** 2-5 minutes (depends on agent complexity)

---

### Run All Agents

```bash
/benchmark-agent --all
```

**What happens:**
1. Loads all agents from registry
2. Runs benchmark on each
3. Generates summary report

**Filters:**
```bash
/benchmark-agent --all --marketing  # Marketing agents only
/benchmark-agent --all --tech       # Tech repo agents only
```

**Output:**
```markdown
# Benchmark Results: All Agents

Summary:
| Agent                  | Score  | Status | Trend |
|------------------------|--------|--------|-------|
| seo-specialist         | 90/100 | ✅ Pass | ⬆️ +2  |
| content-publishing     | 97/100 | ✅ Pass | ➡️  0  |
| weekly-planning        | 85/100 | ✅ Pass | ⬆️ +3  |

Overall health: 6/7 passing (85.7%)
```

**Time:** 10-30 minutes (depends on number of agents)

---

### Report Only

```bash
/benchmark-agent --report-only
/benchmark-agent seo-specialist --report-only
```

**What happens:**
1. Skips test execution
2. Reads latest run from history
3. Generates report from stored data

**Use cases:**
- Quick status check
- Share results with team
- Review historical performance

**Time:** < 5 seconds

---

### Test Rotation

```bash
/benchmark-agent seo-specialist --rotate
```

**What happens:**
1. Runs normal benchmark
2. Analyzes test performance
3. Suggests new tests (if agent scoring 95+)
4. Suggests retiring tests (if scoring 100 three times)
5. You approve/reject suggestions

**Example output:**
```markdown
## Test Rotation Suggestion

Current performance:
- Test #01: 95/100
- Test #02: 96/100
- Test #03: 97/100

Recommendation: Add Test #04 (long-form listicle)

Rationale:
- Agent mastering current tests
- Need to test SEO on 2000+ word content
- Listicle format has unique challenges

Accept? (yes/no)
```

---

### Verbose Mode

```bash
/benchmark-agent seo-specialist --verbose
```

**What happens:**
Shows detailed execution steps:
- Test file loading
- Agent invocation
- Judge scoring process
- Performance calculation

**Use for:**
- Debugging
- Understanding workflow
- Investigating unexpected results

---

### Marketing Summary

```bash
/benchmark-agent seo-specialist --marketing-summary
```

**What happens:**
Generates marketing-ready content about agent performance.

**Output:**
```markdown
# seo-specialist Performance Update

Latest score: 90/100 ✅
Improvement: +2.3% over 8 days

What Improved:
✨ More accurate scoring on mediocre content
✨ Zero false positives on excellent content
✨ Consistent spam detection

Real-World Impact:
Automated SEO auditing for blog posts with improved accuracy.

*Benchmarked using Agent Benchmark Kit*
```

**Use for:**
- Blog posts
- Social media
- Performance updates
- Customer communication

---

## Configuration

### Registry File

**Location:** `~/.agent-benchmarks/registry.yml`

**Structure:**
```yaml
agents:
  seo-specialist:
    name: "seo-specialist"
    location: "marketing"
    test_suite: "~/.agent-benchmarks/seo-specialist/"
    baseline_score: 88
    target_score: 90
    status: "production"

  content-publishing-specialist:
    name: "content-publishing-specialist"
    location: "marketing"
    test_suite: "~/.agent-benchmarks/content-publishing-specialist/"
    baseline_score: 97.5
    target_score: 95
    status: "production"
```

**Add new agent:**
```bash
/benchmark-agent --create my-agent
# Automatically adds to registry
```

---

### Performance History

**Location:** `~/.agent-benchmarks/performance-history.json`

**Structure:**
```json
{
  "seo-specialist": {
    "baseline": { "version": "v1", "score": 88 },
    "current": { "version": "v2", "score": 90 },
    "runs": [
      {
        "id": "run-001",
        "timestamp": "2025-11-01T10:00:00Z",
        "score": 88,
        "tests": {...}
      },
      {
        "id": "run-002",
        "timestamp": "2025-11-09T14:30:00Z",
        "score": 90,
        "tests": {...}
      }
    ]
  }
}
```

**Managed automatically** - no manual editing needed

---

## Examples

### Example 1: Create and run first benchmark

```bash
# 1. Create benchmark suite
/benchmark-agent --create seo-specialist

# Answer questions:
# > What does your agent do?
#   "Audits blog posts for SEO optimization"
# > What validations does it perform?
#   "Keyword usage, meta descriptions, content length, structure"
# > What are edge cases?
#   "Keyword stuffing, perfect content, very short content"
# > What's perfect output?
#   "700+ words, good keyword density, proper structure"
# > What's failing output?
#   "Thin content, no meta, keyword stuffing"

# 2. Review generated suite
ls ~/.agent-benchmarks/seo-specialist/

# 3. Run benchmark
/benchmark-agent seo-specialist

# 4. View results
# (Automatically displayed)
```

---

### Example 2: Weekly benchmark run

```bash
# Run all production agents
/benchmark-agent --all

# Review summary
# Identify any regressions
# Investigate agents below threshold
```

---

### Example 3: After prompt changes

```bash
# Made changes to agent prompt
# Want to validate improvement

# Run benchmark
/benchmark-agent seo-specialist

# Compare to baseline
# Look for:
# - Overall score increase
# - Specific test improvements
# - No new regressions
```

---

### Example 4: Generate marketing content

```bash
# Agent improved, want to share

/benchmark-agent seo-specialist --marketing-summary

# Copy output to blog post
# Share on social media
# Include in documentation
```

---

## Workflow Behind the Scenes

When you run `/benchmark-agent seo-specialist`, this happens:

1. **Slash command** receives input
2. **Invokes** `benchmark-orchestrator` agent
3. **Orchestrator:**
   - Loads agent config
   - For each test:
     - Reads test file
     - Invokes agent under test
     - Captures output
     - Invokes `benchmark-judge`
     - Records score
   - Calculates overall score
   - Updates performance history
   - Generates report
4. **Returns** report to you

**You see:** Final report
**Behind the scenes:** Full orchestration workflow

---

## Directory Structure

```
~/.agent-benchmarks/
├── registry.yml                          # Agent registry
├── performance-history.json              # All agent history
├── seo-specialist/                       # Agent benchmark suite
│   ├── test-cases/
│   │   ├── TEST-METADATA.md
│   │   ├── 01-mediocre-content.md
│   │   ├── 02-excellent-content.md
│   │   └── ...
│   ├── ground-truth/
│   │   ├── 01-expected.json
│   │   ├── 02-expected.json
│   │   └── ...
│   ├── results/
│   │   ├── run-001-results.md
│   │   ├── run-002-results.md
│   │   └── summary.md
│   ├── METRICS.md
│   ├── README.md
│   └── QUICK-START.md
└── content-publishing-specialist/
    └── [similar structure]
```

---

## Error Messages

### Agent not found

```markdown
❌ Error: Agent 'xyz' not found in registry

Available agents:
- seo-specialist
- content-publishing-specialist
- weekly-planning-specialist

Did you mean: seo-specialist?

To create new benchmark:
/benchmark-agent --create xyz
```

---

### No test suite

```markdown
❌ Error: No test suite found for 'my-agent'

The agent is registered but has no test cases.

Create benchmark suite:
/benchmark-agent --create my-agent
```

---

### Below threshold

```markdown
⚠️ Warning: Agent scored below threshold

Score: 75/100
Threshold: 80/100
Status: ❌ FAIL

Recommendation: Do NOT deploy
- Review failing tests
- Investigate regressions
- Iterate on agent prompt
- Re-run benchmark
```

---

## Tips

### Tip 1: Run before deploying

```bash
# Made prompt changes?
# Run benchmark before deploying

/benchmark-agent my-agent

# Only deploy if:
# - Score ≥ 80/100
# - No regressions on critical tests
# - Improvement over baseline (ideally)
```

---

### Tip 2: Weekly health checks

```bash
# Set up weekly routine
# Every Monday morning:

/benchmark-agent --all

# Review summary
# Investigate any regressions
# Celebrate improvements
```

---

### Tip 3: Use reports in PRs

```bash
# Making agent changes in PR?
# Include benchmark results

/benchmark-agent my-agent --report-only

# Copy markdown to PR description
# Show before/after scores
# Justify changes with data
```

---

### Tip 4: Track improvement journeys

```bash
# Document your agent's evolution

Week 1: 88/100 (baseline)
Week 2: 90/100 (+2 - added calibration)
Week 3: 92/100 (+2 - improved recommendations)
Week 4: 94/100 (+2 - edge case handling)

# Great content for:
# - Blog posts
# - Case studies
# - Team updates
```

---

## Next Steps

### After creating your first benchmark:

1. ✅ **Run it** - Get baseline score
2. ✅ **Review results** - Understand strengths/weaknesses
3. ✅ **Iterate** - Improve agent prompt based on data
4. ✅ **Re-run** - Validate improvements
5. ✅ **Deploy** - Ship better agent to production

### After establishing multiple benchmarks:

1. ✅ **Schedule weekly runs** - `/benchmark-agent --all`
2. ✅ **Track trends** - Performance history over time
3. ✅ **Rotate tests** - Keep agents challenged
4. ✅ **Share results** - Marketing content, team updates

---

## Learn More

- **[Getting Started Guide](../docs/getting-started.md)** - Installation and first benchmark
- **[Test Creation Guide](../docs/test-creation-guide.md)** - How to design effective tests
- **[Scoring Rubrics](../docs/scoring-rubrics.md)** - How to create fair scoring
- **[Advanced Usage](../docs/advanced-usage.md)** - Test rotation, tips, best practices

---

## Troubleshooting

**Problem:** Command not found
**Solution:** Run install script: `./scripts/install.sh`

**Problem:** Agent execution timeout
**Solution:** Increase timeout in config or simplify test case

**Problem:** Judge scoring seems incorrect
**Solution:** Review ground truth expectations, update rubric

**Problem:** Can't find test files
**Solution:** Check directory structure, ensure files are in correct location

---

## Support

- **Issues:** [GitHub Issues](https://github.com/BrandCast-Signage/agent-benchmark-kit/issues)
- **Discussions:** [GitHub Discussions](https://github.com/BrandCast-Signage/agent-benchmark-kit/discussions)
- **Docs:** [Full Documentation](../docs/)

---

**Built with ❤️ by [BrandCast](https://brandcast.app)**

Automated agent QA for production use.
