'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, MessageSquare, Zap, CheckCircle2, Sparkles, Brain, Clock, 
  Users, Coffee, Home, Briefcase, Volume2, Send, Loader2, Trophy, 
  Target, BookText, Languages, GraduationCap, Play, RefreshCw,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

function QuizCard({ topic, questions }: { topic: string, questions: any[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelect = (option: string) => {
    if (selectedOption) return;
    setSelectedOption(option);
    if (option === currentQ.correctAnswer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(p => p + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <Card className="w-full my-4 border-l-4 border-l-blue-500">
        <CardContent className="text-center py-6 space-y-4">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
          <div className="text-2xl font-bold">{score} / {questions.length}</div>
          <p className="text-muted-foreground">Test tamamlandı!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full my-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{topic}</CardTitle>
          <Badge variant="secondary">{currentIdx + 1} / {questions.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium text-lg">{currentQ.question}</p>
        <div className="grid gap-2">
          {currentQ.options.map((opt: string) => {
            let variant = "outline";
            let className = "justify-start text-left h-auto py-3 px-4";
            
            if (selectedOption) {
              if (opt === currentQ.correctAnswer) {
                className += " bg-green-100 border-green-500 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
              } else if (selectedOption === opt) {
                className += " bg-red-100 border-red-500 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400";
              } else {
                className += " opacity-50";
              }
            }

            return (
              <Button
                key={opt}
                variant={variant as any}
                className={className}
                onClick={() => handleSelect(opt)}
                disabled={!!selectedOption}
              >
                {opt}
                {selectedOption && opt === currentQ.correctAnswer && <CheckCircle2 className="ml-auto h-4 w-4 text-green-600"/>}
                {selectedOption && selectedOption === opt && opt !== currentQ.correctAnswer && <XCircle className="ml-auto h-4 w-4 text-red-600"/>}
              </Button>
            );
          })}
        </div>
        {selectedOption && (
          <div className="mt-4 p-3 bg-muted rounded-md text-sm animate-in fade-in">
            <span className="font-bold">Açıklama: </span>{currentQ.explanation}
          </div>
        )}
      </CardContent>
      {selectedOption && (
        <CardFooter>
          <Button className="w-full" onClick={handleNext}>
            {currentIdx < questions.length - 1 ? "Sonraki Soru" : "Sonuçları Gör"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function SentenceDrillCard({ topic, sentences }: { topic: string, sentences: any[] }) {
  return (
    <Card className="w-full my-4 border-l-4 border-l-purple-500">
      <CardHeader>
        <CardTitle className="text-lg">Alıştırma: {topic}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sentences.map((item, idx) => (
          <div key={idx} className="p-4 bg-muted/30 rounded-lg border space-y-3">
            <p className="font-medium text-sm text-muted-foreground">{item.question}</p>
            <div className="flex flex-wrap gap-2">
              {item.scrambled.map((word: string, i: number) => (
                <Badge key={i} variant="outline" className="text-base px-3 py-1.5 bg-background shadow-sm">
                  {word}
                </Badge>
              ))}
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
              <span className="font-bold text-green-700 dark:text-green-400 text-sm block mb-1">Doğru Cevap:</span>
              <p className="text-lg font-medium">{item.correctSentence}</p>
            </div>
            <p className="text-xs text-muted-foreground italic border-t pt-2">{item.explanation}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ClozeTestCard({ topic, exercises }: { topic: string, exercises: any[] }) {
  return (
    <Card className="w-full my-4 border-l-4 border-l-yellow-500">
      <CardHeader>
        <CardTitle className="text-lg">Boşluk Doldurma: {topic}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {exercises.map((ex, idx) => (
          <div key={idx} className="p-4 border rounded-lg bg-card shadow-sm">
            <div className="text-lg mb-3 flex items-center gap-2 flex-wrap">
              <span>{ex.sentencePart}</span>
              <span className="border-b-2 border-primary w-24 inline-block text-center font-bold text-primary">?</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ex.options.map((opt: string, i: number) => (
                <div key={i} className={`text-sm p-2 rounded border text-center ${opt === ex.missingPart ? 'bg-green-100 dark:bg-green-900/30 border-green-500 font-bold' : 'bg-muted/50'}`}>
                  {opt}
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> İpucu: {ex.hint}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ReadingCard({ title, content, translation, questions }: { title: string, content: string, translation: string, questions: any[] }) {
  return (
    <Card className="w-full my-4 border-l-4 border-l-pink-500">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookText className="w-5 h-5" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose dark:prose-invert max-w-none bg-muted/30 p-4 rounded-lg">
          <p className="text-lg leading-relaxed">{content}</p>
        </div>
        <div className="text-sm text-muted-foreground italic border-l-2 pl-4">
          <span className="font-semibold not-italic block mb-1">Türkçesi:</span>
          {translation}
        </div>
        <Separator />
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Sorular</h4>
          {questions.map((q, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-medium">{idx + 1}. {q.question}</p>
              <div className="grid grid-cols-1 gap-1 pl-4">
                {q.options.map((opt: string, i: number) => (
                  <div key={i} className={`text-sm ${opt === q.correctAnswer ? 'text-green-600 font-bold' : 'text-muted-foreground'}`}>
                    • {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GrammarAnalysisCard({ originalSentence, correctedSentence, isCorrect, errors, feedback }: any) {
  return (
    <Card className={cn("w-full my-4 border-l-4", isCorrect ? "border-l-green-500" : "border-l-red-500")}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
          Dilbilgisi Analizi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900">
            <span className="text-xs font-bold text-red-600 dark:text-red-400 block mb-1">Senin Cümlen:</span>
            <p>{originalSentence}</p>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900">
            <span className="text-xs font-bold text-green-600 dark:text-green-400 block mb-1">Doğrusu:</span>
            <p>{correctedSentence}</p>
          </div>
        </div>
        
        {errors && errors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Hatalar ve Açıklamalar:</h4>
            {errors.map((err: any, idx: number) => (
              <div key={idx} className="text-sm bg-muted p-2 rounded">
                <span className="font-mono text-red-500">{err.part}</span> 
                <span className="mx-2">→</span> 
                <span className="font-mono text-green-500">{err.correction}</span>
                <p className="text-xs text-muted-foreground mt-1">{err.rule}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-sm italic text-blue-600 dark:text-blue-400">
          💡 {feedback}
        </div>
      </CardContent>
    </Card>
  );
}

function PronunciationCard({ sound, tips, examples }: any) {
  return (
    <Card className="w-full my-4 border-l-4 border-l-violet-500">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Volume2 className="w-5 h-5" /> Ses: "{sound}"
        </CardTitle>
        <CardDescription>{tips}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {examples.map((ex: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-bold text-lg">{ex.word}</p>
                <p className="text-xs text-muted-foreground">{ex.meaning}</p>
              </div>
              <Badge variant="outline" className="text-base px-3">
                {ex.pronunciationTr}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RoleplayCard({ scenario, userRole, aiRole, starterMessage, mission }: any) {
  return (
    <Card className="w-full my-4 border-l-4 border-l-cyan-500 bg-cyan-50/30 dark:bg-cyan-950/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" /> Rol Yapma: {scenario}
        </CardTitle>
        <CardDescription className="flex gap-4 text-xs font-mono">
          <span>Sen: {userRole}</span>
          <span>AI: {aiRole}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-background border p-4 rounded-lg shadow-sm">
          <span className="text-xs font-bold text-muted-foreground block mb-1">{aiRole} diyor ki:</span>
          <p className="text-lg text-primary font-medium">"{starterMessage}"</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-100 dark:bg-blue-900/20 rounded text-sm text-blue-700 dark:text-blue-300">
          <Target className="w-4 h-4" />
          <span className="font-bold">Görevin:</span> {mission}
        </div>
      </CardContent>
    </Card>
  );
}

const CATEGORIES = {
  vocabulary: { name: 'Kelime Bilgisi', icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-600' },
  grammar: { name: 'Dilbilgisi', icon: <Brain className="w-4 h-4" />, color: 'text-purple-600' },
  conversation: { name: 'Konuşma', icon: <MessageSquare className="w-4 h-4" />, color: 'text-yellow-600' },
  reading: { name: 'Okuma', icon: <BookText className="w-4 h-4" />, color: 'text-pink-600' },
  time: { name: 'Zaman', icon: <Clock className="w-4 h-4" />, color: 'text-orange-600' },
  pronunciation: { name: 'Telaffuz', icon: <Volume2 className="w-4 h-4" />, color: 'text-violet-600' },
  exam: { name: 'Sınav', icon: <Trophy className="w-4 h-4" />, color: 'text-slate-600' }
};

const AI_TOOLS = [
  {
    id: 'vocabulary-quiz',
    name: 'Kelime Testi',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Aile, meslek ve sıfatlar hakkında kelime alıştırması',
    category: 'vocabulary',
    color: 'bg-blue-500',
    userPrompt: 'Sen A1.1 seviyesinde bir Almanca öğretmenisin. Konumuz: Aile, Meslekler ve Sıfatlar. Bu konulardan karma, A1.1 seviyesine uygun 5 soruluk bir test oluşturmak için "generate_quiz" aracını kullan. Sorular hem Almanca->Türkçe hem de Türkçe->Almanca olabilir.'
  },
  {
    id: 'sentence-builder',
    name: 'Cümle Kurma (V2)',
    icon: <Zap className="w-5 h-5" />,
    description: 'V2 kuralı ile Almanca cümle oluşturma pratiği',
    category: 'grammar',
    color: 'bg-purple-500',
    userPrompt: 'Sen bir gramer hocasısın. Önce kısaca (maksimum 2 cümle) "V2 Kuralı"nı (Fiilin 2. sırada olması) basitçe açıkla. Ardından bana karışık verilmiş kelimeler sun ve bunları doğru sıraya sokmamı iste. 3 farklı soru sor (Biri Soru cümlesi, biri Düz cümle, biri Zamanla başlayan cümle). Cevapları hemen verme, benim yazmamı bekle.'
  },
  {
    id: 'opposites',
    name: 'Zıt Anlamlılar',
    icon: <Target className="w-5 h-5" />,
    description: 'Sıfatlar ve zıt anlamlıları öğren',
    category: 'vocabulary',
    color: 'bg-green-500',
    userPrompt: 'Bana A1.1 seviyesinde en çok kullanılan 8 sıfat çiftini (örn: groß/klein) bir tablo halinde sun. Yanlarına Türkçe anlamlarını ve birer emoji ekle. Ardından bu sıfatları pekiştirmem için "generate_quiz" aracını kullanarak 5 soruluk bir test oluştur.'
  },
  {
    id: 'phrase-builder',
    name: 'İfade Tamamlama',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Günlük konuşmalarda kullanılan ifadeleri tamamla',
    category: 'conversation',
    color: 'bg-yellow-500',
    userPrompt: 'Günlük hayatta kullanılan kalıpları (Ich möchte..., Ich habe..., Ich brauche...) çalışacağız. Bana yarım bırakılmış bir cümle ver (Örn: "Restauranda su iste: Ich möchte ___") ve tamamlamamı iste. Toplam 5 alıştırma yapacağız. Her seferinde bir soru sor ve cevabımı bekle.'
  },
  {
    id: 'clock-time',
    name: 'Saat Söyleme',
    icon: <Clock className="w-5 h-5" />,
    description: 'Almancada saat söylemeyi öğren',
    category: 'time',
    color: 'bg-orange-500',
    userPrompt: 'Almanca saatleri (Uhrzeit) öğretiyorsun. Önce kısa bir özet geç: "Viertel nach/vor" ve "halb" kurallarını madde madde, Türkçe açıkla. Sonra "generate_quiz" aracını kullanarak bana farklı saat görselleri veya metinleri içeren (Örn: 14:30 Almancası nedir?) 5 soruluk bir test hazırla.'
  },
  {
    id: 'mini-reading',
    name: 'Mini Okuma',
    icon: <BookText className="w-5 h-5" />,
    description: 'Kısa paragraf okuma ve anlama',
    category: 'reading',
    color: 'bg-pink-500',
    userPrompt: 'Bana "Günlük Rutin" veya "Ailem" hakkında A1.1 seviyesinde, çok basit cümlelerden oluşan (maksimum 6 cümle) Almanca bir paragraf yaz. Metni yazdıktan sonra, metni anlayıp anlamadığımı ölçmek için "generate_quiz" aracını kullanarak metinle ilgili 3 soruluk bir test oluştur.'
  },
  {
    id: 'family-vocab',
    name: 'Aile Kelimeleri',
    icon: <Users className="w-5 h-5" />,
    description: 'Aile üyeleri ve ilişkiler',
    category: 'vocabulary',
    color: 'bg-red-500',
    userPrompt: 'Aile üyelerini (Mutter, Vater, Oma, Opa vs.) tanıt. Kelimeleri, artikelleriyle (der/die) birlikte listele ve her biri için akılda kalıcı kısa bir ipucu veya örnek cümle ver. Tanıtım bittikten sonra "generate_quiz" aracıyla beni sına.'
  },
  {
    id: 'jobs-vocab',
    name: 'Meslekler',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Meslek adları ve tanımları',
    category: 'vocabulary',
    color: 'bg-indigo-500',
    userPrompt: 'En yaygın meslekleri (Lehrer, Arzt, Ingenieur...) hem eril (der) hem dişil (die -in) halleriyle listele. "Was bist du von Beruf?" sorusuna nasıl cevap verileceğini göster. Sonrasında meslekleri pekiştirmem için "generate_quiz" aracını kullanarak 5 soruluk test yap.'
  },
  {
    id: 'daily-routine',
    name: 'Günlük Rutinler',
    icon: <Home className="w-5 h-5" />,
    description: 'Ayrılabilen fiiller ve günlük aktiviteler',
    category: 'grammar',
    color: 'bg-teal-500',
    userPrompt: 'Konumuz: Ayrılabilen Fiiller (Trennbare Verben). Önce şu fiilleri öğret: aufstehen, anfangen, einkaufen, fernsehen. Cümle içinde ayrıldıklarında önekin (auf, an, ein) en sona gittiğini örnekle göster. Ardından bana Türkçe bir cümle ver (Örn: "Saat 8\'de kalkarım") ve bunun Almancasını yazmamı iste. 4 alıştırma yapalım.'
  },
  {
    id: 'cafe-restaurant',
    name: 'Cafe & Restaurant',
    icon: <Coffee className="w-5 h-5" />,
    description: 'Sipariş verme ve konuşma senaryoları',
    category: 'conversation',
    color: 'bg-amber-500',
    userPrompt: 'Sen bir Alman garsonusun, ben de müşteriyim. Bir cafe simülasyonu yapacağız. "Hallo, was möchten Sie trinken?" diyerek diyaloğu başlat. Benim cevabıma göre siparişi al veya soru sor. Yanlış bir cümle kurarsam parantez içinde düzelt ama rolden çıkma. Diyalog en az 6 adım sürsün.'
  },
  {
    id: 'pronunciation',
    name: 'Telaffuz Pratiği',
    icon: <Volume2 className="w-5 h-5" />,
    description: 'Zorlu Almanca sesleri öğren',
    category: 'pronunciation',
    color: 'bg-violet-500',
    userPrompt: 'Almanca özel harfler (ä, ö, ü, ß) ve zor sesler (ch, r) için bir rehber hazırla. Her ses için: 1. Nasıl okunur? (Türkçe benzeri), 2. Örnek kelime. En sonunda bu kelimeleri içeren basit bir tekerleme (Zungenbrecher) yaz.'
  },
  {
    id: 'mini-dialogue',
    name: 'Mini Diyalog',
    icon: <MessageSquare className="w-5 h-5" />,
    description: 'Senaryo bazlı konuşma simülasyonu',
    category: 'conversation',
    color: 'bg-cyan-500',
    userPrompt: 'Seninle tanışmak istiyorum. Sen "Hans" isminde bir Alman öğrencisin. Sohbeti "Hallo, ich bin Hans. Wie heißt du?" diyerek başlat. Sadece A1.1 seviyesinde, kısa cümleler kur. Her cevabımda gramerimi kontrol et, hatam varsa düzelt, sonra sohbete devam et.'
  },
  {
    id: 'story-generator',
    name: 'Hikaye Üreticisi',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'AI ile özel Almanca hikaye oluştur',
    category: 'reading',
    color: 'bg-rose-500',
    userPrompt: 'Bana A1.1 seviyesinde, içinde [Kullanıcının seçeceği konu, örn: Tatil] geçen, çok basit bir hikaye yaz. Hikaye sadece Şimdiki Zaman (Präsens) olsun. "Perfekt" (Geçmiş zaman) kullanma. Hikayeyi yazdıktan sonra "generate_quiz" aracıyla hikayeden 3 anlama sorusu sor.'
  },
  {
    id: 'grammar-checker',
    name: 'Dilbilgisi Kontrolü',
    icon: <CheckCircle2 className="w-5 h-5" />,
    description: 'Yazdığın cümleleri kontrol ettir',
    category: 'grammar',
    color: 'bg-emerald-500',
    userPrompt: 'Ben sana Almanca cümleler yazacağım. Sen benim düzeltmenimsin. Her yazdığım cümleyi analiz et: 1. V2 kuralına uymuş muyum? 2. Artikeller doğru mu? 3. Kelime sırası doğru mu? Hatalarımı Türkçe açıkla ve doğrusunu göster. Hazırsan "Lütfen ilk cümleni yaz" de.'
  },
  {
    id: 'word-order-drill',
    name: 'Kelime Sırası',
    icon: <Brain className="w-5 h-5" />,
    description: 'Almanca cümle yapısı pratiği',
    category: 'grammar',
    color: 'bg-fuchsia-500',
    userPrompt: 'Bana kelimeleri karıştırılmış bir cümle ver (Örn: [Pizza / heute / wir / essen]). Ben bunu doğru sıraya sokmaya çalışacağım. V2 kuralına (fiil pozisyonu) özellikle dikkat etmemi iste. Toplam 5 soru sor, her soruyu tek tek sor ve cevabımı bekle.'
  },
  {
    id: 'exam-prep',
    name: 'Sınav Simülasyonu',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'A1.1 kapsamlı değerlendirme',
    category: 'exam',
    color: 'bg-slate-500',
    userPrompt: 'Sen bir sınav gözetmenisin. Bana A1.1 seviyesinde kapsamlı bir sınav yapacaksın. Sınavda Kelime, Gramer ve Okuma bölümleri olacak. "generate_quiz" aracını kullanarak toplam 10 soruluk karma bir sınav oluştur. Sorular zorluk derecesine göre kolaydan zora gitsin.'
  }
];

export default function AITutor() {
  const { 
    messages,
    sendMessage,
    status
  } = useChat({
    id: 'baustein-ai-tutor-chat',
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Merhaba! Ben senin AI Almanca öğretmeninim. 🇩🇪\n\nA1.1 seviyesinde sana yardımcı olmak için buradayım. Aşağıdaki araçlardan birini seç veya doğrudan soru sorabilirsin!'
          }
        ]
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('tools');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleToolSelect = (tool: any) => {
    setActiveTab('chat');
    sendMessage({ text: tool.userPrompt });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  console.log(messages)

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="tools" className="gap-2">
              <Target className="w-4 h-4" />
              Araçlar
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Sohbet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tools" className="space-y-6 animate-in fade-in-50 duration-300">
            {Object.entries(CATEGORIES).map(([categoryKey, category]) => {
              const categoryTools = AI_TOOLS.filter(t => t.category === categoryKey);
              if (categoryTools.length === 0) return null;

              return (
                <div key={categoryKey}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={category.color}>{category.icon}</div>
                    <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
                    <Badge variant="secondary">{categoryTools.length}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categoryTools.map((tool) => (
                      <Card 
                        key={tool.id}
                        className="hover:shadow-lg hover:scale-105 transition-all cursor-pointer group border-2 hover:border-blue-300 dark:hover:border-blue-600"
                        onClick={() => handleToolSelect(tool)}
                      >
                        <CardHeader className="pb-3">
                          <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                            {tool.icon}
                          </div>
                          <CardTitle className="text-base leading-tight">{tool.name}</CardTitle>
                          <CardDescription className="text-xs line-clamp-2">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button size="sm" variant="ghost" className="w-full gap-2">
                            <Play className="w-3 h-3" />
                            Başlat
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="chat" className="space-y-4 animate-in fade-in-50 duration-300">
            <Card className="h-[700px] flex flex-col shadow-md pt-0 gap-0">
              <CardHeader className="border-b bg-muted/20 pt-6">
                <div className="flex flex-col items-center justify-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="size-5 text-blue-600" />
                      AI Öğretmen Sohbeti
                    </CardTitle>
                    <CardDescription>
                      Almanca öğreniminiz için sorularınızı sorun veya bir araç seçin
                    </CardDescription>
                  </div>
                  {messages.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Yeni Sohbet
                    </Button>
                  )}
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 px-4 h-[200px]">
  <div className="space-y-4 max-w-3xl mx-auto pt-4 pb-4">
    {messages.map((message) => {
      const isUser = message.role === "user";
      
      // 1. Metin parçalarını al (Varsa)
      const textParts = message.parts?.filter(p => p.type === 'text') || [];
      const textContent = textParts.map(p => p.text).join('');

      // 2. Tool çağrılarını GÜVENLİ ve ESNEK şekilde al
      let toolParts = [];
      
      // A) Standart SDK yapısı (toolInvocations)
      if (message.toolInvocations && message.toolInvocations.length > 0) {
        toolParts = message.toolInvocations;
      } 
      // B) Senin JSON yapın (parts içinde "tool-..." ile başlayan tipler)
      else if (message.parts) {
        toolParts = message.parts.filter(part => 
          // "tool-generate_quiz" gibi tipleri yakalar
          part.type.startsWith('tool-') && part.type !== 'tool-result'
        );
      }

      return (
        <div
          key={message.id}
          className={`flex ${isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={cn(
              "max-w-[85%] rounded-2xl px-5 py-3 shadow-sm",
              isUser
                ? "bg-blue-600 dark:bg-blue-500 text-white rounded-br-none"
                : "bg-white dark:bg-muted text-foreground border rounded-bl-none"
            )}
          >
            <div className="flex items-start gap-3">
              {!isUser && (
                <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full mt-0.5">
                  <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              )}

              <div className="flex-1 text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none min-w-0">
                {/* --- METİN İÇERİĞİ --- */}
                {textContent && (
                   <ReactMarkdown
                   components={{
                     a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" />,
                     p: (props) => <p {...props} className="mb-2 last:mb-0" />,
                     code: (props) => <code {...props} className="bg-muted/50 px-1 py-0.5 rounded font-mono text-xs" />,
                     ul: (props) => <ul {...props} className="list-disc pl-4 mb-2" />,
                     ol: (props) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                   }}
                 >
                   {textContent}
                 </ReactMarkdown>
                )}

                {/* --- TOOL / UI BİLEŞENLERİ --- */}
                {toolParts.map((part, idx) => {
                  // Tool ismini belirle:
                  // 1. Eğer 'toolName' varsa onu kullan (Standart)
                  // 2. Yoksa 'type' içinden çıkar ("tool-generate_quiz" -> "generate_quiz")
                  let toolName = part.toolName;
                  if (!toolName && part.type && part.type.startsWith('tool-')) {
                    toolName = part.type.replace('tool-', '');
                  }

                  // Veriyi al: Senin JSON'da veri 'input' içinde. Standartta 'args' içinde.
                  const data = part.args || part.input; 

                  // Eğer data boşsa render etme
                  if (!data) return null;

                  return (
                    <div key={idx} className="mt-3 w-full animate-in fade-in zoom-in-95 duration-300">
                      {toolName === "generate_quiz" && (
                        <QuizCard topic={data.topic} questions={data.questions} />
                      )}
                      
                      {toolName === "generate_sentence_drill" && (
                        <SentenceDrillCard topic={data.topic} sentences={data.sentences} />
                      )}

                      {toolName === "generate_cloze_test" && (
                        <ClozeTestCard topic={data.topic} exercises={data.exercises} />
                      )}

                      {toolName === "generate_reading_exercise" && (
                        <ReadingCard {...data} />
                      )}

                      {toolName === "generate_grammar_analysis" && (
                        <GrammarAnalysisCard {...data} />
                      )}

                      {toolName === "generate_pronunciation_guide" && (
                        <PronunciationCard {...data} />
                      )}

                      {toolName === "generate_roleplay_start" && (
                        <RoleplayCard {...data} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    })}

{isLoading && (
      <div className="flex justify-start">
        <div className="bg-muted/50 rounded-2xl px-4 py-3 flex items-center gap-2 border">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-muted-foreground">Yazıyor...</span>
        </div>
      </div>
    )}

    <div ref={messagesEndRef} />
  </div>
</ScrollArea>

              <div className="p-4">
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e as any);
                      }
                    }}
                    placeholder="Almanca hakkında bir şey sor..."
                    className="resize-none min-h-[50px] max-h-[150px]"
                    rows={2}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input?.trim()}
                    className="h-auto px-6"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}