# Content Quality Agent - Example Benchmark

**Purpose:** Validate blog posts, documentation, and marketing content before publishing

**Pass threshold:** 80/100

**Real-world use:** This benchmark is based on a production agent used at BrandCast to validate blog posts before publishing to news.brandcast.app. Sanitized for general use.

---

## What This Agent Does

The content-quality agent validates written content by checking:
- **Frontmatter/metadata** (required fields, formats)
- **Content integrity** (citations for statistics, source links)
- **Structure** (headers, length, formatting)
- **Resources** (images, links)
- **Publishing readiness** (complete, error-free)

---

## Test Cases

### Test #01: Perfect Blog Post ✅
**File:** `01-perfect-post.md`
**Purpose:** Baseline test - agent must NOT flag valid content
**Expected:** ready_to_publish, score 100/100

**Critical:** Any false positives here = FAIL for entire benchmark

---

### Test #02: Missing Metadata ⚠️
**File:** `02-missing-metadata.md`
**Purpose:** Schema validation (required fields)
**Issues:**
- Missing `author` field
- Missing `description` field
- Wrong date format (MM/DD/YYYY instead of YYYY-MM-DD)

**Expected:** fix_required, detects all 3 issues

---

### Test #03: Broken Citations 📚
**File:** `03-broken-citations.md`
**Purpose:** Content integrity enforcement
**Issues:**
- 8+ statistics without source links
- Vague attributions ("experts say", "studies show")
- Claims about companies without verification

**Expected:** fix_required, flags all citation violations

---

### Test #04: Missing Hero Image 🖼️
**File:** `04-missing-image.md`
**Purpose:** Resource validation
**Issues:**
- Hero image file doesn't exist at specified path
- Otherwise valid content

**Expected:** fix_required, recommends generating or adding image

---

### Test #05: Multiple Format Errors ❌
**File:** `05-format-errors.md`
**Purpose:** Comprehensive issue detection
**Issues:**
- YAML syntax error (unquoted colon in title)
- Description too short (20 chars vs 120 minimum)
- No H1 header
- Very short content (~150 words vs 500 minimum)
- Weak call-to-action

**Expected:** fix_required, catches all 5 issues

---

## Running This Benchmark

```bash
# From repository root
/benchmark-agent content-quality-agent

# Or copy to your benchmarks directory
cp -r examples/content-quality-agent ~/.agent-benchmarks/
/benchmark-agent content-quality-agent
```

---

## Expected Results

| Test | Expected Score | Status | Key Validation |
|------|---------------|--------|----------------|
| #01 | 100/100 | ✅ Perfect | No false positives |
| #02 | 85-95/100 | ✅ Pass | Schema validation |
| #03 | 80-90/100 | ✅ Pass | Citation detection |
| #04 | 85-95/100 | ✅ Pass | Resource validation |
| #05 | 75-85/100 | ✅ Pass | Comprehensive |

**Expected average:** 85-95/100 (excellent)

---

## Customizing for Your Agent

This is a **generic example**. To adapt it for your specific content agent:

1. **Update frontmatter schema** - Replace example fields with yours
2. **Adjust citation rules** - Match your content integrity requirements
3. **Modify scoring rubric** - Weight categories based on priorities
4. **Add/remove tests** - Focus on your edge cases

---

## Scoring Breakdown

See [METRICS.md](METRICS.md) for complete rubric.

**Categories:**
- Metadata validation: 30 pts
- Content integrity: 25 pts
- Structure & format: 20 pts
- Resource validation: 15 pts
- Output quality: 10 pts

---

## Real-World Performance

At BrandCast, our content-publishing-specialist agent (which this example is based on):

**Baseline (v1):** 97.5/100 (sample of 2 tests)
- ✅ Perfect baseline - zero false positives
- ✅ Catches all build-breaking issues
- ⚠️ Minor gap: missing H1 header detection

**After calibration:** 100/100 (projected)
- Added explicit H1 header validation
- Maintains zero false positives
- Comprehensive issue coverage

---

## Learn More

- **[Test Creation Guide](../../docs/test-creation-guide.md)** - How we designed these tests
- **[Scoring Rubrics Guide](../../docs/scoring-rubrics.md)** - How to score fairly
- **[Full Documentation](../../docs/)** - Complete framework docs

---

**Built by BrandCast** - Production-tested agent benchmarking
