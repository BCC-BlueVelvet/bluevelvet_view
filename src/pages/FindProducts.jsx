import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/find_all_style.css";


const FindProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Busca os produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/products"); // API para obter os produtos
        setProducts(response.data); // Define os produtos no estado
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Não foi possível carregar os produtos.");
      }
    };

    fetchProducts();
  }, []);

  // Função para filtrar os produtos com base na busca
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para excluir um produto
  const deleteProduct = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto com ID ${id}?`)) {
      try {
        await axios.delete(`/api/v1/products/${id}`);
        alert("Produto excluído com sucesso.");
        setProducts(products.filter((product) => product.id !== id)); // Remove o produto localmente
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao tentar excluir o produto.");
      }
    }
  };

  return (
    <div className="container my-5" >
      <header className="text-center mb-4">
        <h1>BlueVelvet Music Store</h1>
        <p className="text-muted">Your one-stop shop for musical instruments and gear! 🎵</p>
      </header>

      {/* Busca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Botão para adicionar produto */}
      <div className="mb-4 text-end">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-product")}
        >
          Add Product
        </button>
      </div>

      {/* Tabela de produtos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.pictureUrl || "placeholder.jpg"}
                    alt={product.name}
                    className="img-fluid"
                    style={{ maxWidth: "80px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => alert(`Viewing product: ${product.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/update-product/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FindProducts;
