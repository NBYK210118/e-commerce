# Security remediation — 2026-11-19

This branch replaces vulnerable dependency paths and closes authentication and ownership gaps discovered during review. It is not evidence that a running deployment has been upgraded or that every possible vulnerability has been eliminated.

## Dependency changes

- Backend: Nest 11.2.11, Express 5.3, bcrypt 6, Prisma/client 5.22; Node 24 is the tested runtime. `@prisma/client` is now a production dependency.
- Removed unused Fastify, multipart/form parsing and Socket.IO integrations. The application uses the Express adapter and JSON/base64 images. Multer may remain through the patched Nest Express adapter but is not registered in application routes.
- Frontend: Expo 58.0.26 with its declared React Native/React/native-module versions, React Navigation 7, Redux Toolkit 2 and React Redux 9. This requires rebuilding native clients; old Expo 50 clients cannot simply load the new bundle.
- Regenerated both npm lockfiles, including development dependencies. Use `npm ci`, not an old `node_modules` directory.
- Temporary overrides: Nest's Express version uses the direct patched Express range; Nest CLI's glob is raised to 14.0.2+; vulnerable minimatch 7–11.0.0 ranges are raised to 11.0.1+; Expo fingerprint's minimatch is raised to 11.0.1+. Revisit and remove overrides when upstream parents carry fixed versions. Builds/exports exercise the installed graph but do not prove every CLI/fingerprint feature compatible.

## Application behavior changes

- Authentication is required by default. Signup, signin, catalog/category/review browsing and explicitly marked guest product/view endpoints remain public.
- User/profile enumeration and administrative deletion, category registration, all support questions and support replies require the current database role `ADMIN`. User-supplied signup roles are ignored. Provision administrators only through controlled database administration.
- Product read-for-edit, update, status and bulk deletion require ownership; wishlist retrieval must match the authenticated user. Existing stores cannot be joined by merely supplying their name.
- The JWT key has no source-code fallback. Missing/short `JWT_SECRET` prevents startup. JWTs use HS256, a numeric user ID subject and a 120-minute lifetime. Old email-only tokens are rejected. Password fields are recursively removed from API responses; public review/question user projections exclude private profile fields.
- Signup requires at least 12 characters and at most 72 UTF-8 bytes. Existing login passwords are not silently changed. Invalid login returns 401.
- JSON bodies are limited to 10 MB (including base64 overhead); URL-encoded and multipart writes are rejected. Browser CORS origins must be explicitly configured. `nosniff` and `no-referrer` headers are added.
- Frontend API URL comes from `EXPO_PUBLIC_API_URL`; production requires HTTPS. This variable is public and must never contain a secret. Signup screen wiring and image-picker/navigation compatibility were updated.

## Reproduce checks

Use Node 24. From `backend`:

```sh
npm ci
npx prisma generate
npm run build
npm test -- --runInBand
npm run test:e2e -- --runInBand
npm audit --audit-level=low
```

From `frontend`:

```sh
npm ci
npx expo install --check
CI=1 EXPO_PUBLIC_API_URL=https://api.example.invalid npm run export:check
npm audit --audit-level=low
```

Security tests use the real Nest HTTP/auth pipeline, real JWT signing and bcrypt, with a mocked Prisma provider. They cover anonymous/admin access, invalid/expired/legacy JWTs, credential redaction, signup role injection, parser limits, wishlist isolation and foreign-product write denial. The HTTP smoke suite also verifies public catalog access. These are not real PostgreSQL integration tests. Exporting web, Android and iOS bundles is not a signed native build or device test.

## Deployment checklist (not performed by this PR)

1. Back up the database and stage this branch against a disposable copy. No Prisma schema or migration changes are included; do not use `migrate dev` on production. Check existing migration state separately.
2. Generate a NEW random JWT key (for example `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"`) in the deployment secret manager. Do not reuse the previously committed key. Restart all API instances together, discard old tokens and require login again. Source removal does not erase Git history or rotate a running service's key.
3. Set `DATABASE_URL`, `JWT_SECRET`, and explicit `CORS_ORIGINS`; `.env.example` is a template, not an automatically loaded production configuration. Inject environment variables through the host or run `node --env-file=.env dist/main.js` from backend after building. Never commit `.env`.
4. Set the real HTTPS `EXPO_PUBLIC_API_URL` before exporting/building the client; configure TLS and request/rate limits at the reverse proxy. Test allowed/disallowed browser origins. Do not expose the database to the internet.
5. Verify two separate normal accounts and an admin account: signup/login, profile changes, catalog/search, cart/wishlist, seller registration, owned-product add/edit/delete, foreign-product denial, reviews/questions and admin replies. Confirm no hashes or private fields in public responses. Verify uploads under 10 MB and rejection above the limit.
6. On Android and iOS devices verify navigation, image library permissions, upload, keyboard/signup and network behavior. Build new native apps for Expo 58. Test real PostgreSQL transactions and foreign-key behavior, especially product deletion with orders/reviews.
7. Deploy API and rebuilt clients together after staging passes. Monitor 401/403/413/415 and 5xx rates. If rolling back, retain secret rotation and access-control fixes; do not restore the exposed key or unauthenticated administrative routes.

GitHub Actions now runs build, regression/smoke tests, Expo compatibility/export and npm audits. Dependabot checks each npm project weekly. npm audit results reflect the registry advisory database at execution time; GitHub alert closure requires merging a fixed default-branch lockfile and GitHub rescanning it.
