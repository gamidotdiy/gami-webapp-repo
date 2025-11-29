# Gami Agent Dashboard

This project is a Next.js 15 application that powers the Supervisor, Quest, Economy and Security agent dashboards for the Gami Protocol. It now ships with Firebase Authentication for email/password, Google, and GitHub login flows plus a built-in fake email generator for quickly testing sign-up.

## Prerequisites

1. **Firebase project** with Authentication enabled and the following providers turned on:
   - Email/Password
   - Google
   - GitHub (add your OAuth Client ID/Secret in the Firebase console)
2. A `.env.local` file at the repo root containing your client keys:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="..."
NEXT_PUBLIC_FIREBASE_PROJECT_ID="..."
NEXT_PUBLIC_FIREBASE_APP_ID="..."
# Optional: overrides the MCP backend SSE endpoint used for live agent telemetry
NEXT_PUBLIC_AGENT_STREAM_URL="http://localhost:9000/api/stream"
```

All values are available from **Project settings → General** in the Firebase console. The GitHub provider must allow the domain listed in `authDomain`.

## Running locally

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Use the **Start Building** button or go directly to `/signup` to provision a new agent. After authentication you will be routed to `/agents`.

## Seeing live @Gami_Agents telemetry

1. Boot the MCP stack in `../gami-protocol-mcp` (`docker compose up` or `uvicorn backend.main:app --reload`).
2. Ensure the backend exposes `http://localhost:9000/api/stream` (or set `NEXT_PUBLIC_AGENT_STREAM_URL` to whichever host/port you use).
3. Sign in at `/login`. The dashboard now blocks unauthenticated access and shows the live Quest/Economy/Security/Rewards agents as soon as telemetry arrives (Rewards listens for `rewards.*` SSE payloads).

## Designing Rewards & Badges

1. Navigate to `/agents/rewards`.
2. Use the **Badge System** editor to rename tiers, adjust XP thresholds, gradients, and emoji/SVG icons.
3. Copy the generated `<script ... data-gami-rewards='{}'>` snippet and paste it into any storefront—events are streamed via the same SSE URL so badge issues instantly show up both on the site and inside the "Live Badge Issuance" panel.
4. Tune XP per dollar + accent colors under **Brand Controls**; the JSON payload updates automatically.

## Production deployment checklist

1. Set Firebase + agent environment variables (`NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_AGENT_STREAM_URL`, optional `SENTRY_DSN`, etc.).
2. Run `npm run build` to produce an optimized Next.js bundle, then `npm run start` (or deploy via Vercel, Fly.io, Render, etc.).
3. Point `NEXT_PUBLIC_AGENT_STREAM_URL` at the public MCP/SSE endpoint (e.g., `https://mcp.yourbrand.com/api/stream`).
4. Update `AuthProvider` service account in Firebase so demo/test signups are sandboxed from production tenants.

## Shopify plug-in steps (example)

1. In Shopify Admin, open **Online Store → Themes → Edit code**.
2. Paste the snippet generated under `/agents/integrations` (or the example below) into `layout/theme.liquid` right before `</body>`:

   ```liquid
   <script src="https://cdn.gami.xyz/plugin.js"
           data-gami-config='{"brand":"Acme","platform":"Shopify","domain":"shop.acme.io","plugin":"rewards","rewards_api":"https://api.acme.io/rewards","sse":"https://mcp.acme.io/api/stream"}'
           async></script>
   ```

3. (Optional) Create a Shopify app block that renders the Universal Wallet iframe and drop it into the product/customer templates to let shoppers view quests + badges inline.
4. Test by creating a purchase or XP webhook; verify the event appears under **Live Agent Activity** and the storefront widget.

## Demo accounts for client walkthroughs

- Use `/signup` and click **Test Sign-Up** to generate a sandbox Firebase user (email password pair is shown immediately and auto-signs you in).
- Alternatively keep a curated demo user in Firebase and share credentials with stakeholders; the dashboard enforces authentication via `AuthProvider` and you can sign out using the header button.

## Testing sign-up quickly

1. Navigate to `/signup`.
2. Click **Test Sign-Up**. The app will create a throwaway email such as `agent.tester+TIMESTAMP@example.com` in Firebase Auth and immediately sign you in.
3. The generated credentials are shown in the UI so you can copy/paste them into `/login` if you want to re-test.

## Preparing a clean repo for GitHub

Use this checklist whenever you need to publish the dashboard to a fresh repository:

1. **Remove build/cache artifacts** so the tree is reproducible:

   ```bash
   rm -rf .next node_modules
   git clean -fdX
   ```

2. **Copy environment templates** and leave actual secrets out of git:

   ```bash
   cp .env.local .env.example  # keep only placeholder values in the copy
   ```

3. **Reset git metadata** if you want to export into a brand‑new repo:

   ```bash
   rm -rf .git
   git init -b main
   ```

4. **Commit the clean working tree**:

   ```bash
   npm install
   npm run lint
   git add .
   git commit -m "chore: bootstrap gami agent dashboard"
   ```

5. **Create the GitHub remote and push**:

   ```bash
   gh repo create gami-agent-dashboard --public --source=. --remote=origin
   git push -u origin main
   ```

> Don’t forget to recreate `.env.local` locally after the push so your Firebase keys stay available for development.

## Available scripts

| Script        | Description                          |
| ------------- | ------------------------------------ |
| `npm run dev` | Start the Next.js dev server         |
| `npm run build` | Build for production               |
| `npm run start` | Run the production build          |
| `npm run lint` | Run Next.js lint (creates config on first run) |

> **Note:** `npm run lint` will prompt you the first time so choose a configuration (e.g., "Strict") to let Next.js scaffold the ESLint file.
