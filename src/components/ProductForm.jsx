import React, { useState } from "react";

const ProductForm = ({ onSave, initialProductId = "" }) => {
  // State para armazenar o produto. Se tiver um `initialProductId`, ele é passado para o ID
  const [product, setProduct] = useState({
    id: initialProductId, // Define o ID apenas uma vez, se já foi fornecido
    name: "",
    brand: "",
    category: "",
    price: "",
  });

  // Função chamada sempre que um campo do formulário é alterado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); // Atualiza o campo correspondente no state
  };

  // Função para salvar o produto quando o formulário é enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão do form de recarregar a página
    onSave(product); // Chama a função onSave passando os dados do produto
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {/* Mostra o ID apenas se ele estiver definido e torna o campo somente leitura */}
      {product.id && (
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={product.id}
            readOnly // Deixa o campo de ID como apenas leitura
          />
        </label>
      )}
      <label>
        Nome:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange} // Atualiza o valor no state ao digitar
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
          step="0.01" // Permite inserir valores decimais, ex: 10.99
        />
      </label>
      <button type="submit">Save</button> {/* Botão para salvar o produto */}
    </form>
  );
};

export default ProductForm;

// Código abaixo é uma versão alternativa, caso o formulário de cima nao puxe os dados automaticamente

/* import React, { useState, useEffect } from "react";
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
      axios
        .get(`http://localhost:8080/api/v1/products/${initialProductId}`)
        .then((response) => {
          const { id, name, brand, category, price } = response.data;
          setProduct({ id, name, brand, category, price }); // Preenche o state com os dados recebidos
        })
        .catch((error) => console.error("Erro ao buscar produto:", error));
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
 */
