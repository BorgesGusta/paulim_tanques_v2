# Hero Shell Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the hero copy and form with the landing page's centered desktop shell while preserving full-bleed backgrounds.

**Architecture:** Keep `Hero` as a single responsive component. The outer section remains full-width, while the inner grid receives the desktop shell constraints; the image layer extends left beyond that shell.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vitest, Testing Library.

---

### Task 1: Align the hero shell

**Files:**
- Modify: `src/App.test.tsx`
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Write the failing layout test**

Render the application, select the direct grid child of `#inicio`, and assert
that it contains `lg:mx-auto`, `lg:w-full`, `lg:max-w-7xl`, and `lg:px-12`.

- [ ] **Step 2: Verify the test fails**

Run:

```powershell
npm run test:run -- src/App.test.tsx
```

Expected: FAIL because the current hero grid is full-width and lacks the shared
desktop shell classes.

- [ ] **Step 3: Implement the centered grid**

Update the hero grid to use the shared desktop width, margin, and padding.
Remove the nested `section-shell` from the copy column to avoid double padding.
Extend the image and overlay left with `w-screen max-w-none`, anchored to the
right edge of the left column.

- [ ] **Step 4: Verify the implementation**

Run:

```powershell
npm run test:run -- src/App.test.tsx
npm run lint
npm run build
```

Expected: all commands exit with code `0`.

- [ ] **Step 5: Verify rendered widths**

Check `320px`, `375px`, and desktop viewports. Confirm no horizontal overflow
and confirm the desktop grid uses `48px` horizontal padding with automatic
outer margins.
