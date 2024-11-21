import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/UpdateProduct.css";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  // Estado inicial seguro
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

  useEffect(() => {
    if (productId) {
      axios
        .get(`/api/v1/products/${productId}`)
        .then((response) => {
          // Garantir que os campos não sejam `null` ou `undefined`
          const product = response.data || {};
          setProductData({
            name: product.name || "",
            shortDescription: product.shortDescription || "",
            fullDescription: product.fullDescription || "",
            brand: product.brand || "",
            category: product.category || "",
            price: product.price?.toString() || "",
            pictureUrl: product.pictureUrl || "",
            stock: product.stock || false,
            length: product.length?.toString() || "",
            width: product.width?.toString() || "",
            height: product.height?.toString() || "",
            weight: product.weight?.toString() || "",
            cost: product.cost?.toString() || "",
            detailName: product.detailName || "",
            detailValue: product.detailValue || "",
          });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData({
      ...productData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    axios
      .put(`/api/v1/products/${productId}`, productData)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/find-products");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("There was an error updating the product.");
      });
  };

  const handleReturn = () => {
    navigate("/find-products");
  };

  return (
    <div className="container mt-5">
      <h1>BlueVelvet Music Store</h1>
      <h2>Update Product</h2>
      <form>
        {/* Campos principais */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={productData.brand}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="pictureUrl"
          placeholder="Picture URL"
          value={productData.pictureUrl}
          onChange={handleInputChange}
        />

        {/* Descrições */}
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={productData.shortDescription}
          onChange={handleInputChange}
          required
        ></textarea>
        <textarea
          name="fullDescription"
          placeholder="Full Description"
          value={productData.fullDescription}
          onChange={handleInputChange}
          required
        ></textarea>

        {/* Estoque */}
        <label>
          <input
            type="checkbox"
            name="stock"
            checked={productData.stock}
            onChange={handleInputChange}
          />
          In Stock
        </label>

        {/* Dimensões */}
        <input
          type="number"
          name="length"
          placeholder="Length (cm)"
          value={productData.length}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="number"
          name="width"
          placeholder="Width (cm)"
          value={productData.width}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={productData.height}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={productData.weight}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        {/* Custo e detalhes */}
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={productData.cost}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <input
          type="text"
          name="detailName"
          placeholder="Detail Name"
          value={productData.detailName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="detailValue"
          placeholder="Detail Value"
          value={productData.detailValue}
          onChange={handleInputChange}
        />

        {/* Botões */}
        <button type="button" onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          onClick={handleReturn}
          className="btn btn-secondary"
        >
          Return
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
