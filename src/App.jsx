import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap para dar estilo aos componentes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa componentes do react-router-dom para navegação
import UpdateProduct from "./pages/UpdateProduct"; // Importa a página de atualização de produto
import FindProducts from "./pages/FindProducts"; // Importa a página de busca de produtos

function App() {
  return (
    <Router>
      {/* Componente principal que habilita o roteamento na aplicação */}
      <Routes>
        {/* Define as rotas da aplicação */}

        {/* Rota para o componente de busca de produtos */}
        <Route path="/find-products" element={<FindProducts />} />

        {/* Rota para o componente de atualização de produto com ID como parâmetro */}
        <Route path="/update-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
