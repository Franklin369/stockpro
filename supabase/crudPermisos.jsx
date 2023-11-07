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
    if (data) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Datos guardados",
        showConfirmButton: false,
        timer: 1500,
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
      .select()
      .eq("idusuario", p.idusuario)
    return data;
  } catch (error) {}
}
