# Portfolio Project Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the portfolio project cards in `src/app/components/portfolio/portfolio.component.ts` with the approved resume-backed naming and recruiter-friendly descriptions.

**Architecture:** Update the static project data inside `PortfolioComponent` without changing templates or component structure. Preserve existing visibility flags, demo links, and image paths while rewriting titles and descriptions to match the approved spec.

**Tech Stack:** Angular 17, TypeScript, static component data

---

## File Map

- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.ts`
- Review: `c:\Users\ADMIN\Desktop\portfolio\docs\superpowers\specs\2026-06-14-portfolio-project-sync-design.md`
- Validate: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.html`

### Task 1: Sync Web Project Titles and Descriptions

**Files:**
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.ts`
- Review: `c:\Users\ADMIN\Desktop\portfolio\docs\superpowers\specs\2026-06-14-portfolio-project-sync-design.md`

- [ ] **Step 1: Confirm the approved rename list before editing**

Review these entries in `webProjects`:

```ts
name: 'The Marino World website'
name: 'Sabat MO!'
name: 'Fidelity Bond Alert Monitoring System'
name: '16 in 1 Tea - Herbal Tea Shop'
name: 'Business Permit Document Management System'
name: 'The Apple Peach House Platform [Archived]'
```

Expected outcome: the above names are ready to be updated to the approved recruiter-friendly names from the spec.

- [ ] **Step 2: Rewrite the Marino World entry**

Replace the entry content with:

```ts
{
  name: 'Marino World Website',
  description: 'Built a content-driven platform for maritime news, digital magazine access, and industry updates using Next.js, Prisma, and Supabase. The project supports content management and delivers a responsive experience for readers and administrators.',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Prisma'],
  image: 'assets/photos/marinoworld.png',
  demo: 'https://themarinoworld.com/dashboard'
}
```

- [ ] **Step 3: Rewrite the jeepney locator entry**

Replace the existing `Sabat MO!` entry with:

```ts
{
  name: 'Real-Time Jeepney Locator & Passenger Monitoring System',
  description: 'Developed a real-time tracking and passenger monitoring system for public transportation using PHP, JavaScript, and C++. The project combines location tracking and passenger data monitoring to support transport visibility and operational insights.',
  technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MIT App Inventor'],
  image: 'assets/photos/jeepfinder.png',
  demo: 'https://peachpuff-donkey-807602.hostingersite.com'
}
```

- [ ] **Step 4: Rewrite the confidential alert system entry**

Replace the existing alert system entry with:

```ts
{
  name: 'Automated Alert System',
  description: '[CONFIDENTIAL PROJECT] Integrated an Angular frontend with a Kotlin-based Android backend to support direct SIM-based SMS alerts. Due to confidentiality agreements, detailed implementation information and demo access remain restricted.',
  technologies: ['Angular', 'Kotlin', 'Supabase', 'REST API', 'Material Design'],
  image: 'assets/photos/fbus.png',
  demo: null,
  isConfidential: true
}
```

- [ ] **Step 5: Rewrite the herbal roots e-commerce entry**

Replace the e-commerce entry with:

```ts
{
  name: 'E-commerce Website - ALBAY Alingatong Herbal Roots',
  description: 'Developed an e-commerce website with product browsing, shopping cart functionality, and order handling using PHP and MySQL. The project focused on delivering a responsive storefront and a practical purchasing flow for customers.',
  technologies: ['HTML', 'JavaScript', 'PHP', 'CSS', 'MySQL'],
  image: 'assets/photos/16in1.png',
  demo: 'https://www.16in1tea.com'
}
```

- [ ] **Step 6: Rewrite the RFQ document management entry**

Replace the RFQ entry with:

```ts
{
  name: 'RFQ Business Permit Document Management System',
  description: '[CONFIDENTIAL PROJECT] Developed an Angular and Supabase-based system for document submission, status tracking, and approval workflows. Due to confidentiality agreements, detailed information and demo access are restricted.',
  technologies: ['Angular', 'TypeScript', 'Supabase', 'Node.js'],
  image: 'assets/photos/bpdm.png',
  demo: null,
  isConfidential: true
}
```

- [ ] **Step 7: Rewrite the hotel platform entry**

Replace the archived hotel platform entry with:

```ts
{
  name: 'PeachPerfect Hotel Management System [Archived]',
  description: 'Developed a Laravel-based hotel booking and guest management system with payment tracking and reservation support. The platform helped manage hospitality operations through a centralized web-based workflow. (Project is no longer active)',
  technologies: ['PHP', 'JavaScript', 'MySQL', 'CSS'],
  image: 'assets/photos/applepeach.png',
  demo: null,
  isArchived: true
}
```

- [ ] **Step 8: Run TypeScript diagnostics after web project edits**

Run diagnostics for:

```text
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/portfolio/portfolio.component.ts
```

Expected: no diagnostics.

- [ ] **Step 9: Commit the web project sync**

```bash
git add src/app/components/portfolio/portfolio.component.ts docs/superpowers/specs/2026-06-14-portfolio-project-sync-design.md docs/superpowers/plans/2026-06-14-portfolio-project-sync.md
git commit -m "feat: sync web portfolio projects with resume"
```

### Task 2: Polish Rural Bank Project Copy

**Files:**
- Modify: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.ts`
- Validate: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.html`

- [ ] **Step 1: Rewrite the Superset setup entry**

Update the rural bank Superset entry to:

```ts
{
  name: 'Apache Superset Setup & Deployment (Rocky Linux) [Internal]',
  description: 'Installed and configured Apache Superset on a Rocky Linux server to support internal reporting and dashboarding. Prepared the environment, configured services, and ensured stable access for business users.',
  technologies: ['Apache Superset', 'Rocky Linux', 'Linux', 'SQL'],
  image: 'assets/photos/superset.png',
  demo: null,
  isInternal: true
}
```

- [ ] **Step 2: Rewrite the discontinued transaction monitoring entry**

Update the monitoring entry to:

```ts
{
  name: 'Real-time API Transaction Monitoring System [Discontinued]',
  description: 'Built a Laravel-based dashboard for monitoring API transaction activity, request status, and operational issues. The solution was later discontinued after reporting was transitioned to Superset-based dashboards.',
  technologies: ['Laravel', 'PHP', 'REST API', 'SQL', 'Mysql'],
  image: 'assets/photos/rbgi.png',
  demo: null,
  isArchived: true
}
```

- [ ] **Step 3: Rewrite the Asenso support entry**

Update the Asenso entry to:

```ts
{
  name: 'Asenso Web Portal Debugging & Support [Internal]',
  description: 'Provided debugging and support for Instapay transaction filtering and SOA report generation in the Asenso web portal. Resolved issues affecting transaction exports and reporting reliability for internal users.',
  technologies: ['PHP', 'JavaScript', 'SQL', 'Git'],
  image: 'assets/photos/asenso.png',
  demo: null,
  isInternal: true
}
```

- [ ] **Step 4: Rewrite the Python settlement entry**

Update the settlement entry to:

```ts
{
  name: 'Automated Transaction Settlement Using Python [Internal]',
  description: 'Implemented an automated transaction settlement process using a Python background script to reduce manual work, improve accuracy, and speed up end-of-day operations. The solution standardized internal settlement flow and minimized operational errors.',
  technologies: ['Python', 'SQL', 'MySQL', 'Background Processing', 'Automation'],
  image: 'assets/photos/rbgi.png',
  demo: null,
  isInternal: true
}
```

- [ ] **Step 5: Rewrite the MySQL replication entry**

Update the replication entry to:

```ts
{
  name: 'MySQL Replication for Disaster Recovery and Reporting [Internal]',
  description: 'Set up MySQL replication between servers to improve disaster recovery readiness and provide a read replica for reporting workloads. The setup increased data availability and reduced reporting load on the primary transactional database.',
  technologies: ['MySQL', 'Database Replication', 'SQL', 'Linux', 'Disaster Recovery'],
  image: 'assets/photos/rbgi.png',
  demo: null,
  isInternal: true
}
```

- [ ] **Step 6: Review the template expectations**

Verify that `portfolio.component.html` still only depends on:

```html
{{project.name}}
{{project.description}}
{{project.technologies}}
[src]="project.image"
[href]="project.demo"
```

Expected: no template changes are required because the data shape remains unchanged.

- [ ] **Step 7: Run diagnostics after rural bank rewrites**

Run diagnostics for:

```text
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/portfolio/portfolio.component.ts
```

Expected: no diagnostics.

- [ ] **Step 8: Commit the rural bank copy updates**

```bash
git add src/app/components/portfolio/portfolio.component.ts
git commit -m "refactor: polish rural bank portfolio project copy"
```

### Task 3: Final Validation

**Files:**
- Review: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.ts`
- Review: `c:\Users\ADMIN\Desktop\portfolio\src\app\components\portfolio\portfolio.component.html`

