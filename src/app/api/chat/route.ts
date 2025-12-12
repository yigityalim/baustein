import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: convertToModelMessages(messages),
    system: `Sen Baustein adında, sabırlı ve motive edici bir Almanca A1.1 öğretmenisin.
    Öğrencilerin ana dili Türkçe. Onlara dilbilgisi kurallarını Türkçe açıkla ama örnekleri Almanca ver.

    🔴 KIRMIZI ÇİZGİLER (KESİN KURALLAR):
    1. Konuşma tarzın her zaman A1.1 seviyesinde (Basit cümleler, Şimdiki Zaman) olsun. 'Präteritum' veya 'Konjunktiv' kullanma.
    2. Kullanıcı bir alıştırma, quiz, test veya senaryo istediğinde **ASLA** normal metin (chat) olarak cevap verme. **MUTLAKA** aşağıda tanımlanan uygun 'tool'u çalıştır.
    3. Eğer kullanıcı sadece "Merhaba", "Nasılsın" derse normal sohbet et. Ama "Alıştırma yapalım" dediği an Tool moduna geç.

    🛠️ TOOL KULLANIM REHBERİ:
    
    - Kelime testi, Sınav, Saatler, Zıt Anlamlılar -> 'generate_quiz'
    - Cümle Kurma, V2 Kuralı, Sıralama -> 'generate_sentence_drill'
    - Boşluk Doldurma, Ich möchte..., Kalıplar -> 'generate_cloze_test'
    - Okuma, Hikaye, Metin Analizi -> 'generate_reading_exercise'
    - "Cümlem doğru mu?", "Hatam nerede?" -> 'generate_grammar_analysis'
    - "Bu nasıl okunur?", "Telaffuz" -> 'generate_pronunciation_guide'
    - "Rol yapalım", "Sen garson ol" -> 'generate_roleplay_start'
    `,
    
    tools: {
      // 1. ÇOKTAN SEÇMELİ QUIZ
      generate_quiz: tool({
        description: 'Çoktan seçmeli soru seti (Quiz) oluşturur.',
        inputSchema: z.object({
          topic: z.string().describe('Testin konusu (örn: Aile, Saatler)'),
          questions: z.array(z.object({
            id: z.string(),
            question: z.string().describe('Almanca soru metni'),
            options: z.array(z.string()).describe('4 adet seçenek'),
            correctAnswer: z.string().describe('Doğru olan seçenek (options içinde olmalı)'),
            explanation: z.string().describe('Neden doğru olduğuna dair Türkçe açıklama')
          })).min(1).describe('En az 1 soru olmalı')
        }),
        execute: async (props) => props,
      }),

      // 2. CÜMLE SIRALAMA (Satzbau)
      generate_sentence_drill: tool({
        description: 'Karışık kelimelerden cümle kurma alıştırması.',
        inputSchema: z.object({
          topic: z.string().describe('Konu (örn: V2 Kuralı)'),
          sentences: z.array(z.object({
            id: z.string(),
            question: z.string().describe('Yönerge (örn: Kelimeleri sırala)'),
            scrambled: z.array(z.string()).describe('Karışık verilmiş kelimeler listesi'),
            correctSentence: z.string().describe('Doğru kurulmuş cümle'),
            explanation: z.string().describe('Gramer kuralı açıklaması')
          }))
        }),
        execute: async (props) => props,
      }),

      // 3. BOŞLUK DOLDURMA (Cloze Test)
      generate_cloze_test: tool({
        description: 'Cümledeki eksik kelimeyi bulma alıştırması.',
        inputSchema: z.object({
          topic: z.string().describe('Konu (örn: Restoran Siparişi)'),
          exercises: z.array(z.object({
            id: z.string(),
            sentencePart: z.string().describe('Cümlenin görünen kısmı (boşluksuz) örn: "Ich möchte"'),
            missingPart: z.string().describe('Sadece eksik olan kelime örn: "bezahlen"'),
            fullSentence: z.string().describe('Cümlenin tamamı'),
            options: z.array(z.string()).describe('Boşluğa gelebilecek 3 yanlış 1 doğru seçenek'),
            hint: z.string().describe('Türkçe ipucu')
          }))
        }),
        execute: async (props) => props,
      }),

      // 4. OKUMA VE HİKAYE (Reading)
      generate_reading_exercise: tool({
        description: 'Okuma parçası ve anlama soruları oluşturur.',
        inputSchema: z.object({
          title: z.string(),
          content: z.string().describe('A1.1 seviyesinde Almanca metin (Max 10 cümle)'),
          translation: z.string().describe('Metnin Türkçe özeti'),
          questions: z.array(z.object({
            id: z.string(),
            question: z.string().describe('Metinle ilgili Almanca soru'),
            options: z.array(z.string()),
            correctAnswer: z.string()
          }))
        }),
        execute: async (props) => props,
      }),

      // 5. GRAMER ANALİZİ (Correction)
      generate_grammar_analysis: tool({
        description: 'Kullanıcının yazdığı cümleyi analiz eder ve düzeltir.',
        inputSchema: z.object({
          originalSentence: z.string(),
          correctedSentence: z.string().describe('Cümlenin dilbilgisi açısından en doğru hali'),
          isCorrect: z.boolean().describe('Cümle hatasızsa true'),
          errors: z.array(z.object({
            part: z.string().describe('Hatalı bölüm'),
            correction: z.string().describe('Olması gereken'),
            rule: z.string().describe('İhlal edilen kuralın Türkçe açıklaması')
          })).optional(),
          feedback: z.string().describe('Motive edici Türkçe geri bildirim')
        }),
        execute: async (props) => props,
      }),

      // 6. TELAFFUZ REHBERİ
      generate_pronunciation_guide: tool({
        description: 'Zor sesler için telaffuz ipuçları verir.',
        inputSchema: z.object({
          sound: z.string().describe('Odaklanılan ses (örn: ä, ch, r)'),
          tips: z.string().describe('Nasıl çıkarılacağına dair Türkçe taktik'),
          examples: z.array(z.object({
            word: z.string(),
            meaning: z.string(),
            pronunciationTr: z.string().describe('Türkçe okunuş benzeri (örn: "ih" gibi)')
          }))
        }),
        execute: async (props) => props,
      }),

      // 7. ROL YAPMA (Diyalog Başlatıcı)
      generate_roleplay_start: tool({
        description: 'Belirli bir senaryoda diyalog başlatır.',
        inputSchema: z.object({
          scenario: z.string().describe('Senaryo (örn: Kafede Sipariş)'),
          userRole: z.string().describe('Kullanıcının rolü (örn: Müşteri)'),
          aiRole: z.string().describe('AI rolü (örn: Garson)'),
          starterMessage: z.string().describe('AI\'ın diyaloğu başlatan ilk cümlesi'),
          mission: z.string().describe('Kullanıcının bu diyalogdaki amacı (örn: Kahve sipariş et)')
        }),
        execute: async (props) => props,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}