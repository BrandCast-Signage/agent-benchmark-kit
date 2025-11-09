# Code Review Agent - Scoring Rubric

**Version:** 1.0
**Pass threshold:** 80/100

---

## Total: 100 Points

### 1. Naming Convention Detection (25 points)

**Constant Naming (8 points)**
- Detects constants using wrong case (snake_case vs UPPER_CASE): **5 pts**
- Provides correct naming guidance: **3 pts**

**Class/Interface/Type Naming (8 points)**
- Detects PascalCase violations (camelCase or snake_case): **5 pts**
- Identifies all class, interface, and type naming issues: **3 pts**

**Method/Variable/Function Naming (9 points)**
- Detects camelCase violations (snake_case): **6 pts**
- Catches violations across methods, variables, parameters: **3 pts**

---

### 2. Import Organization (20 points)

**Grouping Detection (12 points)**
- Identifies lack of import grouping: **7 pts**
- Recognizes built-in, third-party, local should be separated: **5 pts**

**Sorting Detection (8 points)**
- Detects unsorted imports within groups: **5 pts**
- Suggests alphabetical sorting: **3 pts**

---

### 3. Type Annotation Validation (25 points)

**Return Type Detection (12 points)**
- Identifies missing return type annotations: **8 pts**
- Flags all methods/functions without return types: **4 pts**

**Parameter Type Detection (8 points)**
- Identifies missing parameter types: **5 pts**
- Catches implicit 'any' from missing annotations: **3 pts**

**'Any' Type Usage (5 points)**
- Flags explicit 'any' usage: **3 pts**
- Suggests specific types instead: **2 pts**

---

### 4. Code Formatting & Structure (15 points)

**Spacing & Consistency (8 points)**
- Detects inconsistent spacing: **5 pts**
- Identifies compressed/single-line code: **3 pts**

**Structural Issues (7 points)**
- Catches formatting violations: **4 pts**
- Provides formatting guidance: **3 pts**

---

### 5. Best Practices (15 points)

**Variable Declaration (8 points)**
- Flags 'var' usage (should use const/let): **5 pts**
- Identifies 'let' used for constants: **3 pts**

**Code Quality (7 points)**
- Detects missing readonly modifiers: **3 pts**
- Identifies type assertion without validation: **2 pts**
- General best practice violations: **2 pts**

---

## Penalties

### False Positives (-15 pts each, max -30)
Agent flags valid code as violating style guide

### Missed Critical Violations (-10 pts each, max -30)
Agent fails to detect:
- Naming convention violations (any category)
- Missing type annotations
- Disorganized imports
- Use of 'var' or 'any'

---

## Test-Specific Expectations

### Test #01: Perfect Code
**Expected:** 100/100
- **Critical:** NO false positives
- Agent must approve valid code
- Any issues flagged = FAIL

### Test #02: Naming Violations
**Expected:** 85-95/100
- Detects snake_case in multiple contexts
- Identifies class/interface/type PascalCase violations
- Provides renaming guidance
- Correct decision: fix_required

### Test #03: Import Issues
**Expected:** 85-95/100
- Identifies lack of grouping
- Detects unsorted imports
- Recognizes built-in should come first
- Suggests 'import type' for type-only imports
- Correct decision: fix_required

### Test #04: Type Issues
**Expected:** 80-90/100
- Identifies missing return types (multiple)
- Flags missing parameter types (multiple)
- Detects 'any' usage
- Recognizes implicit 'any' from missing annotations
- Correct decision: fix_required

### Test #05: Multiple Violations
**Expected:** 75-85/100
- Detects violations in ALL 5 categories
- Naming + Imports + Types + Formatting + Practices
- Recognizes comprehensive quality issues
- Prioritizes fixes appropriately
- Correct decision: major_refactor_required

---

## Pass/Fail Criteria

### ✅ PASS
- Average ≥ 80/100
- No false positives on Test #01
- Detects violations across all categories
- Provides actionable guidance

### ❌ FAIL
- Average < 80/100
- False positives on perfect code
- Misses entire violation categories
- Approves code with critical issues
- Vague or missing guidance

---

## Scoring Philosophy

**This rubric prioritizes:**

1. **No false positives** - Never flag valid code (Test #01 is critical)
2. **Pattern recognition** - Detect violation types, not just count
3. **Comprehensive coverage** - All 5 categories matter
4. **Actionable guidance** - Specific fixes, not vague suggestions
5. **Appropriate severity** - Critical vs. nice-to-have

**Scoring is objective:**
- Did agent detect the violation category? YES/NO
- Did agent provide specific guidance? YES/NO
- Was decision correct (approve vs. fix)? YES/NO

---

**Created:** 2025-11-09
