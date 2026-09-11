# Phase 1: Backend Foundation

## Overview

Phase 1 establishes the backend infrastructure for PERFI-SITE, including:

1. **Database Layer** (`lib/db`)
   - Drizzle ORM schema for users, sites, pages, sections, and themes
   - Query functions for CRUD operations
   - Zod schema integration for type-safe validation

2. **Validation Schemas** (`lib/api-zod`)
   - Auth request/response schemas (signup, login, sessions)
   - Site/page/section/theme schemas
   - Builder model schemas for preview data

3. **API Server** (`artifacts/api-server`)
   - Express 5 server with middleware (CORS, JSON, cookie parser)
   - Authentication endpoints (signup, login, logout, me)
   - Site management endpoints (CRUD)
   - Builder routes for manual site editing (pages, sections, theme)
   - Session-based auth with JWT-like token pattern
   - Builder preview endpoint for rendering full site data

## Database Schema

### Users & Auth
- `users` — user accounts with email, name, password hash, email verification
- `sessions` — active user sessions with expiring tokens

### Sites & Content
- `sites` — site metadata (name, slug, status, owner)
- `pages` — pages within sites (title, slug, homepage flag, order)
- `sections` — sections within pages (type, order, props, display settings)
- `site_themes` — theme configuration (colors, typography, custom CSS)
- `site_collaborators` — multi-user access control (future feature)

## API Endpoints

### Authentication
- `POST /api/auth/signup` — Register new user and create session
- `POST /api/auth/login` — Authenticate and create session
- `GET /api/auth/me` — Get current user (requires token)
- `POST /api/auth/logout` — Delete session

### Sites
- `POST /api/sites` — Create new site (authenticated)
- `GET /api/sites` — List user's sites
- `GET /api/sites/:siteId` — Get site with pages and sections
- `PUT /api/sites/:siteId` — Update site metadata

### Builder (Manual Site Editing)
- `POST /api/builder/:siteId/pages` — Create page in site
- `POST /api/builder/pages/:pageId/sections` — Create section in page
- `PUT /api/builder/sections/:sectionId` — Update section (props, type, display)
- `PUT /api/builder/:siteId/theme` — Update site theme
- `GET /api/builder/:siteId/preview` — Get full site data for preview

## Environment Variables

```bash
# Database
DATABASE_URL=postgres://user:password@localhost:5432/perfi_site

# Server
PORT=5000
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

## Running the Server

```bash
# Start dev server (hot reload via tsx)
pnpm --filter @workspace/api-server run dev

# Start production server
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start

# Type check
pnpm --filter @workspace/api-server run typecheck
```

## Next Steps (Phase 2+)

1. **AI Builder Integration**
   - Add endpoints for AI-powered site generation from prompts/templates
   - Integrate with LLM for section content generation

2. **Publishing & Hosting**
   - Add domain management endpoints
   - Implement site publishing workflow (draft → published)
   - Build static site generator for preview/export

3. **Frontend Integration**
   - Create Next.js client in `.conversation/` that consumes these APIs
   - Connect manual builder UI to backend persistence
   - Implement session management and auth flows

4. **Advanced Features**
   - Site collaborators and multi-user editing
   - Analytics and site usage tracking
   - Site versioning and rollback
   - Commerce integration (products, payments)

5. **Database Migrations**
   - Set up Drizzle Kit migrations workflow
   - Create migration strategy for schema updates

## Development Notes

- **Auth**: Uses session tokens (not JWT) for simplicity. Upgrade to JWT in production.
- **Crypto**: Uses Node.js built-in `crypto` for password hashing. Consider bcrypt/argon2 for production.
- **Error Handling**: Basic error handling; expand with custom error types and codes.
- **Logging**: Uses Pino for structured logging. Configure transport for production.
- **Database Connection**: Singleton pattern; ensure graceful shutdown on server close.
