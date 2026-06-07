# CineFlow AI

From Script to Screen, Powered by AI

## Run locally


1. Set `DATABASE_URL` to a PostgreSQL database.
2. Optional: set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_BUCKET` for script file storage.
3. Install dependencies: `pnpm install`
4. Generate Prisma client: `pnpm prisma:generate`
5. Migrate database: `pnpm prisma:migrate`
6. Seed sample data: `pnpm prisma:seed`
7. Start app: `pnpm dev`

Seed login:

- Email: `producer@cineflow.ai`
- Password: `password123`

## Modules

- Auth with NextAuth credentials
- Role-aware project management
- Dashboard metrics and Recharts budget usage
- Projects, scripts, AI breakdown, cast, crew, equipment, budget, scheduling, post-production tasks
- Supabase Storage integration for script uploads when credentials are configured
