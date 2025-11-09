# Content Quality Agent - Scoring Rubric

**Version:** 1.0
**Pass threshold:** 80/100

---

## Total: 100 Points

### 1. Metadata Validation (30 points)

**Required Field Detection (15 points)**
- Correctly identifies missing required fields: **10 pts**
- Validates field formats (dates, etc.): **5 pts**

**Field Content Validation (15 points)**
- Description length validation (120-160 chars): **8 pts**
- Date format correct (YYYY-MM-DD): **4 pts**
- YAML syntax validation: **3 pts**

---

### 2. Content Integrity (25 points)

**Citation Detection (20 points)**
- Identifies statistics without source links: **12 pts**
- Flags vague attributions ("experts say"): **8 pts**

**Verification (5 points)**
- Checks company claims can be verified: **5 pts**

---

### 3. Structure & Format (20 points)

**Document Structure (12 points)**
- Detects missing H1 header: **6 pts**
- Validates header hierarchy: **3 pts**
- Checks overall organization: **3 pts**

**Content Quality (8 points)**
- Content length validation (500+ words): **5 pts**
- Call-to-action assessment: **3 pts**

---

### 4. Resource Validation (15 points)

**Image Checks (10 points)**
- Detects missing hero image: **7 pts**
- Validates image path format: **3 pts**

**Recommendation Quality (5 points)**
- Suggests appropriate fixes (generate/add image): **3 pts**
- Provides specific guidance: **2 pts**

---

### 5. Output Quality (10 points)

**Decision Accuracy (5 points)**
- Correct publish/fix decision: **5 pts**

**Message Clarity (5 points)**
- Clear, actionable issue descriptions: **3 pts**
- Appropriate prioritization: **2 pts**

---

## Penalties

### False Positives (-10 pts each, max -20)
Agent flags valid content as broken

### Missed Critical Issues (-15 pts each, max -30)
Agent fails to detect:
- YAML syntax errors (build-breaking)
- Missing required fields
- Content integrity violations

---

## Test-Specific Expectations

### Test #01: Perfect Post
**Expected:** 100/100
- **Critical:** NO false positives
- Agent must approve valid content
- Any issues flagged = FAIL

### Test #02: Missing Metadata
**Expected:** 85-95/100
- Detects missing fields
- Validates formats
- Correct decision: fix_required

### Test #03: Broken Citations
**Expected:** 80-90/100
- Identifies uncited statistics
- Flags vague attributions
- Recognizes content integrity issue

### Test #04: Missing Image
**Expected:** 85-95/100
- Detects missing resource
- Provides helpful recommendation
- Correct decision: fix_required

### Test #05: Format Errors
**Expected:** 75-85/100
- Detects YAML syntax error (CRITICAL)
- Catches all 5 issues
- Prioritizes correctly

---

## Pass/Fail Criteria

### ✅ PASS
- Average ≥ 80/100
- No false positives on Test #01
- All build-breaking issues detected

### ❌ FAIL
- Average < 80/100
- False positives on perfect content
- Missed YAML syntax errors
- Missed content integrity violations

---

**Created:** 2025-11-09
