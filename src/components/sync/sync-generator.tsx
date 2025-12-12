'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client' 
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createTransferCodeAction } from '@/actions/sync-actions'
import { Loader2, Smartphone, Check } from 'lucide-react'
import QRCode from 'react-qr-code'  
import { toast } from 'sonner'

export function SyncGenerator() {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    const supabase = createClient()
    
    // Mevcut oturumun tokenini al
    const { data: { session } } = await supabase.auth.getSession()
    
if (!session?.refresh_token || !session?.access_token) {
      toast.error("Oturum bilgisi alınamadı.")
      setLoading(false)
      return
    }

    const res = await createTransferCodeAction(session.refresh_token, session.access_token)

    if (res.success && res.code) {
      setCode(res.code)
    }
    setLoading(false)
  }

  return (
    <Card className="border-indigo-200 bg-indigo-50/30 dark:bg-indigo-950/10 dark:border-indigo-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-indigo-600" />
          Cihaz Eşleştirme
        </CardTitle>
        <CardDescription>
          Bu oturumu telefonuna veya başka bir bilgisayara taşı.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!code ? (
          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Bağlantı Kodu Oluştur'}
          </Button>
        ) : (
          <div className="flex flex-col items-center space-y-4 animate-in zoom-in-95">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              {/* QR Kod: Hedef cihazda açılacak linki kodlar */}
              {/* Kullanıcı kamerayla okutursa direkt o sayfaya gider ve kodu girmiş sayılır */}
              <QRCode 
                value={`${window.location.origin}/login?code=${code}`} 
                size={150} 
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">veya bu kodu gir:</p>
              <div className="text-4xl font-mono font-bold tracking-widest text-indigo-700 dark:text-indigo-400">
                {code}
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Kodu diğer cihazdaki "Giriş Yap" ekranına gir. <br/> 5 dakika geçerlidir.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}