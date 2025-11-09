# Code Review Agent - Example Benchmark

**Purpose:** Review TypeScript code for style violations, naming conventions, and best practices

**Pass threshold:** 80/100

**Real-world use:** Generic example for code review agents checking TypeScript style and conventions

---

## What This Agent Does

The code-review agent checks TypeScript code for:
- **Naming conventions** (camelCase, PascalCase, UPPER_CASE)
- **Import organization** (sorted, grouped by type)
- **Type annotations** (explicit types, no implicit any)
- **Code formatting** (spacing, indentation)
- **Best practices** (const vs let, function structure)

---

## Test Cases

### Test #01: Perfect TypeScript Code ✅
**File:** `01-perfect-code.ts`
**Purpose:** Baseline - agent must NOT flag clean code
**Expected:** No violations found, score 100/100

---

### Test #02: Naming Violations ⚠️
**File:** `02-naming-violations.ts`
**Issues:**
- Variables using snake_case instead of camelCase
- Class using camelCase instead of PascalCase
- Constants not using UPPER_CASE

**Expected:** Flags all naming violations

---

### Test #03: Import Organization 📦
**File:** `03-import-issues.ts`
**Issues:**
- Imports not sorted
- Third-party and local imports mixed
- Missing grouping

**Expected:** Detects disorganized imports

---

### Test #04: Type Annotation Issues 🏷️
**File:** `04-type-issues.ts`
**Issues:**
- Missing return type annotations
- Implicit any types
- Weak type definitions

**Expected:** Flags type annotation problems

---

### Test #05: Multiple Violations ❌
**File:** `05-multiple-violations.ts`
**Issues:**
- Naming + imports + types + formatting
- 5+ different violation types

**Expected:** Comprehensive detection

---

## Running This Benchmark

```bash
/benchmark-agent code-review-agent
```

---

## Expected Results

| Test | Expected Score | Key Validation |
|------|---------------|----------------|
| #01 | 100/100 | No false positives |
| #02 | 85-95/100 | Naming detection |
| #03 | 85-95/100 | Import organization |
| #04 | 80-90/100 | Type annotations |
| #05 | 75-85/100 | Comprehensive |

**Expected average:** 85-90/100

---

## Customizing for Your Agent

Adapt this for your code review needs:

1. **Change language** - Replace TypeScript with Python, Java, etc.
2. **Adjust rules** - Match your team's style guide
3. **Add checks** - Security patterns, performance, documentation
4. **Weight categories** - Prioritize what matters most

---

## Learn More

- **[Test Creation Guide](../../docs/test-creation-guide.md)**
- **[Full Documentation](../../docs/)**

---

**Built by BrandCast** - Production-tested agent benchmarking
