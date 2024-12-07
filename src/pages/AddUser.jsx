import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/addUser.css"; // Inclua estilos específicos para o formulário
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
  const navigate = useNavigate();

  // Estado inicial do formulário
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: true, // Valor inicial para "enabled"
    roles: [], // Enviar lista de strings de permissões
  });

  // Função para manipular alterações no formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      // Manipular roles (permissões)
      setFormData((prevData) => ({
        ...prevData,
        roles: checked
          ? [...prevData.roles, value] // Adicionar permissão
          : prevData.roles.filter((role) => role !== value), // Remover permissão
      }));
    } else if (type === "select-one") {
      // Manipular select (enabled)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "true", // Convertendo string para boolean
      }));
    } else {
      // Manipular outros campos (text, email, password)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Função para enviar os dados
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do formulário

    try {
      const response = await axios.post("/api/v1/users", formData);
      alert("Usuário adicionado com sucesso!");
      console.log("Resposta do backend:", response.data);
      navigate("/users"); // Redirecionar para a lista de usuários
    } catch (error) {
      console.error(
        "Erro ao adicionar usuário:",
        error.response?.data || error.message
      );
      alert(
        `Erro: ${
          error.response?.data || "Não foi possível adicionar o usuário."
        }`
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Adicionar Novo Usuário</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="enabled" className="form-label">
            Enabled:
          </label>
          <select
            id="enabled"
            name="enabled"
            className="form-select"
            value={formData.enabled.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Permissions:</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="admin"
              value="Administrator"
              className="form-check-input"
              checked={formData.roles.includes("Administrator")}
              onChange={handleChange}
            />
            <label htmlFor="admin" className="form-check-label">
              Administrator
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="salesManager"
              value="Sales manager"
              className="form-check-input"
              checked={formData.roles.includes("Sales manager")}
              onChange={handleChange}
            />
            <label htmlFor="salesManager" className="form-check-label">
              Sales Manager
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="editor"
              value="Editor"
              className="form-check-input"
              checked={formData.roles.includes("Editor")}
              onChange={handleChange}
            />
            <label htmlFor="editor" className="form-check-label">
              Editor
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="shippingManager"
              value="Shipping manager"
              className="form-check-input"
              checked={formData.roles.includes("Shipping manager")}
              onChange={handleChange}
            />
            <label htmlFor="shippingManager" className="form-check-label">
              Shipping Manager
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="assistant"
              value="Assistant"
              className="form-check-input"
              checked={formData.roles.includes("Assistant")}
              onChange={handleChange}
            />
            <label htmlFor="assistant" className="form-check-label">
              Assistant
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddUser;
