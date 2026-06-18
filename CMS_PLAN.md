# CMS plan

## Recommendation

Use a Shareef-owned Sanity project with a browser-based Sanity Studio. Keep the
website layout and animation in code while exposing normal content fields.

The current site stores most copy directly inside React components and pages.
CMS integration therefore begins by extracting and importing that content.

## Phase 1 publishing flow

The site currently uses Next.js static export:

1. Shareef edits and publishes in Sanity Studio.
2. Sanity calls a Vercel deploy hook.
3. Vercel rebuilds and publishes the static site.

## Editable content

- Site settings and contact details.
- Homepage hero and introductory copy.
- Services and their ordering.
- Principles and impact statistics.
- Selected engagements.
- About and approach copy.
- Testimonials and categories.
- Perspectives posts, videos, external links, and dates.
- Page SEO and social images.

## Design-controlled content

Do not expose layout variants, animation parameters, arbitrary HTML, navigation
structure, or CSS controls.

## Proposed schema types

- `siteSettings`
- `homePage`
- `standardPage`
- `service`
- `principle`
- `engagement`
- `testimonial`
- `perspective`
- `seo`

## Account ownership

Shareef creates and owns the Sanity organization/project. Hashem is invited as a
technical administrator or developer.

## Environment variables

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

Secrets belong in Vercel and must not be committed.

## Implementation order

1. Create and deploy Sanity Studio.
2. Define schemas.
3. Extract current component-local content.
4. Import current content into Sanity.
5. Add typed queries with local fallback during migration.
6. Convert pages section by section.
7. Configure Sanity webhook and Vercel deploy hook.
8. Test publishing, images, ordering, rollback, and mobile layouts.
