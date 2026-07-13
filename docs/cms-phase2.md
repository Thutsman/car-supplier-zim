# CMS Phase 2 — Supabase Integration Plan

This document outlines the admin CMS architecture for Car Supplier Zimbabwe, to be implemented after the public site (Phase 1).

## Overview

Phase 2 adds an authenticated admin area where staff can:
- Manage vehicle inventory (CRUD)
- Upload and manage showroom/gallery images
- Mark vehicles as featured

## Database Schema

### `vehicles`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, default `gen_random_uuid()` |
| make | text | Required |
| model | text | Required |
| year | integer | Required |
| price | numeric | USD |
| mileage | integer | km |
| transmission | text | `Automatic` or `Manual` |
| fuel_type | text | `Petrol`, `Diesel`, `Hybrid`, `Electric` |
| color | text | |
| description | text | |
| features | text[] | Array of feature strings |
| featured | boolean | Default false |
| status | text | `available`, `sold`, `reserved` |
| created_at | timestamptz | Default now() |
| updated_at | timestamptz | Auto-update trigger |

### `vehicle_images`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| vehicle_id | uuid | FK → vehicles, ON DELETE CASCADE |
| url | text | Supabase Storage public URL |
| alt | text | |
| sort_order | integer | Default 0 |

### `gallery_images`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| url | text | Supabase Storage public URL |
| alt | text | |
| category | text | `showroom`, `inventory`, `promo` |
| sort_order | integer | Default 0 |
| created_at | timestamptz | Default now() |

## Storage Buckets

- `vehicle-images` — public read, authenticated write
- `gallery-images` — public read, authenticated write

## Auth

- Supabase Auth with email/password for admin users
- Row Level Security (RLS):
  - Public: `SELECT` on `vehicles` where `status = 'available'`, all `vehicle_images`, all `gallery_images`
  - Authenticated admin: full CRUD on all tables

## Admin Routes (planned)

```
/admin/login
/admin/dashboard
/admin/vehicles
/admin/vehicles/new
/admin/vehicles/[id]/edit
/admin/gallery
```

## Migration from Phase 1

1. Create Supabase project and run migrations
2. Seed `vehicles` table from `lib/data/vehicles.ts`
3. Update `lib/data/vehicles-repo.ts` to query Supabase instead of seed data
4. Types in `lib/data/types.ts` already match the planned schema

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=  # server-only, admin operations
```

## Dependencies to Add

```bash
npm install @supabase/supabase-js @supabase/ssr
```
