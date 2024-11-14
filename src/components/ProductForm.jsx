import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ onSave, initialProductId = "" }) => {
  const [product, setProduct] = useState({
    id: initialProductId,
    name: "",
    brand: "",
    category: "",
    price: "",
  });

  // useEffect para buscar dados do produto no backend quando o componente é montado
  useEffect(() => {
    if (initialProductId) {
      console.log(`Fetching product with ID: ${initialProductId}`);
      // Substitua `http://localhost:8080/api/v1/products/${initialProductId}` por `/api/v1/products/${initialProductId}`
      axios
        /* .get(`/api/v1/products/${initialProductId}`) MUDEI POR CAUSA DO JSON, O JSON Server espera a rota products diretamente*/
        .get(`/api/products/${initialProductId}`)
        .then((response) => {
          console.log("Product data:", response.data);
          const { id, name, brand, category, price } = response.data;
          setProduct({ id, name, brand, category, price });
        })
        .catch((error) => console.error("Erro ao buscar produto:", error));

      /* antes, sem proxy */
      /* axios
        .get(`http://localhost:8080/api/v1/products/${initialProductId}`)
        .then((response) => {
          console.log("Product data:", response.data); // Log dos dados recebidos
          const { id, name, brand, category, price } = response.data;
          setProduct({ id, name, brand, category, price });
        })
        .catch((error) => console.error("Erro ao buscar produto:", error));
 */
    }
  }, [initialProductId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {product.id && (
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={product.id}
            readOnly // Deixa o ID apenas leitura
          />
        </label>
      )}
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Marca:
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Categoria:
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Preço:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
          step="0.01"
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
