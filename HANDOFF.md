# 3Ts website handoff

This site is a Next.js app. It is not directly importable into Squarespace or GoDaddy Website Builder as editable blocks.

## Best handoff path for the current site

Host the site as-is and point the domain to it. This preserves the design, animation, responsive behavior, and page structure.

Recommended setup:

- Keep the code in a GitHub repository.
- Deploy through Vercel.
- Point the domain DNS from GoDaddy, Squarespace, or another registrar to the host.
- Use Sanity if Shareef should edit content himself without touching GitHub.

## Recommended non-technical editing setup

Add Sanity as a headless CMS and expose the content Shareef is likely to maintain:

- Perspectives posts: title, date, category, excerpt, body, external link, embedded video URL, featured flag.
- Homepage/service copy: selected text fields only, not layout controls.
- About and Approach copy: controlled rich text sections.
- Contact details: email, locations, Calendly link.

This keeps the custom site intact while giving Shareef a browser-based editing dashboard. Publishing content in Sanity can trigger the site to refresh without Shareef making commits.

## Low-maintenance alternative

If Shareef does not want a CMS, keep the site on Vercel and have Hashem make occasional edits. This is the simplest operational model, but Shareef depends on someone technical for content changes.

## If Shareef wants a drag-and-drop editor

Squarespace or GoDaddy Website Builder would require rebuilding the pages manually in that platform. The current site can serve as the visual and copy reference, but the layout and interactions will not transfer automatically.

This path is easier for non-technical text edits, but it will reduce control over the custom hero, mosaic principles section, responsive details, and overall polish.

## Common content locations

- Homepage assembly: `src/components/HomePage.tsx`
- Hero section: `src/components/Hero.tsx`
- Principles mosaic: `src/components/WhyChooseVariants.tsx`
- About page: `src/app/about/page.tsx`
- Approach page: `src/app/approach/page.tsx`
- Contact page: `src/app/contact/page.tsx`
- Footer: `src/components/Footer.tsx`
- Images and logos: `public/`

## Routine updates

For simple copy edits, update the relevant page/component file and redeploy. For image swaps, place the image in `public/` and update the matching `src` path in the component.
