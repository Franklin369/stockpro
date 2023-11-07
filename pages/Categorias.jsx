
import { useQuery } from "@tanstack/react-query";
import { CategoriasProTemplate } from "../components/templates/CategoriasProTemplate";
import { useCategoriasStore } from "../store/CategoriasStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";

export function Categorias() {
  const {mostrarCategorias,datacategorias,buscarCategorias,buscador} = useCategoriasStore()
  const {dataempresa} = useEmpresaStore()
 const {data,isLoading,error} = useQuery({queryKey:["mostrar categorias",dataempresa.id],queryFn:()=>mostrarCategorias({idempresa:dataempresa.id}),enabled:dataempresa.id!=null})
 const {data:buscar} = useQuery({queryKey:["buscar categorias",buscador],queryFn:()=>buscarCategorias({descripcion: buscador,id_empresa:dataempresa.id}),enabled:dataempresa.id!=null})
 //respuestas
 if(isLoading){
  return <SpinnerLoader/>
 }
 if(error){
  return <span>Error...</span>
 }
  return (<>

    <CategoriasProTemplate data={datacategorias}/>
  </>)
}
