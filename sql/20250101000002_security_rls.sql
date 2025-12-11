-- Otomatik updated_at güncellemesi için eklenti
create extension if not exists moddatetime schema extensions;

-- Triggerları Tanımla
create trigger handle_updated_at_vocabulary before
update on vocabulary for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at_notes before
update on notes for each row execute procedure moddatetime (updated_at);

-- RLS Aktifleştir
alter table vocabulary enable row level security;

alter table sentences enable row level security;

alter table notes enable row level security;

-- POLİTİKALAR (POLICIES)
-- A. Vocabulary (Tamamen Kişisel)
create policy "Users can crud own vocabulary" on vocabulary for all to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

-- B. Notes (Tamamen Kişisel)
create policy "Users can crud own notes" on notes for all to authenticated using (auth.uid () = user_id)
with
    check (auth.uid () = user_id);

-- C. Sentences (Herkes Okur, Kimse Silemez)
create policy "Public read access for sentences" on sentences for
select
    to public using (true);

-- Yazma izni verilmediği için, sadece Service Role (Admin) veri ekleyebilir.