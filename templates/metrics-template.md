# [Agent Name] - Scoring Rubric

**Version:** 1.0
**Created:** [Date]
**Pass threshold:** 80/100

---

## Overview

This rubric defines how to score the `[agent-name]` agent objectively and consistently.

**Total points:** 100
**Categories:** [N] major categories
**Scoring approach:** Achievement-based (award points for correct behavior)

---

## Scoring Categories

### 1. [Category Name] (XX points)

**Purpose:** [What this category validates]

#### [Specific Check A] (YY points)

**What to check:**
- [Specific validation criterion]
- [What correct behavior looks like]

**Point allocation:**
- Full points (YY): [When to award full points]
- Partial credit (YY/2): [When to award partial]
- No points (0): [When to award nothing]

**Examples:**
- ✅ **Full points:** Agent detected missing meta description and provided specific fix
- ⚠️ **Partial:** Agent detected issue but recommendation was vague
- ❌ **No points:** Agent missed the issue entirely

---

#### [Specific Check B] (ZZ points)

[Repeat structure above]

---

### 2. [Category Name] (XX points)

[Continue for each major category]

---

### 3. [Category Name] (XX points)

---

### 4. [Category Name] (XX points)

---

### 5. Output Quality (10 points)

**Purpose:** Evaluate overall output quality and usability

#### Decision Accuracy (5 points)

**Criteria:**
- ✅ Decision matches ground truth expectation exactly
- ⚠️ Decision is close but not exact (e.g., "flag" vs. "cannot_publish")
- ❌ Decision is completely wrong

**Point allocation:**
- 5 pts: Correct decision
- 2-3 pts: Close decision (acceptable interpretation)
- 0 pts: Wrong decision

---

#### Message Clarity (5 points)

**Criteria:**
- Clear, specific issue descriptions
- Actionable recommendations
- Appropriate prioritization
- Professional tone

**Point allocation:**
- 5 pts: Excellent clarity, very helpful
- 3-4 pts: Good clarity, mostly helpful
- 1-2 pts: Somewhat unclear or vague
- 0 pts: Confusing or unhelpful

---

## Penalty Deductions

### False Positives (-5 to -10 pts each)

**Definition:** Agent flagged valid content as broken

**Why penalized:** Erodes trust, blocks valid work

**Deduction:**
- 1 false positive: -5 pts
- 2-3 false positives: -10 pts
- 4+ false positives: -15 pts (max)

---

### Missed Critical Issues (-10 to -20 pts each)

**Definition:** Agent failed to detect showstopper problems

**Why penalized:** Could cause production failures

**Deduction:**
- Missed 1 critical issue: -10 pts
- Missed 2 critical issues: -20 pts
- Missed 3+ critical issues: -30 pts (max)

---

## Test-Specific Expectations

### Test #01: [Name]

**Expected score:** 100/100

**Critical success criteria:**
- No false positives (must score 100)
- Agent approves valid content
- No incorrect flags

**Common pitfalls:**
- [What agents often get wrong]

---

### Test #02: [Name]

**Expected score:** 85-95/100

**Critical success criteria:**
- Detects [specific issue]
- Provides actionable fix
- Correct decision

**Scoring focus:**
- [What matters most for this test]

---

### Test #03: [Name]

**Expected score:** 80-90/100

[Continue for each test]

---

### Test #04: [Name]

---

### Test #05: [Name]

---

## Pass/Fail Criteria

### ✅ PASS

**Requirements:**
- Average score ≥ 80/100 across all tests
- No false positives on Test #01 (perfect case)
- All critical issues detected
- No automatic fail conditions

---

### ❌ FAIL

**Automatic fail conditions:**
1. Average score < 80/100
2. False positives on Test #01 (blocks valid content)
3. Missed showstopper issues (build-breaking, data loss, security)
4. Fundamentally incorrect behavior

---

## Scoring Principles

### Principle 1: Be Objective

**Compare to ground truth, not opinion**

❌ Wrong: "This seems like a good recommendation to me"
✅ Right: "Ground truth expects this recommendation, agent provided it"

---

### Principle 2: Credit Partial Success

**Award points for what was done correctly**

Don't give all-or-nothing scores unless rubric specifies it.

Example:
- Expected: Detect 5 issues
- Detected: 4 issues
- Score: 80% of category points

---

### Principle 3: Proportional Penalties

**Distinguish critical vs. minor issues**

Critical issue (build-breaking): -10 to -20 pts
Medium issue (optimization): -3 to -5 pts
Minor issue (style): -1 to -2 pts

---

### Principle 4: Consistency

**Same behavior = same score every time**

Apply rubric uniformly across all test runs.

---

## Example Scoring

### Test #02 Example

**Agent output:**
```
Decision: FIX_REQUIRED

Issues found:
- Missing meta description (CRITICAL)
- Content length: 450 words (should be 500+)

Recommendations:
- Add meta description (120-160 chars)
- Expand content by 50+ words
```

**Scoring:**

**Category 1: [Name] (30 pts)**
- Detected missing meta: 15/15 ✓
- Validated length: 13/15 (detected but slightly harsh on 450 words)
- **Subtotal: 28/30**

**Category 2: [Name] (25 pts)**
- [Score based on other criteria]
- **Subtotal: 22/25**

[Continue for all categories]

**Total: 85/100 ✅**

**Judge notes:**
"Strong performance. Detected all critical issues. Minor: Could be less harsh on 450-word content (borderline case)."

---

## Revision History

**v1.0 (2025-11-09):**
- Initial rubric created
- 5 categories defined
- Pass threshold set at 80/100

---

**Template notes:**
- Customize categories for your specific agent
- Adjust point allocation based on what matters most
- Add agent-specific penalties as needed
- Keep total = 100 points

**Questions?** See [Scoring Rubrics Guide](../docs/scoring-rubrics.md)
