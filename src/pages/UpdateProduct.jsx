import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/UpdateProduct.css"; // Importa estilos personalizados, se houver
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o Bootstrap para os estilos de layout

const UpdateProduct = ({ initialProductId }) => {
  // Hook para manter o ID do produto que será atualizado
  const [productId] = useState(initialProductId);

  // Hooks para guardar os valores dos campos do produto
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  // useEffect roda assim que o componente é montado, buscando dados do produto pelo ID
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/products/${productId}`)
      .then((response) => {
        const { name, brand, category, price } = response.data;
        setProductName(name);
        setBrand(brand);
        setCategory(category);
        setPrice(price);
      })
      .catch((error) => console.error("Error fetching product:", error)); // Log de erro caso falhe
  }, [productId]);

  // Função chamada ao salvar; atualiza o produto no backend
  const handleSave = () => {
    const updatedProduct = {
      name: productName,
      brand: brand,
      category: category,
      price: parseFloat(price), // parseFloat para garantir que o preço seja numérico
    };

    axios
      .put(`http://localhost:8080/api/v1/products/${productId}`, updatedProduct)
      .then((response) => {
        console.log("Product updated:", response.data);
        alert("Product updated successfully!");
        navigate("/find-products"); // Redireciona para a lista de produtos após atualizar
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("There was an error updating the product."); // Alerta em caso de erro
      });
  };

  // Função para retornar à lista de produtos sem salvar
  const handleReturn = () => {
    navigate("/find-products");
  };

  return (
    <div className="">
      <div className="container mt-5">
        <h1 className="text-center first-header ">BlueVelvet Music Store</h1>
        <h2 className="text-center mb-4">Update Product</h2>

        <form className="bg-light p-4 rounded shadow">
          {/* Campo de entrada para o nome do produto */}
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Digite o nome do produto"
              required
              className="form-control"
            />
          </div>

          {/* Campo de entrada para a marca */}
          <div className="mb-3">
            <label htmlFor="brand" className="form-label">
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Digite a marca"
              required
              className="form-control"
            />
          </div>

          {/* Campo de entrada para a categoria */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Digite a categoria"
              required
              className="form-control"
            />
          </div>

          {/* Campo de entrada para o preço */}
          <div className="mb-4">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Digite o preço"
              required
              step="0.01"
              className="form-control"
            />
          </div>

          {/* Botões para salvar ou retornar */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReturn}
              className="btn btn-secondary"
            >
              Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
