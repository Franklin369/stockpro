import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarPermisos(p) {
  try {
    const { data, error } = await supabase
      .from("permisos")
      .insert(p)
      .select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al insertar permisos "+ error.message,
        footer: '<a href="">error</a>',
      });
    }
    
  } catch (error) {
    alert(error.error_description || error.message + " insertar permisos");
  }
}
export async function MostrarPermisos(p) {
  try {
    const { data } = await supabase
      .from("permisos")
      .select(`id, id_usuario, idmodulo, modulos(nombre)`)
      .eq("id_usuario", p.id_usuario)
    return data;
  } catch (error) {}
}
export async function EliminarPermisos(p) {
  try {
    const { error } = await supabase
      .from("permisos")
      .delete()
      .eq("id_usuario", p.id_usuario);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar permisos");
  }
}