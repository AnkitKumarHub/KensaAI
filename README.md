# Kensa

**See deeper. Ship safer.**

Kensa is an AI assistant that reviews code changes before they merge. It connects to GitHub, reads the change and relevant parts of the repository, then leaves structured feedback on the pull request (like a teammate commenting). Engineers stay in GitHub. They do not babysit another dashboard for every review.

**Live site:** [https://kensa.ankithub.me](https://kensa.ankithub.me)


---

## In simple terms

| Question | Plain answer |
| --- | --- |
| What does it do? | Automatically reviews code changes and posts structured feedback on GitHub. |
| Who uses it? | Engineering teams that want consistent reviews on every change. |
| Does it replace people? | No. It catches common issues and speeds up review. Humans still decide what ships. |
| How do teams start? | Install the GitHub App, pick repositories, open or update a pull request. Kensa comments when the review is ready. |

**Plans:** free Hobby for individuals, paid Pro, and a Team option for orgs that need something custom.

**Honest limits today:** one structured comment on the pull request conversation (not per-line threads yet), suggestions without auto-committing fixes, and repository-wide context only when you opt in to sync.

---

## How it works

1. **Understand** – Learns context from the repository, not only the lines changed.
2. **Review** – Checks correctness, security, performance, and related areas, then posts one clear comment on GitHub.
3. **Track** – Keeps review status and history in the Kensa dashboard.
4. **Security** – Surfaces security-related findings alongside reviews.

---

## For developers

**Stack:** Next.js, TypeScript, Prisma, PostgreSQL, GitHub App, Better Auth, Inngest (background jobs), OpenRouter (AI), Pinecone (repo context), Razorpay (billing).

### Prerequisites

- Node.js and [pnpm](https://pnpm.io)
- A PostgreSQL database
- Environment variables for the services below (there is no `.env.example` in the repo yet)

**Env categories used in this codebase:**

| Area | Variables |
| --- | --- |
| Database | `DATABASE_URL` |
| GitHub OAuth (sign-in) | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |
| GitHub App (reviews) | `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_WEBHOOK_SECRET` |
| AI | `OPENROUTER_API_KEY` |
| Repo context | `PINECONE_API_KEY`, `PINECONE_INDEX` |
| Billing | `NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID`, `RAZORPAY_TEST_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `RAZORPAY_PLAN_ID_INDIVIDUAL` |

Also configure whatever your local Better Auth / Inngest setup expects for cookies and job runners.

### Run locally

```bash
pnpm install
pnpm exec prisma migrate dev
pnpm exec prisma generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

---

## Contact

Questions or Team plan interest: [mailtoankitkumar01@gmail.com](mailto:mailtoankitkumar01@gmail.com)

---

