import { Routes, Route, BrowserRouter } from "react-router-dom";
import {
  Login,
  Home,
  ProtectedRoute,
  UserAuth,
  Configuracion,
  Categorias,
  Movimientos,
  Informes,

  Productos,
  Marca,
  Personal,
  Empresa,
  Kardex,
  useUsuariosStore,
  useEmpresaStore,
  SpinnerLoader,
} from "../index";
import { useQuery } from "@tanstack/react-query";
export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUsuarios, datausuarios,idusuario } = useUsuariosStore();
  const { mostrarEmpresa,contarusuariosXempresa } = useEmpresaStore();
  const {data:usuarios, isLoading, error,refetch } = useQuery({queryKey:["mostrar usuarios"],queryFn: () =>
    mostrarUsuarios()}
  );

  

  
  const { data:empresa } = useQuery({queryKey:["mostrar empresa",{idusuarios:datausuarios?.id}],queryFn: () =>
  mostrarEmpresa({idusuario:datausuarios?.id}), enabled:!!usuarios}
);

 

  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <h1>Error..</h1>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar/usuarios" element={<Personal />} />
        <Route path="/configurar" element={<Configuracion />}></Route>
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/movimientos" element={<Movimientos />} />
        <Route path="/informes" element={<Informes />} />
        <Route path="/configurar/productos" element={<Productos />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/empresa" element={<Empresa />} />
        <Route path="/kardex" element={<Kardex />}></Route>
      </Route>
    </Routes>
  );
}
