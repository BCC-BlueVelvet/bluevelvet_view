import React from "react";

const AddProductForm = ({
  productData,
  handleInputChange,
  handleAddDetail,
  newDetail,
  setNewDetail,
  handleImageUpload,
  handleSubmit
}) => {
  return (
    <div className="container mt-5">
      <h1>BlueVelvet Music Store</h1>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleInputChange}
          required
        />
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
        <div>
          <label>Choose main image</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, "mainImage")}
            accept="image/png"
            required
          />
        </div>
        <div>
          <label>Choose featured images</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleImageUpload(e, "featuredImages")}
            accept="image/png"
          />
        </div>
        <input
          type="number"
          name="listPrice"
          placeholder="List Price"
          value={productData.listPrice}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="discountPercent"
          placeholder="Discount Percent"
          value={productData.discountPercent}
          onChange={handleInputChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="enabled"
            checked={productData.enabled}
            onChange={(e) =>
              handleInputChange({
                target: { name: "enabled", value: e.target.checked },
              })
            }
          />
          Enabled
        </label>
        <label>
          <input
            type="checkbox"
            name="inStock"
            checked={productData.inStock}
            onChange={(e) =>
              handleInputChange({
                target: { name: "inStock", value: e.target.checked },
              })
            }
          />
          In Stock
        </label>
        <input
          type="number"
          name="length"
          placeholder="Length (inches)"
          value={productData.length}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="width"
          placeholder="Width (inches)"
          value={productData.width}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="height"
          placeholder="Height (inches)"
          value={productData.height}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (pounds)"
          value={productData.weight}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={productData.cost}
          onChange={handleInputChange}
          required
        />
        <div id="productDetails">
          <input
            type="text"
            placeholder="Detail Name"
            value={newDetail.name}
            onChange={(e) =>
              setNewDetail({ ...newDetail, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Detail Value"
            value={newDetail.value}
            onChange={(e) =>
              setNewDetail({ ...newDetail, value: e.target.value })
            }
          />
          <button type="button" onClick={handleAddDetail}>
            Add Detail
          </button>
          <ul>
            {productData.productDetails.map((detail, index) => (
              <li key={index}>
                {detail.name}: {detail.value}
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;

