import React from "react";

const AddProductForm = ({
  productData,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <div className="container mt-5">
      <h1>BlueVelvet Music Store</h1>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome do Produto */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />

        {/* Marca */}
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={productData.brand}
          onChange={handleInputChange}
          required
        />

        {/* Categoria */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleInputChange}
          required
        />

        {/* Preço */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        {/* URL da Imagem */}
        <input
          type="text"
          name="pictureUrl"
          placeholder="Picture URL"
          value={productData.pictureUrl}
          onChange={handleInputChange}
        />

        {/* Descrição Curta */}
        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={productData.shortDescription}
          onChange={handleInputChange}
          required
        ></textarea>

        {/* Descrição Completa */}
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
            onChange={(e) =>
              handleInputChange({
                target: { name: "stock", value: e.target.checked },
              })
            }
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

        {/* Peso */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={productData.weight}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        {/* Custo */}
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={productData.cost}
          onChange={handleInputChange}
          step="0.01"
          required
        />

        {/* Detalhes do Produto */}
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

        {/* Botão de envio */}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
