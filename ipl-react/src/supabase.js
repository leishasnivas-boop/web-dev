import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uyjfgqyxwgihxhrhdsoe.supabase.co";
const supabaseKey = "sb_publishable_0JzUqjOz4sDO5pWi0CteMg_l6nhNmn9";

export const supabase = createClient(supabaseUrl, supabaseKey);