import { Route, Routes } from "react-router-dom";
import AdminUsers from "./pages/admin/admin-users";
import PaginaBaseAdmin from "./pages/paginaBaseAdmin/pagina-base-admin";
import FormularioUser from "./pages/adminForm/formulario-user";


function App() {

  return (
    <Routes>
      <Route path="/"  element={<PaginaBaseAdmin />}>
        <Route path="users" element={<AdminUsers />}/>
        <Route path="users/novo" element={<FormularioUser />}/>
        <Route path="users/:id" element={<FormularioUser />}/>
      </Route>
      
    </Routes>
  );
}

export default App;