-- 1. VOCABULARY INDEXLERİ
-- Kelime arama ve oyunlarda filtreleme için
create index if not exists idx_vocabulary_word on vocabulary (word);

create index if not exists idx_vocabulary_type on vocabulary (type);

create index if not exists idx_vocabulary_user_id on vocabulary (user_id);

-- 2. SENTENCES INDEXLERİ
-- Konuya göre oyun başlatırken hız kazandırır
create index if not exists idx_sentences_topic on sentences (topic);

-- 3. NOTES INDEXLERİ (Senin eklediğin kısım)
-- Index for user-specific queries
create index if not exists idx_notes_user_id on notes (user_id);

-- Composite index for the common query pattern (pinned + created_at sorting)
create index if not exists idx_notes_pinned_created on notes (user_id, is_pinned desc, created_at desc);

-- GIN index for tag searches (Array içinde arama yapmak için)
create index if not exists idx_notes_tags on notes using gin (tags);