- [ ] **Step 1: Confirm no placeholder cards remain**

Search the project arrays for placeholder values:

```ts
name: ''
description: ''
technologies: []
image: ''
```

Expected: none of these placeholder patterns remain in `webProjects` or `ruralBankProjects`.

- [ ] **Step 2: Review naming consistency against the spec**

Confirm these exact names exist:

```text
Marino World Website
Real-Time Jeepney Locator & Passenger Monitoring System
Automated Alert System
E-commerce Website - ALBAY Alingatong Herbal Roots
RFQ Business Permit Document Management System
PeachPerfect Hotel Management System [Archived]
```

Expected: all approved names appear in the file.

- [ ] **Step 3: Run one final diagnostics pass**

Run diagnostics for:

```text
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/portfolio/portfolio.component.ts
file:///c:/Users/ADMIN/Desktop/portfolio/src/app/components/portfolio/portfolio.component.html
```

Expected: both files return zero diagnostics.

- [ ] **Step 4: Commit final validated sync**

```bash
git add src/app/components/portfolio/portfolio.component.ts docs/superpowers/plans/2026-06-14-portfolio-project-sync.md
git commit -m "chore: finalize portfolio project sync"
```

## Self-Review

- Spec coverage: all approved web project renames and rural bank wording cleanups are mapped to tasks.
- Placeholder scan: no TODO or TBD markers are present.
- Type consistency: all tasks preserve the existing `WebProject` data shape and template bindings.
