-- Önce RLS'leri açalım (Zaten açıksa hata vermez)
alter table profiles enable row level security;
alter table study_groups enable row level security;
alter table group_members enable row level security;
alter table word_progress enable row level security;

-- ========================================================
-- 0. EKSİK KOLON DÜZELTMESİ
-- ========================================================
alter table sentences add column if not exists user_id uuid references auth.users default auth.uid();
create index if not exists idx_sentences_user_id on sentences(user_id);

-- ========================================================
-- 1. YARDIMCI FONKSİYON
-- ========================================================
create or replace function get_my_group_ids()
returns setof uuid as $$
  select group_id from group_members where user_id = auth.uid()
$$ language sql security definer;

-- ========================================================
-- 2. VOCABULARY POLICY (Sıfırdan Temiz kurulum)
-- ========================================================
-- Önce Çakışma İhtimali Olan TÜM Politikaları Sil
drop policy if exists "vocabulary_select_policy" on vocabulary;
drop policy if exists "vocabulary_insert_policy" on vocabulary;
drop policy if exists "vocabulary_update_policy" on vocabulary;
drop policy if exists "vocabulary_delete_policy" on vocabulary;
drop policy if exists "Users can crud own vocabulary" on vocabulary;
drop policy if exists "Users can view own OR public vocabulary" on vocabulary;
-- Yeni oluşturacaklarımızı da sil (Hata sebebi buydu)
drop policy if exists "vocabulary_select_mixed" on vocabulary;
drop policy if exists "vocabulary_insert_mixed" on vocabulary;
drop policy if exists "vocabulary_modify_own" on vocabulary;

-- Şimdi Oluştur
create policy "vocabulary_select_mixed" on vocabulary for select to authenticated using (
  (auth.uid() = user_id AND group_id IS NULL) OR (group_id in (select get_my_group_ids()))
);

create policy "vocabulary_insert_mixed" on vocabulary for insert to authenticated with check (
  (auth.uid() = user_id AND group_id IS NULL) OR (group_id in (select get_my_group_ids()) AND auth.uid() = user_id)
);

create policy "vocabulary_modify_own" on vocabulary for all to authenticated using (
  auth.uid() = user_id
);

-- ========================================================
-- 3. NOTES POLICY
-- ========================================================
-- Temizlik
drop policy if exists "notes_select_policy" on notes;
drop policy if exists "notes_insert_policy" on notes;
drop policy if exists "notes_update_policy" on notes;
drop policy if exists "notes_delete_policy" on notes;
drop policy if exists "Users can crud own notes" on notes;
-- Yenileri sil
drop policy if exists "notes_select_mixed" on notes;
drop policy if exists "notes_insert_mixed" on notes;
drop policy if exists "notes_modify_own" on notes;

-- Oluştur
create policy "notes_select_mixed" on notes for select to authenticated using (
  (auth.uid() = user_id AND group_id IS NULL) OR (group_id in (select get_my_group_ids()))
);

create policy "notes_insert_mixed" on notes for insert to authenticated with check (
  (auth.uid() = user_id AND group_id IS NULL) OR (group_id in (select get_my_group_ids()))
);

create policy "notes_modify_own" on notes for all to authenticated using (
  auth.uid() = user_id
);

-- ========================================================
-- 4. SENTENCES POLICY
-- ========================================================
-- Temizlik
drop policy if exists "Public read access for sentences" on sentences;
drop policy if exists "sentences_read_mixed" on sentences;
drop policy if exists "sentences_insert_group" on sentences;
drop policy if exists "sentences_modify_own" on sentences;
drop policy if exists "sentences_delete_own" on sentences;

-- Oluştur
create policy "sentences_read_mixed" on sentences for select to authenticated using (
  group_id IS NULL 
  OR group_id in (select get_my_group_ids()) 
  OR user_id = auth.uid()
);

create policy "sentences_insert_group" on sentences for insert to authenticated with check (
  group_id in (select get_my_group_ids()) OR user_id = auth.uid()
);

create policy "sentences_modify_own" on sentences for update to authenticated using (
  user_id = auth.uid()
);

create policy "sentences_delete_own" on sentences for delete to authenticated using (
  user_id = auth.uid()
);

-- ========================================================
-- 5. YENİ TABLOLAR (PROFILES, GROUPS, MEMBERS)
-- ========================================================

-- PROFILES Temizlik ve Oluşturma
drop policy if exists "Read public profiles" on profiles;
drop policy if exists "Update own profile" on profiles;

create policy "Read public profiles" on profiles for select to authenticated using (true);
create policy "Update own profile" on profiles for update to authenticated using (auth.uid() = id);

-- STUDY GROUPS Temizlik ve Oluşturma
drop policy if exists "Read my groups" on study_groups;
drop policy if exists "Insert groups" on study_groups;
drop policy if exists "Update my groups" on study_groups;
drop policy if exists "Delete my groups" on study_groups;

-- Mantık: Üye olduğum VEYA Kurucusu olduğum grupları gör
create policy "Read my groups" on study_groups for select to authenticated using (
  id in (select get_my_group_ids()) OR created_by = auth.uid()
);

create policy "Insert groups" on study_groups for insert to authenticated with check (auth.uid() = created_by);
create policy "Update my groups" on study_groups for update to authenticated using (created_by = auth.uid());
create policy "Delete my groups" on study_groups for delete to authenticated using (created_by = auth.uid());

-- GROUP MEMBERS Temizlik ve Oluşturma
drop policy if exists "Read members" on group_members;
drop policy if exists "Join group" on group_members;
drop policy if exists "Leave group" on group_members;

create policy "Read members" on group_members for select to authenticated using (
  group_id in (select get_my_group_ids())
);
create policy "Join group" on group_members for insert to authenticated with check (auth.uid() = user_id);
create policy "Leave group" on group_members for delete to authenticated using (auth.uid() = user_id);

-- WORD PROGRESS Temizlik ve Oluşturma
drop policy if exists "Manage my progress" on word_progress;

create policy "Manage my progress" on word_progress for all to authenticated using (auth.uid() = user_id);