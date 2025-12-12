# Release v0.5.0 - SEO & Performance Optimization

## 🚀 Major Improvements

### SEO Enhancements
- **Comprehensive Metadata**: All pages now have proper title, description, Open Graph tags, and Twitter cards
- **Search Engine Optimization**: Added robots.txt for crawler directives
- **Dynamic Sitemap**: Implemented sitemap.xml with all 12+ routes, proper priorities and change frequencies
- **PWA Support**: Added manifest.ts for progressive web app capabilities

### Performance Optimizations
- **ISR Configuration**: Implemented Incremental Static Regeneration
  - Dashboard: 60-second revalidation
  - Vocabulary & Notes: 30-second revalidation
- **Image Optimization**: 
  - AVIF and WebP format support
  - Supabase domain whitelisting
  - Optimized cache TTL (60 seconds)
- **Loading States**: Created skeleton loaders for better UX
  - Dashboard skeleton with stat cards
  - Vocabulary table skeleton
  - Groups grid skeleton
  - Practice game skeleton

### Bug Fixes
- **Hydration Issues Fixed**: 
  - Extracted header to `SiteHeader` server component
  - Moved UserBadge data fetching from client to server (layout level)
  - Fixed WordForm hydration by removing responsive grid layout
- **Server Function Calls**: Resolved "Server Functions cannot be called during initial render" error

## 📝 Technical Details

### New Files
- `src/app/robots.ts` - SEO robot directives
- `src/app/sitemap.ts` - Dynamic sitemap generation
- `src/app/manifest.ts` - PWA manifest
- `src/app/(main)/loading.tsx` - Dashboard skeleton
- `src/app/(main)/vocabulary/loading.tsx` - Vocabulary skeleton
- `src/app/(main)/groups/loading.tsx` - Groups skeleton
- `src/app/(main)/practice/loading.tsx` - Practice skeleton
- `src/components/layout/site-header.tsx` - Server component header
- `src/components/layout/user-badge-dropdown.tsx` - Client component for user badge
- `.env.example` - Added NEXT_PUBLIC_SITE_URL

### Modified Files
- All page files: Added metadata exports
- `next.config.ts`: Image optimization configuration
- `src/app/(main)/layout.tsx`: Refactored to use SiteHeader with server-side data fetching
- `src/components/vocabulary/word-form.tsx`: Removed responsive grid to fix hydration

### Breaking Changes
None - fully backward compatible

## 🔧 Configuration Changes

### Environment Variables
New optional variable for SEO:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Production deployments should set this to the actual domain.

## 📊 Performance Impact

- **Build Output**: All authenticated pages remain dynamic (ƒ) as intended
- **Static Pages**: Login, robots.txt, sitemap.xml, manifest pre-rendered (○)
- **ISR Benefits**: Reduced server load with smart caching
- **Loading Experience**: Users see skeleton UI immediately instead of blank screens

## 🐛 Known Issues

- Local development hydration warnings may persist (Vercel production should work fine)
- Supabase Edge Runtime warnings in build (cosmetic only, no impact on functionality)

## 📦 What's Next (v0.6.0)

- Fix remaining hydration issues in development
- Add more practice modes
- Implement spaced repetition algorithm
- Add progress tracking and statistics

---

**Full Changelog**: https://github.com/yigityalim/baustein/compare/v0.4.0...v0.5.0
