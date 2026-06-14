# Portfolio Project Sync Design

## Goal

Align the portfolio project cards in `src/app/components/portfolio/portfolio.component.ts`
with the user's updated resume while keeping the website recruiter-friendly, concise,
and consistent with current internal, confidential, and archived markers.

## Scope

This update covers:

- Renaming selected `webProjects` entries to match resume project names
- Rewriting project descriptions to be shorter and more professional
- Preserving existing `demo`, `image`, `isInternal`, `isConfidential`, and `isArchived` fields unless required for consistency
- Light wording cleanup for `ruralBankProjects` descriptions only

This update does not cover:

- `technicalProjects`
- Template or styling changes
- New image asset creation
- Structural changes to project arrays

## Approved Direction

Use a recruiter-first rewrite approach:

- Keep resume alignment as the source of truth
- Rewrite titles and descriptions so they read better on portfolio cards
- Keep confidentiality and internal visibility rules intact

## Planned Web Project Updates

### 1. Marino World

- Rename `The Marino World website` to `Marino World Website`
- Rewrite description to emphasize a content-driven platform for maritime news and events
- Keep existing technology list and demo link

### 2. Jeepney Locator

- Rename `Sabat MO!` to `Real-Time Jeepney Locator & Passenger Monitoring System`
- Rewrite description to reflect the capstone framing from the resume
- Keep the current technology list and public demo

### 3. Automated Alert System

- Rename `Fidelity Bond Alert Monitoring System` to `Automated Alert System`
- Keep it marked confidential
- Rewrite description to reflect Angular frontend integration with a Kotlin-based Android backend for SIM-based SMS alerts

### 4. Herbal Roots E-commerce

- Rename `16 in 1 Tea - Herbal Tea Shop` to `E-commerce Website - ALBAY Alingatong Herbal Roots`
- Rewrite description to emphasize shopping cart and PHP/MySQL stack
- Keep existing public demo

### 5. RFQ Business Permit DMS

- Rename `Business Permit Document Management System` to `RFQ Business Permit Document Management System`
- Keep it marked confidential
- Rewrite description to emphasize document submission, status tracking, and approval workflows

### 6. Hotel Management Platform

- Rename `The Apple Peach House Platform [Archived]` to `PeachPerfect Hotel Management System [Archived]`
- Rewrite description to emphasize hotel booking, guest management, and payment tracking
- Keep archived state

### 7. Hotel Admin Dashboard

- Keep `Hotel POS & Admin Dashboard [Archived]`
- Light rewrite only if needed so it remains aligned with the hotel management platform wording

## Planned Rural Bank Updates

Apply wording cleanup only:

- `Apache Superset Setup & Deployment (Rocky Linux) [Internal]`
- `Real-time API Transaction Monitoring System [Discontinued]`
- `Asenso Web Portal Debugging & Support [Internal]`
- `Automated Transaction Settlement Using Python [Internal]`
- `MySQL Replication for Disaster Recovery and Reporting [Internal]`

## Data Flow

- Resume content provides the canonical naming and experience framing
- Existing portfolio entries provide current links, assets, and visibility flags
- The final rewritten project cards combine both sources into concise portfolio-friendly copy

## Error Handling

- Avoid changing image paths unless an asset is missing
- Avoid changing links for public demos unless the current link is invalid
- Preserve internal, confidential, and archived states to prevent accidental public exposure

## Validation

- Check `portfolio.component.ts` for TypeScript diagnostics after edits
- Confirm renamed entries still render correctly through existing template bindings
- Ensure no blank placeholder project cards remain in `webProjects` or `ruralBankProjects`

## Self-Review

- No placeholders remain
- Scope is limited to project content synchronization
- Naming and rewrite rules are consistent with the approved recruiter-first direction
