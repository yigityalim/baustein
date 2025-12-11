-- 1. XP ve STREAK Güncelleme Fonksiyonu
-- Bu fonksiyonu "Alıştırma bittiğinde" çağıracaksın.
create or replace function update_user_xp(
  p_xp_amount int
)
returns void as $$
declare
  v_last_study date;
  v_current_date date;
begin
  v_current_date := current_date;
  
  -- Mevcut kullanıcının son çalışma tarihini al
  select last_study_date into v_last_study from profiles where id = auth.uid();
  
  -- Streak Mantığı
  if v_last_study is null or v_last_study < (v_current_date - 1) then
    -- Hiç çalışmamış veya seriyi bozmuş (dünden önce) -> Streak 1
    update profiles 
    set xp = xp + p_xp_amount, 
        current_streak = 1, 
        last_study_date = v_current_date
    where id = auth.uid();
    
  elsif v_last_study = (v_current_date - 1) then
    -- Dün çalışmış -> Streak artır
    update profiles 
    set xp = xp + p_xp_amount, 
        current_streak = current_streak + 1, 
        last_study_date = v_current_date
    where id = auth.uid();
    
  else
    -- Bugün zaten çalışmış -> Sadece XP artır
    update profiles 
    set xp = xp + p_xp_amount 
    where id = auth.uid();
  end if;
end;
$$ language plpgsql security definer;

-- 2. Kelime İlerlemesini Kaydetme Fonksiyonu (Upsert)
-- Bir kelimeye doğru/yanlış cevap verildiğinde çağrılacak.
create or replace function record_word_practice(
  p_vocab_id uuid,
  p_is_correct boolean
)
returns void as $$
begin
  insert into word_progress (user_id, vocabulary_id, correct_count, mistake_count, last_practiced_at)
  values (
    auth.uid(), 
    p_vocab_id, 
    case when p_is_correct then 1 else 0 end, 
    case when p_is_correct then 0 else 1 end, 
    now()
  )
  on conflict (user_id, vocabulary_id) do update
  set 
    correct_count = word_progress.correct_count + (case when p_is_correct then 1 else 0 end),
    mistake_count = word_progress.mistake_count + (case when p_is_correct then 0 else 1 end),
    last_practiced_at = now();
end;
$$ language plpgsql security definer;