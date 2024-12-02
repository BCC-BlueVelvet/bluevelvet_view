import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap para dar estilo aos componentes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa componentes do react-router-dom para navegação
import UpdateProduct from "./pages/UpdateProduct"; // Importa a página de atualização de produto
import FindProducts from "./pages/FindProducts"; // Importa a página de busca de produtos
import AddProduct from "./pages/AddProduct"; // Importa o novo componente de adição de produtos
import ViewProduct from "./pages/ViewProduct"; // Caminho correto para o componente
import UpdateUser from "./pages/UpdateUser"; // Importa o componente de atualização de usuário

function App() {
  return (
    <Router>
      {/* Componente principal que habilita o roteamento na aplicação */}
      <Routes>
        {/* Define as rotas da aplicação */}
        // Dentro das rotas:
        <Route path="/update-user/:id" element={<UpdateUser />} />
        {/* Rota para o componente de busca de produtos */}
        <Route path="/find-products" element={<FindProducts />} />
        <Route path="/view-product/:id" element={<ViewProduct />} />
        {/* Rota para o componente de atualização de produto com ID como parâmetro */}
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/add-product" element={<AddProduct />} /> {/* Nova rota */}
      </Routes>
    </Router>
  );
}

export default App;
