import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./pages/AddProduct"; // Importa o novo componente de adição de produtos
import FindProducts from "./pages/FindProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-product" element={<AddProduct />} /> {/* Nova rota */}
        <Route path="/find-products" element={<FindProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
