import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://cuwyenqdtyawerwkcion.supabase.co"
const supabaseKey = "sb_publishable_uys_BWbJec-6KASke8A3QQ_-rpyMCym"

export const supabase = createClient(supabaseUrl, supabaseKey)
