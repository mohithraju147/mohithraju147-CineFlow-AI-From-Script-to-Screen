# CineFlow AI

From Script to Screen, Powered by AI

## Run locally

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to a PostgreSQL database.
3. Optional: set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_BUCKET` for script file storage.
4. Install dependencies: `pnpm install`
5. Generate Prisma client: `pnpm prisma:generate`
6. Migrate database: `pnpm prisma:migrate`
7. Seed sample data: `pnpm prisma:seed`
8. Start app: `pnpm dev`

Seed login:

- Email: `producer@cineflow.ai`
- Password: `password123`

## Modules

- Auth with NextAuth credentials
- Role-aware project management
- Dashboard metrics and Recharts budget usage
- Projects, scripts, AI breakdown, cast, crew, equipment, budget, scheduling, post-production tasks
- Supabase Storage integration for script uploads when credentials are configured
