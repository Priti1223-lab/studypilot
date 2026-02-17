import { supabase } from '../lib/supabase'

export async function isAdmin(user) {

  if (!user) return false

  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .single()

  if (error || !data) return false
  return true
}