# Contributing to Agent Benchmark Kit

Thank you for your interest in contributing! This project helps teams build reliable AI agents through systematic testing and continuous improvement.

---

## Ways to Contribute

### 1. Share Your Benchmark Examples

**Most valuable contribution:** Real-world benchmark suites from production agents.

- Sanitize any proprietary/sensitive content
- Include README explaining what the agent does
- Provide 3-5 test cases with ground truth
- Add METRICS.md scoring rubric
- Submit as PR to `/examples/your-agent-name/`

**Why this matters:** Real examples help others understand how to test their agents effectively.

---

### 2. Improve Documentation

- Getting started guides
- Best practices for writing test cases
- Troubleshooting common issues
- Video walkthroughs or tutorials

---

### 3. Enhance the Framework

**Before submitting code changes:**

1. Open an issue describing the problem/improvement
2. Discuss approach with maintainers
3. Keep changes focused and well-tested

**Areas for improvement:**
- Better scoring algorithms
- Test rotation strategies
- Performance tracking features
- Integration with CI/CD
- Support for different agent types

---

### 4. Report Issues

Found a bug or have a suggestion?

- Check existing issues first
- Provide clear reproduction steps
- Include relevant context (OS, Claude version, etc.)
- Be specific about expected vs. actual behavior

---

## Code of Conduct

### Our Standards

**Positive environment:**
- Respectful and inclusive language
- Welcoming diverse perspectives
- Constructive feedback
- Focus on what's best for the community

**Not acceptable:**
- Harassment or discriminatory language
- Personal attacks
- Publishing others' private information
- Unprofessional conduct

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: [github issues](https://github.com/BrandCast-Signage/agent-benchmark-kit/issues)

---

## Development Guidelines

### Adding Example Benchmarks

**Structure:**
```
examples/your-agent-name/
├── README.md                    # What this agent does
├── METRICS.md                   # Scoring rubric (100 points)
├── test-cases/
│   ├── 01-perfect-case.ext     # Baseline (no false positives)
│   ├── 02-single-issue.ext     # Common error
│   ├── 03-quality-issue.ext    # Deeper validation
│   ├── 04-edge-case.ext        # Unusual scenario
│   └── 05-multiple-issues.ext  # Comprehensive test
└── ground-truth/
    ├── 01-expected.json
    ├── 02-expected.json
    ├── 03-expected.json
    ├── 04-expected.json
    └── 05-expected.json
```

**Test case requirements:**
- Test #01 MUST be perfect (baseline for false positives)
- Include diverse scenarios (single issue, multiple issues, edge cases)
- Ground truth must be objective and measurable
- METRICS.md should total 100 points

### Writing Ground Truth

**Good ground truth:**
```json
{
  "must_catch_issues": [
    "Missing required field 'title' in frontmatter",
    "Description is 45 characters (needs 120-160)"
  ],
  "expected_fixes": [
    "Add title field to frontmatter",
    "Expand description to meet length requirement"
  ]
}
```

**Poor ground truth:**
```json
{
  "must_catch_issues": [
    "Content has problems"  // Too vague
  ],
  "expected_fixes": [
    "Fix it"  // Not actionable
  ]
}
```

### Scoring Rubrics

**100-point structure:**
- 5 categories (15-30 points each)
- Objective criteria (not subjective)
- Penalties for false positives/missed critical issues
- Clear pass threshold (usually 80/100)

**Example:**
```markdown
## Category 1: Metadata Validation (30 points)

**Required Field Detection (15 points)**
- Identifies missing required fields: **10 pts**
- Validates field formats: **5 pts**

**Field Content Validation (15 points)**
- Description length (120-160 chars): **8 pts**
- Date format (YYYY-MM-DD): **4 pts**
- Syntax validation: **3 pts**
```

---

## Pull Request Process

### Before submitting:

1. **Run the benchmarks** - Ensure your changes don't break existing tests
2. **Update documentation** - If adding features or changing behavior
3. **Follow existing patterns** - Match code style and structure
4. **Write clear commit messages** - Explain what and why

### PR Template:

```markdown
## What does this PR do?
Brief description

## Type of change
- [ ] New example benchmark
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation improvement

## Checklist
- [ ] Follows existing code patterns
- [ ] Documentation updated
- [ ] Examples tested
- [ ] No breaking changes (or documented if breaking)

## Testing
How did you test this?
```

### Review process:

1. Maintainers review within 3-5 days
2. Feedback addressed
3. Approved PRs merged to main
4. Recognition added to README

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes (for significant contributions)
- Special badge for example benchmark contributors

---

## Questions?

- **General questions:** Open a GitHub discussion
- **Bug reports:** Open an issue
- **Feature ideas:** Open an issue for discussion first
- **Documentation:** Improve it via PR

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Built by BrandCast Digital Signage** - Production-tested agent benchmarking

*Last updated: November 9, 2025*
