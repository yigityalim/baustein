# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.2] - 2025-12-10

### Added
- GitHub release badge to README
- Deployment status badge to README

## [0.2.1] - 2025-12-10

### Fixed
- Missing sentence-actions.ts file causing build error

## [0.2.0] - 2025-12-10

### Added
- Modern Artikel Trainer with animated feedback
- Progress bar showing completion status
- Visual feedback (green/red borders) for correct/wrong answers
- Mobile-optimized navigation with Popover component
- Active state highlighting in navigation
- Dark mode support across all components
- Fully responsive design for mobile devices

### Changed
- Refactored mobile navigation from Sheet to Popover
- Improved article game UI with larger fonts and better spacing
- Updated button sizes and animations in practice modes
- Enhanced card layouts with better visual hierarchy

### Fixed
- Active navigation state not showing correctly
- Mobile menu overflow issues
- Button disabled state during game feedback

## [0.1.0] - 2025-12-09

### Added
- Initial project setup with Next.js 16 and TypeScript
- Supabase authentication (anonymous login)
- Vocabulary CRUD operations (add, edit, delete, list)
- Practice modes:
  - Artikel Trainer (der/die/das game)
  - Flashcards
  - Number Trainer (0-99)
  - Sentence Builder
- Dashboard with statistics
- Color-coded articles (der=blue, die=red, das=green)
- Search and filter in vocabulary list
- Theme toggle (light/dark mode)
- Responsive navigation with mobile hamburger menu

### Infrastructure
- Supabase database setup with RLS policies
- Server Actions for data mutations
- Middleware for route protection
- Zod validation for forms
- Shadcn/ui component library integration

[0.2.2]: https://github.com/yigityalim/baustein/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/yigityalim/baustein/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/yigityalim/baustein/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yigityalim/baustein/releases/tag/v0.1.0
