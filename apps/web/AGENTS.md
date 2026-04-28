# Qasid Apps — agent context

## Project overview

- **What it is:** Turborepo monorepo for Shamna, a Syrian classified marketplace. Node 22.x, pnpm, TypeScript.
- **Layout:** Deployable apps in `apps/` (e.g. `web`, `api`, `mobile`). Shared libraries in `packages/` (`ui`, `eslint-config`, `typescript-config`). Root has `turbo.json`, shared devDependencies, and workspace config.
- **Boundaries:** Code under `apps/<name>/` belongs to that app. Shared code lives in `packages/`. Add dependencies at app or package level when possible; root only for shared dev tooling.
- **Env:** Build-time env vars are listed in `turbo.json` under `tasks.build.env`. Use `.env.local` per app for secrets; do not commit secrets.

---

## Boundaries (AI coding agent)

- **Always:** Read `DESIGN.md` when present (repo or app). If instructions or context are unclear, ask before proceeding.
- **Ask first:** Database or schema migrations; deleting files or directories; changing env vars or adding new ones; adding new packages or dependencies. Confirm with the user before executing.
- **Never:** Run destructive commands (e.g. `rm -rf`, `DROP TABLE`, `TRUNCATE`) without explicit approval. Do not commit or push without user approval. Do not expose secrets in code, logs, or responses.

---

## Build and test commands

**From repo root:**

| Command | Description |
|--------|-------------|
| `pnpm build` / `turbo build` | Build all apps and packages (respects dependency order). |
| `turbo build --filter=<app-name>` | Build one app (e.g. `--filter=web`, `--filter=sis`). |
| `pnpm dev` / `turbo dev` | Run all dev servers (cache off, persistent). |
| `turbo dev --filter=<app-name>` | Run dev for one app. |
| `pnpm lint` / `turbo run lint` | Lint all apps/packages. |
| `pnpm check-types` / `turbo run check-types` | Type-check all (where defined). |
| `pnpm format` | Format with Prettier (`**/*.{ts,tsx,md}`). |

**Tests are app-specific.** No global `test` task in Turbo. Run tests from the app directory or use the app’s scripts (e.g. `pnpm --filter sis test`). See **Testing instructions** below and each app’s `AGENTS.md` or `package.json` scripts.

---

## Code style guidelines

- **Language:** TypeScript for all new code. No new JavaScript except where required (e.g. legacy or config).
- **Package manager:** pnpm only. Do not add `package-lock.json` or `yarn.lock`.
- **Types:** Prefer explicit types for function parameters and return values when not obvious. Use `interface` for object shapes, `type` for unions/intersections. Avoid `any`; use `unknown` and narrow or proper types.
- **Error handling:** Prefer typed errors or Result-like shapes. When catching, log and rethrow with context (e.g. operation name, identifiers).
- **Imports:** Use path aliases defined in the app/package (e.g. `@/components`). Prefer named imports.
- **React/TSX:** Functional components only; named exports for components. Extract reusable logic into custom hooks (`use*`). Use react-hook-form + zod (or the app’s existing validation) for forms. Use the app’s existing design system and `components/ui` before adding new UI libraries. Keep accessibility in mind (semantic HTML, labels, ARIA).
- **Formatting:** Prettier for `**/*.{ts,tsx,md}`. ESLint via shared config; run `next lint` (or app equivalent) for Next.js apps. Styling: Tailwind and/or app-specific patterns; colocate styles with components when not shared.

Detailed rules live in `.vscode/rules/` and `.claude/rules/`.

---

## Testing instructions

- **No repo-wide test script.** Each app defines its own `test` (and related) scripts in `package.json`. Use `pnpm --filter <app-name> test` or run scripts from inside the app directory.
- **Frameworks in use:** Vitest (unit/component in some apps, e.g. `sis`), Playwright (e2e or API tests; root and/or app-level config). Some apps have no test script.
- **Root Playwright:** Root has `play`, `playtrace`, `playcli`, `playreport` for running Playwright from root when applicable.
- **Before making changes:** Run the app’s lint and type-check (`lint`, `check-types`). For apps with tests, run the app’s test script before committing. For full pre-deploy checks, use the app’s script if it exists (e.g. `sis`: `test:pre-deploy`).
- **App-specific testing:** See `apps/<name>/AGENTS.md` for that app’s test commands and expectations (e.g. Vitest vs Playwright, coverage, e2e).

---

## Security considerations

- **Secrets:** Never commit secrets, API keys, or credentials. Use env vars (e.g. `turbo.json` `tasks.build.env` for build-time; `.env.local` per app). Do not log or expose secrets in client bundles or error messages.
- **Input and output:** Validate and sanitize user input. Use the app’s validation (e.g. Zod, Joi) for API payloads and forms. Avoid raw user input in queries, HTML, or redirects (injection, XSS).
- **Auth and APIs:** Follow existing auth patterns (e.g. Kinde, JWT) and do not bypass auth checks. For API apps, enforce auth and authorization on sensitive routes; validate tokens and scope.
- **Dependencies:** Prefer minimal dependency surface. Keep dependencies updated; address known vulnerabilities. Use lockfiles (pnpm-lock.yaml) and audit when adding or updating packages.
- **App-specific security:** API, payments, and other sensitive apps may have additional requirements (e.g. PCI-related, rate limiting, audit logging). See `apps/<name>/AGENTS.md` where applicable.
