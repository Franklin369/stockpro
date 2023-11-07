import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarKardex(p) {
  try {
     const { error } = await supabase.from("kardex")
     .insert(p)
     if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        footer: '<a href="">...</a>',
      });
    }
  } catch (error) {
    
  }
 
}

export async function MostrarKardex(p) {
  try {
    const { data } = await supabase.rpc("mostrarkardexempresa", {
      _id_empresa: p.id_empresa,
    }).order("id",{ascending:false});
    return data;
  } catch (error) {}
}
export async function BuscarKardex(p) {
  try {
    const { data } = await supabase.rpc("buscarkardexempresa", {
      _id_empresa: p.id_empresa,buscador:p.buscador
    }).order("id",{ascending:false});
    return data;
  } catch (error) {}
}