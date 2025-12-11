-- RLS Policy'lerini temizle ve güvenli hale getir
-- Bu script'i Supabase SQL Editor'de çalıştır
-- ============================================
-- 1. TÜM ESKİ POLİCY'LERİ SİL
-- ============================================
-- Vocabulary duplicate ve eski policy'ler
drop policy if exists "Users can delete own vocabulary" on vocabulary;

drop policy if exists "Users can delete their own vocabulary" on vocabulary;

drop policy if exists "Users can insert own vocabulary" on vocabulary;

drop policy if exists "Users can insert their own vocabulary" on vocabulary;

drop policy if exists "Users can update own vocabulary" on vocabulary;

drop policy if exists "Users can update their own vocabulary" on vocabulary;

drop policy if exists "Users can view own vocabulary" on vocabulary;

drop policy if exists "Users can view their own vocabulary" on vocabulary;

drop policy if exists "Users can select own vocabulary" on vocabulary;

-- Notes eski policy'ler
drop policy if exists "Users can crud own notes" on notes;

drop policy if exists "Users can select own notes" on notes;

drop policy if exists "Users can insert own notes" on notes;

drop policy if exists "Users can update own notes" on notes;

drop policy if exists "Users can delete own notes" on notes;

-- ============================================
-- 2. YENİ GÜVENLİ POLİCY'LERİ EKLE
-- ============================================
-- VOCABULARY POLİCİES
create policy "vocabulary_select_policy" on vocabulary for
select
    to authenticated using (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "vocabulary_insert_policy" on vocabulary for insert to authenticated
with
    check (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "vocabulary_update_policy" on vocabulary for
update to authenticated using (
    auth.uid () is not null
    and auth.uid () = user_id
)
with
    check (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "vocabulary_delete_policy" on vocabulary for delete to authenticated using (
    auth.uid () is not null
    and auth.uid () = user_id
);

-- NOTES POLİCİES
create policy "notes_select_policy" on notes for
select
    to authenticated using (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "notes_insert_policy" on notes for insert to authenticated
with
    check (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "notes_update_policy" on notes for
update to authenticated using (
    auth.uid () is not null
    and auth.uid () = user_id
)
with
    check (
        auth.uid () is not null
        and auth.uid () = user_id
    );

create policy "notes_delete_policy" on notes for delete to authenticated using (
    auth.uid () is not null
    and auth.uid () = user_id
);

-- ============================================
-- 3. DOĞRULAMA
-- ============================================
-- Aşağıdaki SQL'i çalıştırarak yeni policy'leri kontrol et:
/*
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public'
AND tablename IN ('vocabulary', 'notes', 'sentences')
ORDER BY tablename, cmd;
 */