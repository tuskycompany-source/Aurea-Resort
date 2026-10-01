# Auréa Resort
French/English resort website with seven room types, spa/tour/activity extras, guest accounts and a separate administrator dashboard.

## Hosting
- Render: static Next.js export (`pnpm build`, publish `out`).
- Supabase project: `rcvxgzzkvywznpnydmhc` (Paris).
- Supabase Edge Function: `resort`; source in `supabase/functions/resort`.
- Database schema: `supabase/migrations`.

Only the public Supabase publishable key is present in browser code. Database credentials remain in the Supabase Edge Function environment. All private operations verify the bearer token with Supabase Auth; only the confirmed owner email has administrator access. Public tables have RLS enabled and direct anon/authenticated access revoked. The Edge Function performs authorization and atomic PostgreSQL transactions.

## Remaining launch steps
1. Grant the GitHub integration write access to this repository and push the source.
2. Create the Render static site. If its assigned URL differs from https://aurea-resort.onrender.com, update the exact CORS allowlist in the Edge Function and redeploy it.
3. Supabase Authentication URL Configuration: set Site URL to the Render URL and allow its `/login/` redirect URL.
4. Configure custom SMTP for public confirmation/recovery emails. Supabase's default mail service restricts recipients and sending volume. Do not disable email verification to work around this: the admin check requires a verified email.
5. Verify signup, confirmation, sign-in, owner administration and a complete booking/cancellation in the deployed browser.

Existing ChatGPT-site records/accounts have NOT been imported. The original site remains intact. Do not retire it until data export and verified account mapping have been completed.

## Verification
`node scripts/verify-bookings.mjs` checks booking logic with isolated SQLite storage. This does not verify the live Postgres adapter or live Auth flow. Live database checks verified unique room-night conflicts and rollback. Public backend catalog and unauthenticated access checks are separate.

All stays remain demonstrations. No real property or payment processor is connected. Testimonials are labelled sample content.
