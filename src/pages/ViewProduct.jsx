import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewProduct = () => {
  const { id } = useParams(); // Obtém o ID do produto a partir da URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // Estado para armazenar os dados do produto
  const [loading, setLoading] = useState(true); // Estado para mostrar indicador de carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/v1/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para voltar à listagem de produtos
  const handleReturn = () => {
    navigate("/find-products");
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container my-5">
      <h2 className="text-primary text-center mb-4">Product Details</h2>
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{product.name}</h5>
        </div>
        <div className="card-body">
          <p>
            <strong>Short Description:</strong> {product.shortDescription}
          </p>
          <p>
            <strong>Full Description:</strong> {product.fullDescription}
          </p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Dimensions:</strong> {product.length} x {product.width} x{" "}
            {product.height}
          </p>
          <p>
            <strong>Weight:</strong> {product.weight} kg
          </p>
          <p>
            <strong>Cost:</strong> ${product.cost}
          </p>
          <p>
            <strong>Stock:</strong>{" "}
            {product.stock ? "In Stock" : "Out of Stock"}
          </p>
          <p>
            <strong>Detail:</strong> {product.detailName} -{" "}
            {product.detailValue}
          </p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-secondary me-2" onClick={handleReturn}>
            Return to Products
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/update-product/${id}`)}
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
