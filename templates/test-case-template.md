# Test Case Template

**Agent:** [agent-name]
**Test ID:** test-[NN]
**Test Name:** [Descriptive name]
**Purpose:** [What this test validates]

---

## Test Content

[Insert actual test content here - format depends on agent type]

**For content/document agents:**
```markdown
---
[frontmatter if applicable]
---

# Actual content here
...
```

**For code review agents:**
```typescript
// Code to be reviewed
...
```

**For data validation agents:**
```json
{
  "data": "to validate"
}
```

---

## Expected Behavior

**Agent should:**
- [Specific behavior 1]
- [Specific behavior 2]
- [Specific behavior 3]

**Agent should NOT:**
- [False positive to avoid]
- [Incorrect behavior to prevent]

---

## Notes

- **Difficulty level:** [Easy/Medium/Hard]
- **Primary focus:** [What aspect this tests most]
- **Edge cases tested:** [Any unusual scenarios]
- **Real-world scenario:** [Actual use case this represents]

---

**Created:** [Date]
**Last modified:** [Date]
