import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProductForm from "../components/AddProductForm"; // Importa o componente de formulário
import "../css/AddProduct.css"; // Inclua estilos específicos para o formulário
import "bootstrap/dist/css/bootstrap.min.css";

// Configuração do axios para o json-server
// axios.defaults.baseURL = "http://localhost:3001";

const AddProduct = () => {
  // Estado inicial do produto
  const [productData, setProductData] = useState({
    name: "",
    shortDescription: "",
    fullDescription: "",
    brand: "",
    category: "",
    listPrice: "",
    discountPercent: "",
    enabled: false,
    inStock: false,
    length: "",
    width: "",
    height: "",
    weight: "",
    cost: "",
    productDetails: [],
  });

  const [mainImage, setMainImage] = useState(null); // Estado para a imagem principal
  const [featuredImages, setFeaturedImages] = useState([]); // Estado para imagens em destaque
  const [newDetail, setNewDetail] = useState({ name: "", value: "" }); // Novo detalhe para o produto

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

  // Função para adicionar um novo detalhe ao produto
  const handleAddDetail = () => {
    if (newDetail.name && newDetail.value) {
      setProductData((prevData) => ({
        ...prevData,
        productDetails: [...prevData.productDetails, newDetail],
      }));
      setNewDetail({ name: "", value: "" });
    } else {
      alert("Both name and value fields are required");
    }
  };

  // Função para gerenciar o upload das imagens (principal e destaque)
  const handleImageUpload = (e, imageType) => {
    if (imageType === "mainImage") {
      setMainImage(e.target.files); // Armazena a imagem principal
    } else {
      setFeaturedImages(e.target.files); // Armazena as imagens em destaque
    }
  };

  // Função de envio do formulário com axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cria um FormData para enviar as informações do produto e imagens
    const formData = new FormData();
    Object.keys(productData).forEach((key) =>
      formData.append(key, productData[key])
    );

    formData.append("mainImage", mainImage[0]); // Adiciona a imagem principal
    Array.from(featuredImages).forEach((image, idx) =>
      formData.append(`featuredImages[${idx}]`, image) // Adiciona as imagens em destaque
    );

    try {
      // Envia o formulário via POST para a API
      const response = await axios.post("/api/products", formData);
      alert("Product added successfully");
      console.log(response.data);
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
        handleAddDetail={handleAddDetail}
        newDetail={newDetail}
        setNewDetail={setNewDetail}
        handleImageUpload={handleImageUpload}
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
