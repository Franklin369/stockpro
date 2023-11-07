import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { EmpresaTemplate } from "../components/templates/EmpresaTemplate";
import { useQuery } from "@tanstack/react-query";

export function Empresa() {

  const {contarusuariosXempresa,dataempresa} = useEmpresaStore();
    //llamar a consultar usuarios por empresa

    const {data:contadorusurios}=useQuery({queryKey:["contador de usuarios",dataempresa.id],queryFn:()=>contarusuariosXempresa({id_empresa:dataempresa.id}),enabled:dataempresa?.id!=null})
  return (
    <>
      <EmpresaTemplate />
    </>
  );
}
