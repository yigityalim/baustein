# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.6] - 2025-12-11

### Security
- **Hardened RLS Policies**: Critical security improvements
  - Removed 10+ duplicate RLS policies (authenticated + public duplicates)
  - Added `auth.uid() IS NOT NULL` validation to all policies
  - Separated policies by operation (SELECT/INSERT/UPDATE/DELETE)
  - Implemented consistent naming convention: `{table}_{operation}_policy`
  - Fixed missing SELECT policy for notes table
  - Protected against potential null user_id manipulation

### Fixed
- Sentence builder word alignment (words now display horizontally instead of vertically)

## [0.3.5] - 2025-12-11

### Changed
- Improved spacing in "Hızlı Erişim" quick access card (gap-3 instead of space-y-3)

## [0.3.4] - 2025-12-11

### Added
- **Export/Import Feature**: Backup and restore your data
  - Export all vocabulary and notes as JSON file
  - Import previously exported data
  - Data Management card on dashboard
  - Prevents data loss when switching browsers or clearing cookies

### Fixed
- Mobile Safari input zoom issue (added viewport configuration)
- Prevented auto-zoom on input focus for better mobile UX

## [0.3.3] - 2025-12-11

### Added
- **Persistent Anonymous Session**: Session is now maintained across browser sessions
- **Data Reset Feature**: "Verileri Sıfırla" button with confirmation dialog
  - Deletes all vocabulary, notes, and user data
  - Requires confirmation before deletion
  - Creates fresh start for users

### Changed
- `signInAnonymously` now checks for existing session before creating new one
- Renamed `signOut` to `resetAllData` to better reflect its purpose
- Logout button changed to "Verileri Sıfırla" with destructive action warning

### Fixed
- Anonymous users now retain their data across sessions
- Notes and vocabulary persist after closing the browser

## [0.3.2] - 2025-12-11

### Added
- Notes link in desktop navigation header
- Notes link in mobile navigation menu
- "Hızlı Erişim" quick access card on dashboard with Notes and Vocabulary shortcuts

### Fixed
- Removed `any` type from dashboard recent words mapping

## [0.3.1] - 2025-12-11

### Added
- Logout button in desktop navigation (next to theme toggle)
- Logout button in mobile navigation menu (at bottom)

### Changed
- Updated README with notes feature in Features section
- Updated Roadmap with completed notes item
- Added version badge (v0.3.0) to login page
- Added contributors section with GitHub avatar on login page
- Updated copilot-instructions with README update rule for MINOR versions

## [0.3.0] - 2025-12-11

### Added
- **Notes Feature**: Personal note-taking system for German learning
  - Markdown support for formatting
  - Tag-based organization with visual badges
  - Pin important notes to top
  - Color-coded notes (yellow, red, blue, green)
  - Last updated timestamp with relative time (e.g., "5d önce")
- **TypeScript Type Safety**
  - Replaced all `any` types with `Tables<"notes">`, `TablesInsert`, `TablesUpdate`
  - Full type safety in server actions and components
- **Validation**
  - Zod schema validation for add/update operations
  - Error messages shown to users
- **Loading States**
  - Submit buttons show "Kaydediliyor..." / "Güncelleniyor..."
  - Delete and Pin actions have disabled states during execution
- **SQL Migration Structure**
  - Professional migration files with timestamp naming
  - Separated structure: schema → security → indexes → seed
  - Performance indexes for notes queries

### Changed
- Migrated SQL files to versioned migration format
- Improved tag input UX with badge removal on click

### Database
- New table: `notes` (title, content, tags, is_pinned, color, user_id)
- RLS policies for user-specific note access
- Performance indexes: `idx_notes_user_id`, `idx_notes_pinned_created`, `idx_notes_tags` (GIN)
- Auto-updated `updated_at` trigger using moddatetime extension

## [0.2.4] - 2025-12-11

### Added
- Vercel Analytics for tracking page views and user interactions

## [0.2.3] - 2025-12-11

### Changed
- Modern redesign of login page with better mobile responsiveness
- Added feature highlights (privacy-first, no registration)
- Improved gradient background with dark mode support
- Added GitHub link in footer

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

[0.3.0]: https://github.com/yigityalim/baustein/compare/v0.2.4...v0.3.0
[0.2.4]: https://github.com/yigityalim/baustein/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/yigityalim/baustein/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/yigityalim/baustein/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/yigityalim/baustein/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/yigityalim/baustein/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yigityalim/baustein/releases/tag/v0.1.0
