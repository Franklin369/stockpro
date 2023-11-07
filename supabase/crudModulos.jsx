import { supabase } from "../index";
export async function MostrarModulos() {
  try {
    const { data } = await supabase.from("modulos").select();
    return data;
  } catch (error) {}
}
