import React, { useState, useEffect } from "react";
import axios from "axios";

const FindUsers = () => {
  // Estado para armazenar todos os usuários
  const [users, setUsers] = useState([]);

  // Estado para armazenar os usuários filtrados com base na busca
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Estado para capturar o termo de busca inserido pelo usuário
  const [searchName, setSearchName] = useState("");

  // Estado para indicar se os dados estão sendo carregados
  const [loading, setLoading] = useState(false);

  // Estado para capturar mensagens de erro
  const [error, setError] = useState(null);

  // Função para buscar todos os usuários na API
  const fetchUsers = async () => {
    setLoading(true); // Indica que os dados estão sendo carregados
    setError(null); // Reseta qualquer erro anterior

    try {
      const response = await axios.get("http://localhost:8080/api/v1/users");
      setUsers(response.data); // Armazena os usuários no estado
      setFilteredUsers(response.data); // Inicialmente, exibe todos os usuários
    } catch (err) {
      setError("Erro ao buscar usuários."); // Define uma mensagem de erro caso a requisição falhe
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  // Função para buscar usuários pelo nome de forma insensível a maiúsculas e minúsculas
  const searchUser = (name) => {
    if (!name) {
      // Caso o campo de busca esteja vazio, exibe todos os usuários
      setFilteredUsers(users);
      return;
    }

    // Converte o termo de busca e os nomes dos usuários para letras minúsculas
    const lowerCaseName = name.toLowerCase();

    // Filtra os usuários cujo nome contém o termo de busca
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(lowerCaseName)
    );

    if (results.length === 0) {
      // Caso nenhum usuário seja encontrado, exibe uma mensagem de erro
      setError("Usuário não encontrado.");
      setFilteredUsers([]);
    } else {
      // Caso contrário, exibe os usuários encontrados e reseta o erro
      setError(null);
      setFilteredUsers(results);
    }
  };

  // Função para deletar um usuário pelo ID
  const deleteUser = async (id) => {
    // Confirmação antes de deletar o usuário
    if (!window.confirm("Deseja deletar este usuário?")) return;

    try {
      // Faz a requisição para deletar o usuário
      await axios.delete(`http://localhost:8080/api/v1/users/${id}`);
      alert("Usuário deletado com sucesso."); // Exibe uma mensagem de sucesso
      fetchUsers(); // Atualiza a lista de usuários após a exclusão
    } catch (err) {
      alert("Erro ao deletar usuário."); // Exibe uma mensagem de erro caso a exclusão falhe
    }
  };

  // Carrega a lista de usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciamento de Usuários</h1>
      <div style={{ marginBottom: "20px" }}>
        {/* Campo de entrada para buscar usuários */}
        <input
          type="text"
          placeholder="Buscar usuário pelo nome..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value); // Atualiza o estado do termo de busca
            searchUser(e.target.value); // Filtra os usuários em tempo real
          }}
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "300px",
            marginRight: "10px",
          }}
        />
        {/* Botão para buscar usuários */}
        <button onClick={() => searchUser(searchName)}>Buscar</button>
        {/* Botão para exibir todos os usuários */}
        <button onClick={fetchUsers} style={{ marginLeft: "10px" }}>
          Mostrar Todos
        </button>
      </div>

      {/* Exibe mensagens de carregamento, erro ou a tabela de usuários */}
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* Botões para ações: adicionar, atualizar e deletar */}
                  <button onClick={() => alert("Função Add")}>Add</button>
                  <button onClick={() => alert("Função Update")}>Update</button>
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
