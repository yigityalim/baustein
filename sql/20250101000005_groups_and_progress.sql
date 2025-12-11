-- 1. PROFILES TABLOSU (Skor Tablosu ve Kullanıcı Bilgisi için)
-- Auth.users tablosu gizlidir, leaderboard için public bir tablo şart.
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  xp int default 0, -- Toplam Puan (Gamification)
  current_streak int default 0, -- Günlük seri
  last_study_date date, -- Streak takibi için
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Yeni kullanıcı kaydolduğunda Profile otomatik oluşsun (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, xp)
  values (new.id, new.raw_user_meta_data->>'full_name', 0);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. STUDY GROUPS (Çalışma Grupları)
create table study_groups (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  join_code text unique not null, -- Arkadaşına atacağın kod (örn: 'ALM-101')
  created_by uuid references auth.users default auth.uid()
);

-- 3. GROUP MEMBERS (Üyeler)
create table group_members (
  id uuid default gen_random_uuid() primary key,
  group_id uuid references study_groups on delete cascade,
  user_id uuid references auth.users on delete cascade,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(group_id, user_id)
);

-- 4. WORD PROGRESS (Kelime Bazlı İlerleme - Kritik Tablo!)
-- Vocabulary tablosundaki mistake_count yerine artık burası kullanılacak.
-- Böylece ortak havuzdaki bir kelime için herkesin kendi istatistiği olur.
create table word_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  vocabulary_id uuid references vocabulary on delete cascade,
  
  correct_count int default 0,
  mistake_count int default 0,
  last_practiced_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Spaced Repetition için Next Review (Opsiyonel ama önerilir)
  next_review_at timestamp with time zone default timezone('utc'::text, now()),
  
  unique(user_id, vocabulary_id) -- Bir kullanıcı bir kelime için tek bir ilerleme satırına sahip olabilir
);

-- 5. MEVCUT TABLOLARA GROUP_ID EKLEME
-- Eğer group_id NULL ise -> Kişisel veridir.
-- Eğer group_id DOLU ise -> O gruba aittir.
alter table vocabulary add column group_id uuid references study_groups(id) on delete cascade;
alter table sentences add column group_id uuid references study_groups(id) on delete cascade;
alter table notes add column group_id uuid references study_groups(id) on delete cascade;

-- Indexler (Performans)
create index idx_word_progress_user on word_progress(user_id);
create index idx_vocab_group on vocabulary(group_id);
create index idx_profiles_xp on profiles(xp desc); -- Leaderboard sıralaması için