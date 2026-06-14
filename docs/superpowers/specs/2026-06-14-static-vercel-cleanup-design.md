# Static Vercel Cleanup Design

## Goal

Convert the Angular portfolio into a purely static client-side application that is safe to deploy on Vercel without SSR, Express, Supabase visitor tracking, or admin tooling.

## Scope

This cleanup covers:

- Removing Angular SSR and Express server files
- Removing the admin route and admin component files
- Removing visitor tracking and Supabase-related services
- Removing admin-only map logic
- Trimming backend-only and removed feature dependencies from `package.json`
- Validating that the app still builds and routes correctly as a static Angular site

This cleanup does not cover:

- Rewriting visible portfolio content
- Reworking UI layouts
- Replacing removed analytics/admin features with new static alternatives

## Approved Direction

Use a full cleanup plus dependency trim approach:

- Keep only browser-side Angular app code needed for the portfolio
- Remove code paths that require backend behavior, data persistence, or SSR runtime support
- Target a static build output suitable for Vercel deployment

## Current Backend-Like Surface Area

### SSR and Node

- `server.ts`
- `src/main.server.ts`
- `src/app/app.config.server.ts`
- `@angular/ssr`
- `express`
- `@angular/platform-server`
- `@types/express`

### Supabase and Visitor Tracking

- `src/app/services/supabase.service.ts`
- `src/app/services/visitor-tracking.service.ts`
- Environment-based Supabase configuration usage
- Automatic tracking calls in `src/app/app.component.ts`
- Automatic tracking calls in `src/app/components/hero/hero.component.ts`

### Admin Feature

- `src/app/components/admin/admin.component.ts`
- `src/app/components/admin/admin.component.html`
- `src/app/components/admin/admin.component.css`
- `/admin` route in `src/app/app.routes.ts`

### Admin-Only Map Support

- `src/app/services/map.service.ts`
- Leaflet dependencies that only support the admin visitor map

## Planned Changes

### 1. Remove Admin Feature

- Delete the entire `src/app/components/admin/` directory
- Remove `AdminComponent` import from `src/app/app.routes.ts`
- Remove the `/admin` route entry

### 2. Remove Tracking and Supabase Services

- Delete `src/app/services/supabase.service.ts`
- Delete `src/app/services/visitor-tracking.service.ts`
- Remove any imports or constructor injections referencing these services
- Remove automatic visitor tracking calls from:
  - `src/app/app.component.ts`
  - `src/app/components/hero/hero.component.ts`

### 3. Remove Admin-Only Map Logic

- Delete `src/app/services/map.service.ts`
- Remove unused Leaflet-related dependencies if nothing else in the app uses them

### 4. Remove SSR and Server Files

- Delete:
  - `server.ts`
  - `src/main.server.ts`
  - `src/app/app.config.server.ts`
- Keep the browser bootstrap path through `src/main.ts`
- Preserve standard Angular routing in browser mode

### 5. Trim Dependencies

Remove packages that are only needed for removed backend/admin functionality if no remaining code depends on them:

- `@angular/ssr`
- `@angular/platform-server`
- `express`
- `@supabase/supabase-js`
- `leaflet`
- `@types/leaflet`
- `@types/express`

Keep dependencies required by the remaining portfolio features.

### 6. Keep Static Hosting Compatibility

- Keep SPA routing behavior compatible with Vercel rewrites
- Do not add runtime server requirements back into the project

## Files Expected To Change

### Delete

- `c:\Users\ADMIN\Desktop\portfolio\server.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\main.server.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\app.config.server.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\services\supabase.service.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\services\visitor-tracking.service.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\services\map.service.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.html`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.css`

### Modify

- `c:\Users\ADMIN\Desktop\portfolio\src\app\app.routes.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\app.component.ts`
- `c:\Users\ADMIN\Desktop\portfolio\src\app\components\hero\hero.component.ts`
- `c:\Users\ADMIN\Desktop\portfolio\package.json`
- `c:\Users\ADMIN\Desktop\portfolio\package-lock.json`

## Data Flow After Cleanup

- The app boots entirely from `src/main.ts`
- Routing remains client-side through Angular router
- No visitor data is collected, stored, exported, or displayed
- No admin-only route or map interface remains
- Deployment relies on static hosting only

## Error Handling

- If a removed dependency is still referenced anywhere, diagnostics or build should catch it
- If a package appears removable but is still used by another feature, keep it until verified safe to remove
- If Angular build configuration implicitly expects SSR files, update configuration only as needed to preserve static builds

## Validation

- Confirm `/admin` route is removed from `app.routes.ts`
- Confirm no imports remain for:
  - `AdminComponent`
  - `VisitorTrackingService`
  - `SupabaseService`
  - `MapService`
- Confirm no remaining references to `trackVisitor`
- Run diagnostics on all edited files
- Run a production build and verify it succeeds

## Self-Review

- No placeholders remain
- Scope is limited to static deployment cleanup
- The design consistently removes backend-like runtime concerns rather than partially disabling them
