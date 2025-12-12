'use server'

import { createClient } from '@/lib/supabase/server'

export async function createTransferCodeAction(refreshToken: string, accessToken: string) {
  const supabase = await createClient()
  
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  const { error } = await supabase
    .from('session_transfers')
    .insert({
      code,
      refresh_token: refreshToken,
      access_token: accessToken
    })

  if (error) {
    console.error(error)
    return { success: false, message: 'Kod üretilemedi' }
  }
  
  return { success: true, code }
}

export async function claimTransferCodeAction(code: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('session_transfers')
    .select('refresh_token, access_token')
    .eq('code', code)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (error || !data) {
    return { success: false, message: 'Kod geçersiz veya süresi dolmuş.' }
  }

  await supabase.from('session_transfers').delete().eq('code', code)

  return { 
    success: true, 
    refreshToken: data.refresh_token,
    accessToken: data.access_token
  }
}