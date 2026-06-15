# Static Vercel Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove SSR, admin, visitor tracking, Supabase, and related backend-only dependencies so the Angular portfolio builds and deploys as a static site on Vercel.

**Architecture:** Convert the project into a browser-only Angular application by removing server/runtime code paths and unused feature modules. Preserve the existing portfolio UI and router-based navigation while trimming backend-only services, routes, files, and dependencies.

**Tech Stack:** Angular 17, TypeScript, Angular CLI, npm

---

## File Map

- Delete: `c:\Users\ADMIN\Desktop\portfolio\server.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\main.server.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.config.server.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\supabase.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\visitor-tracking.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\map.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.html`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.css`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.routes.ts`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.component.ts`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\hero\hero.component.ts`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\package.json`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\package-lock.json`
- Review: `c:\Users\ADMIN\Desktop\portfolio\docs\superpowers\specs\2026-06-14-static-vercel-cleanup-design.md`

### Task 1: Remove Admin Route and Tracking Hooks

**Files:**
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.routes.ts`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.component.ts`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\hero\hero.component.ts`

- [ ] **Step 1: Remove the admin route import and route entry**

Update `app.routes.ts` from:

```ts
import { AdminComponent } from './components/admin/admin.component';
...
  { path: 'admin', component: AdminComponent },
```

To:

```ts
import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ServicesComponent } from './components/services/services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResumeComponent } from './components/resume/resume.component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  { path: '**', redirectTo: '' }
];
```

- [ ] **Step 2: Remove visitor tracking from the root app component**

Replace `app.component.ts` with:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio-project';
}
```

- [ ] **Step 3: Remove visitor tracking from the hero component**

Replace `hero.component.ts` with:

```ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  personalInfo = {
    name: 'Jamille B. Añonuevo',
    title: 'Full Stack Developer',
    description: 'Passionate about creating innovative web solutions and turning ideas into reality.',
    location: 'Legazpi, Albay, Philippines',
    profileImage: '../../assets/jamz.jpg'
  };
}
```

- [ ] **Step 4: Run diagnostics for the route and component cleanup**

Run diagnostics for:

```text
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/app.routes.ts
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/app.component.ts
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/hero/hero.component.ts
```

Expected: zero diagnostics.

- [ ] **Step 5: Commit the routing and tracking cleanup**

```bash
git add src/app/app.routes.ts src/app/app.component.ts src/app/components/hero/hero.component.ts
git commit -m "refactor: remove admin route and visitor tracking hooks"
```

### Task 2: Delete Admin, Tracking, and SSR Files

**Files:**
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.html`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\admin\admin.component.css`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\supabase.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\visitor-tracking.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\services\map.service.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\server.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\main.server.ts`
- Delete: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.config.server.ts`

- [ ] **Step 1: Delete the admin component files**

Delete:

```text
src/app/components/admin/admin.component.ts
src/app/components/admin/admin.component.html
src/app/components/admin/admin.component.css
```

Expected: the admin feature no longer exists in the source tree.

- [ ] **Step 2: Delete visitor tracking and Supabase services**

Delete:

```text
src/app/services/supabase.service.ts
src/app/services/visitor-tracking.service.ts
src/app/services/map.service.ts
```

Expected: no service files remain for tracking, storage, or admin-only maps.

- [ ] **Step 3: Delete SSR and server files**

Delete:

```text
server.ts
src/main.server.ts
src/app/app.config.server.ts
```

Expected: no SSR or Express entrypoints remain.

- [ ] **Step 4: Search for stale imports or references**

Search for:

```text
AdminComponent
VisitorTrackingService
SupabaseService
MapService
trackVisitor
main.server
app.config.server
```

Expected: no matches in active source files.

- [ ] **Step 5: Commit the file removals**

```bash
git add -A
git commit -m "refactor: remove admin supabase and ssr files"
```

### Task 3: Trim Dependencies for Static Deployment

**Files:**
- Modify: `c:\Users\ADMIN\Desktop\portfolio\package.json`
- Modify: `c:\Users\ADMIN\Desktop\portfolio\package-lock.json`

- [ ] **Step 1: Remove backend-only and removed-feature dependencies from `package.json`**

Update dependencies by removing:

```json
"@angular/platform-server": "^17.0.0",
"@angular/ssr": "^17.0.0",
"@supabase/supabase-js": "^2.57.0",
"@types/leaflet": "^1.9.20",
"express": "^4.18.2",
"leaflet": "^1.9.4"
```

And remove dev dependency:

```json
"@types/express": "^4.17.17"
```

Expected remaining scripts:

```json
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```

- [ ] **Step 2: Regenerate the lockfile**

Run:

```bash
npm install
```

Expected: `package-lock.json` updates to match the trimmed dependency set.

- [ ] **Step 3: Verify removed packages are no longer present**

Run:

```bash
npm ls @angular/ssr @angular/platform-server @supabase/supabase-js express leaflet
```

Expected: removed packages no longer appear as direct project dependencies.

- [ ] **Step 4: Commit the dependency cleanup**

```bash
git add package.json package-lock.json
git commit -m "chore: trim dependencies for static deployment"
```

### Task 4: Final Validation for Vercel-Ready Static Build

**Files:**
- Review: `c:\Users\ADMIN\Desktop\portfolio\src\app\app.routes.ts`
- Review: `c:\Users\ADMIN\Desktop\portfolio\package.json`
- Review: `c:\Users\ADMIN\Desktop\portfolio\angular.json`

- [ ] **Step 1: Confirm no admin or tracking references remain**

Search for:

```text
admin.component
VisitorTrackingService
SupabaseService
MapService
trackVisitor
admin_authenticated
```

Expected: no matches in active project files.

- [ ] **Step 2: Run diagnostics on edited files**

Run diagnostics for:

```text
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/app.routes.ts
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/app.component.ts
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/hero/hero.component.ts
file:///c:/Users/ADMIN/Desktop/portfolio/package.json
```

Expected: zero diagnostics or no actionable errors.

- [ ] **Step 3: Run a production build**

Run:

```bash
npm run build
```

Expected: Angular production build succeeds and outputs browser assets to `dist/portfolio-project/browser` or the configured build directory.

- [ ] **Step 4: Note the Vercel deployment requirement**

Document for handoff:

```text
Use the Angular build output as a static site on Vercel and configure SPA rewrites to serve index.html for client-side routes.
```

- [ ] **Step 5: Commit the validated static cleanup**

```bash
git add -A
git commit -m "chore: finalize static vercel cleanup"
```

## Self-Review

- Spec coverage: admin removal, tracking removal, SSR removal, dependency trim, and build validation all have concrete tasks.
- Placeholder scan: no TODO or TBD markers remain.
- Type consistency: all tasks preserve the remaining Angular browser app structure and do not reference deleted services after cleanup.
