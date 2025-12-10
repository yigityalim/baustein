# 🧱 Baustein

> **Stein auf Stein** — Building German A1.1, one block at a time.

A developer-focused German language learning platform. Because we'd rather build custom tools than use generic apps.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)

---

## 📸 Preview

![Baustein Dashboard](docs/screenshots/desktop-dashboard.png)

---

## 🎯 Philosophy

**Don't skip A1.1.** Master articles (der/die/das), basic verb conjugations, and sentence structure before moving forward.

**Learn by building, not by clicking.** Manual data entry (typing German words) reinforces learning better than multiple-choice buttons.

---

## ✨ Features

### 📚 Vocabulary Management
- Add words with article, plural, translation, and example sentences
- Color-coded articles: **der** (blue), **die** (red), **das** (green)
- Edit and delete entries
- Search and filter your personal dictionary

### 🎮 Practice Modes
- **Artikel Trainer** — Tinder-style card game for der/die/das
- **Flashcards** — Classic flip cards with translations
- **Number Trainer** — Practice German numbers (0-99)
- **Sentence Builder** — Construct German sentences from words

### 🎨 Modern UI
- Dark mode support
- Fully responsive (mobile-first design)
- Smooth animations and transitions
- Progress tracking with visual feedback

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm (or npm/yarn)
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yigityalim/baustein.git
   cd baustein
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and anon key

   ```bash
   cp .env.example .env.local
   ```

4. **Create database tables**
   
   Run this SQL in your Supabase SQL Editor:

   ```sql
   -- Vocabulary table
   CREATE TABLE vocabulary (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     word TEXT NOT NULL,
     article TEXT CHECK (article IN ('der', 'die', 'das')),
     type TEXT NOT NULL DEFAULT 'noun',
     plural TEXT,
     meaning_tr TEXT NOT NULL,
     example_sentence TEXT,
     conjugation JSONB,
     mistake_count INTEGER DEFAULT 0,
     correct_count INTEGER DEFAULT 0,
     level TEXT DEFAULT 'new',
     last_practiced_at TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Users can view their own vocabulary"
     ON vocabulary FOR SELECT
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own vocabulary"
     ON vocabulary FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update their own vocabulary"
     ON vocabulary FOR UPDATE
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete their own vocabulary"
     ON vocabulary FOR DELETE
     USING (auth.uid() = user_id);
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Form Validation**: Zod
- **Icons**: Lucide React
- **Theme**: next-themes

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/login/          # Authentication
│   └── (main)/                # Main app
│       ├── layout.tsx         # Navigation & header
│       ├── page.tsx           # Dashboard
│       ├── add/               # Add new words
│       ├── vocabulary/        # Word list
│       └── practice/          # Practice modes
│           ├── articles/      # Der/Die/Das game
│           ├── flashcards/    # Flashcards
│           ├── numbers/       # Number trainer
│           └── sentences/     # Sentence builder
├── components/
│   ├── ui/                    # shadcn components
│   ├── layout/                # Navigation components
│   ├── vocabulary/            # Word forms & dialogs
│   └── practice/              # Game components
├── lib/supabase/              # Supabase clients
├── actions/                   # Server actions
└── types/                     # TypeScript types
```

---

## 🎯 Roadmap

- [x] Vocabulary CRUD operations
- [x] Artikel practice game
- [x] Flashcards
- [x] Number trainer
- [x] Sentence builder
- [x] Dark mode
- [x] Mobile responsive design
- [ ] Verb conjugation practice
- [ ] Spaced repetition algorithm
- [ ] Progress tracking (daily streaks, mastery levels)
- [ ] Category system (colors, days, months, etc.)
- [ ] Audio pronunciation
- [ ] Export/Import vocabulary

---

## 🤝 Contributing

Contributions are welcome! Whether it's:
- Adding German vocabulary lists
- Fixing bugs
- Improving UI/UX
- Adding new practice modes
- Documentation improvements

Please feel free to open issues or submit pull requests.

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ for developers learning German A1.1.

> "The goal is to learn German, not to build the perfect app."

- ❌ UI/UX ile saatler harcama
- ❌ Yeni bir framework öğrenmeye çalışma
- ✅ Veriyi (kelimeleri) elle gir — veri girişi çalışmanın bir parçasıdır
- ✅ A1.1'i "teknik borç" bırakmadan bitir
