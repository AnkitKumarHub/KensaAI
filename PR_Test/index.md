# Short-term features for developers

Prioritized list of useful near-term additions for Kensa. Focus: ship value for individual devs in weeks, not months. Build on what already exists (GitHub App, PR webhooks, AI review comment, opt-in repo sync, dashboard, usage limits).

---

## P0 — Ship first (high developer value, fits current architecture)

1. **Inline review comments on changed lines**  
   Post findings as GitHub review comments on specific files/lines, not only one conversation comment. Devs act faster when the bug is next to the diff.

2. **Re-run / request review from the dashboard**  
   Button to re-trigger AI review on an existing PR (failed jobs, new context after sync, “look again”). Avoids closing/reopening PRs or force-pushing.

3. **Auto-sync after install (or on schedule)**  
   Today sync is manual. Index the repo on connect (or nightly) so the first PR already has codebase context.

4. **GitHub App uninstall cleanup**  
   When the app is uninstalled, remove/soft-delete installation + related data. Stops stale webhooks, ghost repos, and billing confusion. (Already noted as a TODO.)

5. **Clearer review status + failure reasons**  
   Surface `pending | processing | reviewed | rate_limited | failed` with a short error message (Inngest down, model error, empty diff). Devs shouldn’t stare at “processing” forever.

---

## P1 — High leverage next

6. **Path / file filters**  
   Ignore lockfiles, generated code, docs-only PRs, or `*.min.js`. Cuts noise and wasted review quota.

7. **Per-repo review guidelines**  
   Short custom prompt (“we use Zod”, “no `any`”, “prefer server actions”). Makes reviews feel team-aware without full Team plan complexity.

8. **Severity labels + summary checklist**  
   Tag each finding `blocker | suggestion | nit` and pin a top checklist on the PR. Helps authors triage before merging.

9. **Usage alerts**  
   Email or dashboard banner when Hobby quota is almost gone. Prevents surprise `rate_limited` mid-sprint.

10. **Ignore / mute rules**  
    “Don’t flag this pattern again on this repo” or dismiss a finding type. Reduces repeat nits that train people to ignore the bot.

---

## P2 — Nice short-term wins

11. **PR size gate**  
    Soft warning or skip AI on huge diffs (“too large — sync context first / split the PR”). Protects quality and cost.

12. **Draft PR policy**  
    Option: review only ready-for-review PRs, or also drafts. Matches how many teams work.

13. **Dashboard filters & search**  
    Filter PRs by repo, status, author, date. Painful once you have more than a handful of reviews.

14. **Copy / export review**  
    One-click copy markdown or download for sharing outside GitHub.

15. **Webhook / Inngest health check in Settings**  
    Small “queue connected” indicator so local/prod misconfig (`ECONNREFUSED`) is obvious before the next PR fails.

---

## Later (roadmap — keep out of short-term unless demanded)

- Agent-authored fix PRs / autofix commits  
- Team review queue / kanban board  
- Dependency advisory scanning  
- SSO / org controls / self-host  
- Multi-model choice  

These are valuable but larger than a short sprint; the marketing site already lists the first three as roadmap.

---

## Suggested order for the next 2–3 weeks

| Week | Focus |
|------|--------|
| 1 | P0 #4 uninstall cleanup, P0 #5 status/errors, P0 #2 re-run review |
| 2 | P0 #3 auto-sync (or scheduled), P1 #6 path filters |
| 3 | P0 #1 inline comments (MVP: top N findings only) |

Inline comments (#1) are the biggest UX upgrade but need careful GitHub Review API work — start with a thin MVP after reliability (re-run, errors, uninstall) is solid.
