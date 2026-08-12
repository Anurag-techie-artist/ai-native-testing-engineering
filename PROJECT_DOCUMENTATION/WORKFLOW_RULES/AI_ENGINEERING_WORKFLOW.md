# AI Engineering Workflow & Workspace Operating Rules

This document defines the persistent operating rules, scope-control standards, and step-by-step engineering workflow for the **Frugal Testing AI-Native Software Engineer Intern assignment** workspace.

---

## 1. Core Engineering Workflow Cycle

All engineering work must strictly follow this sequential cycle:

```text
UNDERSTAND
   ↓
DEFINE REQUIREMENTS (PRD / Design Brief)
   ↓
PLAN
   ↓
IMPLEMENT
   ↓
TEST
   ↓
COMPARE EXPECTED vs ACTUAL
   ↓
DEBUG
   ↓
VERIFY
   ↓
REFACTOR / CLEAN UP
   ↓
REGRESSION TEST
   ↓
DOCUMENT
   ↓
CLEAN GIT COMMIT
```

Never skip verification simply because an implementation appears to work visually or conceptually.

---

## 2. Mandatory Prompt History Rules & Classification

Prompt history is a core submission-evidence requirement. Prompt records are classified into distinct historical files:

- **Workspace-Level Prompts**: Record global setup, workflow rules, agent instructions, and workspace architecture prompts in:
  `PROJECT_DOCUMENTATION/PROMPTS/WORKSPACE_Prompt_History.md`
- **Q1-Specific Prompts**: Record prompts strictly belonging to Question 1 in:
  `Q1_Dynamic_Canvas_WebSocket/prompts/Q1_Prompt_History.md`
- **Q2-Specific Prompts**: Record prompts strictly belonging to Question 2 in:
  `Q2_Cryptographic_Replay_API/prompts/Q2_Prompt_History.md`
- **Q3-Specific Prompts**: Record prompts strictly belonging to Question 3 in:
  `Q3_ShadowDOM_Accessibility/prompts/Q3_Prompt_History.md`

### Core Rules for Prompt History:
1. **Exact Text Preservation**: Never paraphrase, edit, or summarize user prompts.
2. **Chronological Order**: Number prompts sequentially (`Prompt 001`, `Prompt 002`, ...).
3. **No Deletions or Overwrites**: Append new prompt entries; never overwrite previous entries.
4. **Complete Coverage**: Record prompts for implementation, debugging, refinement, verification, testing, and prompts that yield no code changes.
5. **Strict Context Isolation**: Never duplicate global workspace prompts into question-specific history files.

---

## 3. Strict Scope-Lock Rule

The guiding principle of this workspace is:

> **Implement exactly what the assignment asks for — nothing more, nothing less.**

- **No Feature Creep**: Do not add extra features, decorative UI elements, unrequested APIs, or unnecessary architectural complexity.
- **No Premature Work**: Do not work on Q2/Q3 while implementing Q1.
- **Compliance First**: Do not optimize for "impressiveness" over exact assignment compliance.
- **Ambiguity Resolution**: If a requirement is ambiguous, identify the ambiguity and ask for clarification rather than inventing additional scope.

---

## 4. Requirement & Design Versioning

- **PRD (`PRD_vX.Y.md`)**: Authoritative specification of **WHAT** must be built.
- **Design Brief (`DESIGN_BRIEF_vX.Y.md`)**: Authoritative specification of **HOW** the solution is designed.
- **Versioning**: Increment versions on material changes and record all changes in `CHANGE_HISTORY.md`. Never overwrite historical versions.

---

## 5. Expected vs Actual Debugging Discipline

Maintain `PROJECT_DOCUMENTATION/IMPLEMENTATION_DEBUG/EXPECTED_VS_ACTUAL.md` for all non-trivial debugging tasks.

Structure for each issue:
- **Expected Behavior**
- **Actual Behavior**
- **Difference & Root Cause**
- **Fix Applied**
- **Verification Method & Status**

Do not invent artificial issues; only record genuine technical discrepancies.

---

## 6. Safe Refactoring & Dead Code Cleanup

Follow the refactoring lifecycle:
`IMPLEMENT -> TEST -> VERIFY -> IDENTIFY DEAD CODE / STRUCTURAL ISSUES -> REFACTOR -> RE-TEST -> VERIFY NO REGRESSION`

Record non-cosmetic cleanup in `PROJECT_DOCUMENTATION/REFACTOR/DEAD_CODE_CLEANUP.md`. Never remove code without verifying dependency chains.

---

## 7. Conventional Git Commit Discipline

Commit messages must be clear, conventional, and meaningful:
- `feat(qx): ...`
- `fix(qx): ...`
- `test(qx): ...`
- `refactor(qx): ...`
- `docs: ...`

Avoid generic messages (`update`, `fixed`, `working`, `final`). Record commits in `PROJECT_DOCUMENTATION/GIT/COMMIT_HISTORY.md`.

---

## 8. Empirical Evidence Rule

Never declare an acceptance criterion as passed without concrete, reproducible evidence (test output, execution logs, screenshot/video, terminal output). Never fabricate or manipulate test results.

---

## 9. Deliverables vs Internal Documentation

Maintain clear separation between internal engineering records (`PROJECT_DOCUMENTATION/`) and final deliverable artifacts (`FINAL_SUBMISSION/` & `Qx/source/`). Internal docs are not blindly dumped into final submission links unless explicitly requested.
