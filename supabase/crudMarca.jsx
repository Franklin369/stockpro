import { supabase } from "../index";
import Swal from "sweetalert2";
export async function InsertarMarca(p) {
  try {
     const { error } = await supabase.rpc("insertarmarca", p);
     if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p._descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
  } catch (error) {
    
  }
 
}
export async function MostrarMarca(p) {
  try {
    const { data } = await supabase
      .from("marca")
      .select()
      .eq("id_empresa", p.id_empresa)
      .order("id", { ascending: true });
    return data;
  } catch (error) {}
}
export async function EliminarMarca(p) {
  try {
    const { error } = await supabase
      .from("marca")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar marca");
  }
}
export async function EditarMarca(p) {
  try {
    const { error } = await supabase
      .from("marca")
      .update(p)
      .eq("id", p.id);
    if (error) {
      alert("Error al editar marca", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar marca");
  }
}
export async function EliminarMarcaTodas(p) {
  try {
    const { error } = await supabase
      .from("marca")
      .delete()
      .eq("idusuario", p.idusuario);
    if (error) {
      alert("Error al eliminar", error);
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Datos reseteados",
      showConfirmButton: false,
      timer: 1000,
    });
  } catch (error) {
    alert(error.error_description || error.message + " eliminar marca");
  }
}
export async function BuscarMarca(p) {
  try {
    const { data } = await supabase
      .from("marca")
      .select()
      .eq("id_empresa", p.id_empresa)
      .ilike("descripcion","%"+ p.descripcion+"%")
      
    return data;
  } catch (error) {}
}
