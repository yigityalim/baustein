# 🚀 Baustein A1.1 - Geliştirme Yol Haritası (Roadmap)

Bu liste, mevcut "Kelime ve Not" sistemini tam kapsamlı bir dil öğrenme platformuna dönüştürmek için gereken özellikleri **kodlama zorluğuna göre** (Kolaydan Zora) sıralar.

---

## 🟢 Faz 1: İçerik ve Veri Genişletme (Düşük Zorluk)
*Mevcut altyapı (Vocabulary & SentenceBuilder) kullanılarak yapılacaklar.*

### 1. Aile & Meslek Temelleri (Vocabulary)
- **Görev:** `vocabulary` tablosuna 'family' ve 'jobs' kategorileri ekle.
- **İçerik:** Mutter, Vater, Lehrer, Arzt vb.
- **Kod:** Sadece SQL Seed veya Formdan veri girişi.

### 2. Sıfatlar ve Zıt Anlamlılar (Adjectives)
- **Görev:** `vocabulary` tablosuna sıfatları çiftler halinde ekle.
- **Mekanizma:** Flashcard modülünde "Ön Yüz: groß" -> "Arka Yüz: klein" şeklinde çalışacak.
- **Kod:** SQL Seed (groß/klein, schön/hässlich).

### 3. Word Order (Satzbau) - V2 Kuralı
- **Görev:** Mevcut `SentenceBuilder` oyununa özel "Topic"ler ekle.
- **Senaryolar:**
    - `w_frage`: Fiil 2. sırada (Wo *wohnst* du?)
    - `ja_nein`: Fiil 1. sırada (*Trinkst* du Tee?)
    - `aussage`: Zaman başta, Fiil 2. sırada (Morgen *gehe* ich ins Kino.)
- **Kod:** Sadece `sentences` tablosuna doğru verileri girmek yeterli.

---

## 🟡 Faz 2: Yeni UI Bileşenleri (Orta Zorluk)
*Yeni tablolar veya yeni React bileşenleri gerektirenler.*

### 4. Kelime Bağlama (Phrasebuilder)
- **Mantık:** Kullanıcıya yarım cümle verilir, kalanı tamamlaması istenir.
- **UI:** `Ich möchte ...` (Sabit) + `[bir kahve] [bir su] [hesabı]` (Seçenekler).
- **Kod:** `SentenceBuilder`'ın basitleştirilmiş, tek boşluklu versiyonu. `cloze_test` (boşluk doldurma) mantığı.

### 5. Saatler (Uhrzeit Quiz)
- **Mantık:** Ekrana analog bir saat (SVG veya Resim) gelir, kullanıcı saati yazar veya seçer.
- **UI:** Saat görseli bileşeni.
- **Veri:** "14:30" -> "Es ist halb drei".
- **Kod:** Yeni bir `ClockGame` bileşeni.

### 6. Mini Reading (Lesen A1.1)
- **Mantık:** 3-5 cümlelik kısa paragraf ve altında 3 adet çoktan seçmeli soru.
- **Veri Yapısı:** `reading_passages` tablosu (title, content, questions JSONB).
- **Kod:** Metni gösteren ve soruları doğrulayan yeni bir sayfa (`/practice/reading`).

### 7. Seslendirme (TTS - Text to Speech) 🔊 (ÖNEMLİ EKLEME)
- **Mantık:** Kelimenin yanındaki hoparlöre basınca okur.
- **Kod:** `window.speechSynthesis` API kullanılarak basit bir hook (`useTTS`). Maliyeti sıfırdır.

---

## 🔴 Faz 3: İleri Seviye Mantık ve AI (Yüksek Zorluk)
*Karmaşık veri yapıları ve dış servisler.*

### 8. Mikro-Diyalog Simülasyonu (Chat UI)
- **Mantık:** WhatsApp benzeri bir ekranda bot bir şey sorar, kullanıcı 3 seçenekten birini seçer. Seçime göre diyalog ilerler.
- **Veri Yapısı:** Dallanan bir ağaç yapısı (Decision Tree).
    - Bot: "Hallo!" -> Seçenekler: ["Hallo", "Tschüss"]
    - "Hallo" seçilirse -> Bot: "Wie geht's?"
- **Kod:** Yeni bir `DialogueTrainer` motoru. State yönetimi karmaşıktır.

### 9. Günlük Rutinler (Ayrılabilen Fiiller Mantığı)
- **Mantık:** "aufstehen" fiili cümlede ayrılır: "Ich **stehe** um 7 Uhr **auf**."
- **Kod:** `SentenceBuilder` içinde bu kelimenin iki parça olduğunu ve birinin en sona gitmesi gerektiğini doğrulayan özel bir algoritma (Regex veya özel işaretleme).

### 10. AI Story Generator (Yapay Zeka Hikaye)
- **Mantık:** "Bana 'Aile' ve 'Yemek' hakkında A1.1 seviyesinde hikaye yaz" butonuna basınca hikaye üretmesi.
- **Kod:** OpenAI API (Vercel AI SDK) entegrasyonu. Prompt mühendisliği gerekir ("Use simple A1.1 vocabulary...").

### 11. Output Checkpoints (Sınav Modu)
- **Mantık:** Tüm modüllerden karma 20 soruluk bir sınav.
- **Ödül:** %80 üzeri başarıda "A1.1 Sertifikası" (Rozet) kazanımı.
- **Kod:** Tüm oyun mekaniklerini tek bir sayfada ardışık (Sequential) çalıştırmak.