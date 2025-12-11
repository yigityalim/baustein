-- ENUM Tipleri
create type word_type as enum ('noun', 'verb', 'adjective', 'phrase', 'number', 'other');
create type article_type as enum ('der', 'die', 'das');
create type mastery_level as enum ('new', 'learning', 'review', 'mastered');

-- 1. VOCABULARY TABLOSU (Kişisel Sözlük)
create table vocabulary (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc', now()) not null,
  updated_at timestamp with time zone default timezone('utc', now()) not null,

  word text not null,
  meaning_tr text not null,
  type word_type not null default 'noun',
  
  article article_type,
  plural text,
  conjugation jsonb, -- Fiil çekimleri: {"ich": "bin", "du": "bist"}
  
  example_sentence text,
  image_url text,
  category text, -- 'numbers', 'food', 'verbs' vb.
  tags text[],
  
  level mastery_level default 'new',
  mistake_count int default 0,
  correct_count int default 0,
  last_practiced_at timestamp with time zone,
  
  user_id uuid references auth.users default auth.uid()
);

-- 2. SENTENCES TABLOSU (Ders İçerikleri - Sistem Verisi)
create table sentences (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  content text not null,       -- "Wohnst du in Berlin?"
  meaning_tr text not null,    -- "Berlin'de mi yaşıyorsun?"
  topic text not null,         -- "ja_nein", "w_fragen", "negation"
  hint text,                   -- "Resmi (Sie)", "Samimi (du)"
  difficulty int default 1
);

-- 3. NOTES TABLOSU (Kişisel Notlar)
create table notes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  title text,
  content text not null,       -- Markdown
  tags text[] default '{}',
  is_pinned boolean default false,
  color text default 'bg-card',
  
  user_id uuid references auth.users default auth.uid()
);