import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProductForm from "../components/AddProductForm"; // Importa o componente de formulário
import "../css/AddProduct.css"; // Inclua estilos específicos para o formulário
import "bootstrap/dist/css/bootstrap.min.css";

// Configuração do axios para o json-server

const AddProduct = () => {
  // Estado inicial do produto
  const [productData, setProductData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    brand: "",
    category: "",
    price: "",
    pictureUrl: "",
    stock: false,
    length: "",
    width: "",
    height: "",
    weight: "",
    cost: "",
    detailName: "",
    detailValue: "",
  });

  const navigate = useNavigate();

  // Função para navegar de volta à página de listagem de produtos
  const handleReturn = () => {
    navigate("/find-products");
  };

  // Função para atualizar o estado do produto conforme as mudanças nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/products", productData); // Envia como JSON
      alert("Product added successfully");
      console.log(response.data);
      navigate("/find-products"); // Navega de volta após sucesso
    } catch (error) {
      console.error("Error adding product", error);
      alert("There was an error adding the product");
    }
  };

  return (
    <div>
      {/* Renderiza o formulário de adição de produtos */}
      <AddProductForm
        productData={productData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      {/* Botão para retornar à página de produtos */}
      <button onClick={handleReturn} className="btn btn-secondary mt-3">
        Return to Products
      </button>
    </div>
  );
};

export default AddProduct;
