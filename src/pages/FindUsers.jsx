import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/findUsers.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FindUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/v1/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      setError("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };

  const searchUser = () => {
    if (!searchName.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredUsers(filtered);

    if (filtered.length === 0) {
      setError("Usuário não encontrado.");
    } else {
      setError(null);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Deseja deletar este usuário?")) return;

    try {
      await axios.delete(`/api/v1/users/${id}`);
      alert("Usuário deletado com sucesso.");
      fetchUsers();
    } catch (err) {
      alert("Erro ao deletar usuário.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciamento de Usuários</h1>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Buscar usuário pelo nome..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "300px",
          }}
        />
        <button onClick={searchUser}>Buscar</button>
        <button onClick={fetchUsers}>Mostrar Todos</button>
        <button onClick={() => navigate("/add-user/")}>
          Adicionar Usuário
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.enabled ? "Ativo" : "Inativo"}</td>
                <td>
                  <button onClick={() => navigate(`/update-user/${user.id}`)}>
                    Update
                  </button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FindUsers;
