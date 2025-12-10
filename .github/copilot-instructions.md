# Copilot Instructions for Baustein Project

## Project Context

This is **Baustein** — a German A1.1 learning platform designed specifically for developers. The philosophy is to "hack" language learning by building custom tools rather than using generic apps.

## Core Principles

### ❌ What NOT to do:
- Don't spend hours perfecting UI/UX — functionality over aesthetics
- Don't suggest new frameworks or libraries unless absolutely necessary
- Don't skip the boring parts — data entry IS part of learning
- Don't move to A1.2 features before A1.1 is complete (avoid "technical debt")
- Don't over-engineer — keep it simple and focused

### ✅ What TO do:
- Focus on A1.1 vocabulary, articles (der/die/das), and basic verb conjugations
- Prioritize features that encourage manual data entry (typing reinforces learning)
- Use gamification for practice (Tinder-style cards, flashcards)
- Keep database design simple and focused on vocabulary learning
- Implement color-coding for articles (der = blue, die = red, das = green)
- Track mistakes to show which words need more practice

## Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase
- **UI Components**: Shadcn/ui (already installed)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/          # Future auth
│   └── (main)/                # Main app with shared layout
│       ├── layout.tsx         # Sidebar/nav
│       ├── page.tsx           # Dashboard
│       ├── add/               # Add new words
│       ├── vocabulary/        # Word list
│       └── practice/
│           ├── articles/      # Der/Die/Das game
│           └── flashcards/    # Flash cards
├── components/
│   ├── ui/                    # Shadcn components
│   ├── layout/                # Nav, sidebar
│   ├── vocabulary/            # Word form, word list
│   └── practice/              # Game components
├── lib/supabase/              # DB clients
├── actions/                   # Server actions
└── types/                     # TypeScript types
```

## Feature Implementation Guidelines

### Vocabulary Management
- Allow manual entry of: German word, article, plural, translation, example sentence
- Use color coding for articles consistently across the app
- Track creation date and last practice date
- Keep mistake counter for spaced repetition

### Practice Modes
- **Articles Practice**: Swipe/click based article selection (Tinder-style)
- **Flashcards**: Front shows German, back shows translation + example
- Show progress and success rate
- Focus on words with higher mistake counts

### Dashboard
- Show total words learned
- Show words that need practice
- Show current streak
- Keep it minimal and informative

## Code Style

- Use Server Components by default
- Use Server Actions for mutations
- Keep components focused and single-purpose
- Comment in English (code) but UI can be Turkish or German
- Use proper TypeScript types (avoid `any`)

## Database Design

Focus on these core tables:
- `words` — vocabulary entries (word, article, plural, translation, example, user_id)
- `practice_sessions` — track practice history
- `mistakes` — log incorrect answers for spaced repetition

## Versioning

**Semantic Versioning (MAJOR.MINOR.PATCH):**
- **MAJOR** (1.0.0): Breaking changes, major feature releases
- **MINOR** (0.x.0): New features, backward compatible
- **PATCH** (0.0.x): Bug fixes, missing files, small tweaks

**Rule:** Every commit that gets pushed to main should increment the version in `package.json` and update `CHANGELOG.md`.

## Reminders

> "The goal is to learn German A1.1, not to build the perfect app."

When suggesting features or changes, always ask: "Does this help with learning A1.1 German?"