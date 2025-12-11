-- 1. SINIF DİLİ VE FİİLLER
insert into vocabulary (word, meaning_tr, type, category, conjugation) values
('fragen', 'soru sormak', 'verb', 'kurssprache', '{"ich": "frage", "du": "fragst", "er_sie_es": "fragt", "wir": "fragen", "ihr": "fragt", "sie_Sie": "fragen"}'::jsonb),
('antworten', 'cevap vermek', 'verb', 'kurssprache', '{"ich": "antworte", "du": "antwortest", "er_sie_es": "antwortet", "wir": "antworten", "ihr": "antwortet", "sie_Sie": "antworten"}'::jsonb),
('lesen', 'okumak', 'verb', 'kurssprache', '{"ich": "lese", "du": "liest", "er_sie_es": "liest", "wir": "lesen", "ihr": "lest", "sie_Sie": "lesen"}'::jsonb),
('sprechen', 'konuşmak', 'verb', 'verbs', '{"ich": "spreche", "du": "sprichst", "er_sie_es": "spricht", "wir": "sprechen", "ihr": "sprecht", "sie_Sie": "sprechen"}'::jsonb),
('sein', 'olmak', 'verb', 'verbs', '{"ich": "bin", "du": "bist", "er_sie_es": "ist", "wir": "sind", "ihr": "seid", "sie_Sie": "sind"}'::jsonb);

-- 2. CÜMLE KALIPLARI (Oyunlar İçin)
insert into sentences (content, meaning_tr, topic, hint, difficulty) values
('Ich heiße Dilara.', 'Benim adım Dilara.', 'begrüssung', 'Cevap', 1),
('Wie geht es dir?', 'Nasılsın? (Samimi)', 'smalltalk', 'Samimi (du)', 1),
('Wie geht es Ihnen?', 'Nasılsınız? (Resmi)', 'smalltalk', 'Resmi (Sie)', 1),
('Er wohnt nicht in Hamburg.', 'O Hamburg''da oturmuyor.', 'negation', 'Olumsuzlama (nicht)', 2),
('Sie arbeitet nicht.', 'O çalışmıyor.', 'negation', 'Olumsuzlama (nicht)', 2),
('Woher kommst du?', 'Nereden geliyorsun?', 'w_fragen', 'Samimi (du)', 1),
('Was heißt das auf Deutsch?', 'Bu Almanca ne demek?', 'kurssprache', null, 1);