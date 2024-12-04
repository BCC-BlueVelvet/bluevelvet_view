import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/UpdateUser.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Lista fixa de roles como fallback
const rolesListFallback = [
  { id: 1, name: "Administrator", description: "Administrator role" },
  { id: 2, name: "USER", description: "Standard user role" },
  { id: 3, name: "Editor", description: "Manager role" },
];

const UpdateUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: false,
    roles: [], // Inicializado como array vazio
  });

  const [availableRoles, setAvailableRoles] = useState([]); // Estado para armazenar as opções de roles

  useEffect(() => {
    // Busca os dados do usuário
    if (userId) {
      axios
        .get(`/api/v1/users/${userId}`)
        .then((response) => {
          const user = response.data || {};
          setUserData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            password: "",
            enabled: user.enabled || false,
            roles: Array.isArray(user.roles) ? user.roles : [],
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }

    // Define a lista inicial de roles com fallback
    setAvailableRoles(rolesListFallback);

    /*
    // Busca as roles disponíveis, com fallback para lista fixa
    axios
      .get("/api/v1/roles")
      .then((response) => {
        setAvailableRoles(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
        setAvailableRoles(rolesListFallback); // Usa a lista fixa caso a API falhe
      }); */
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRolesChange = (e) => {
    const rolesArray = e.target.value.split(",").map((role) => role.trim());
    setUserData({ ...userData, roles: rolesArray });
  };

  const handleSave = () => {
    axios
      .put(`/api/v1/users/${userId}`, userData)
      .then(() => {
        alert("User updated successfully!");
        navigate("/find-users");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("An error occurred while updating the user.");
      });
  };

  const handleCancel = () => {
    navigate("/find-users");
  };

  return (
    <div className="card shadow-lg border-0 text-white fundo">
      <div className="card-header text-center">
        <h2>Update User</h2>
      </div>
      <div className="card-body">
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            placeholder="Enter the user's first name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            placeholder="Enter the user's last name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            placeholder="Enter the user's email"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            placeholder="Enter a new password (optional)"
          />
        </div>

        {/* Enabled */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="enabled"
            name="enabled"
            checked={userData.enabled}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="enabled">
            Enabled
          </label>
        </div>

        {/* Roles */}
        <div className="mb-3">
          <label htmlFor="roles" className="form-label">
            Roles
          </label>
          <select
            multiple
            className="form-select"
            id="roles"
            name="roles"
            value={userData.roles}
            onChange={(e) =>
              setUserData({
                ...userData,
                roles: Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                ),
              })
            }
          >
            {availableRoles.length > 0 ? (
              availableRoles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))
            ) : (
              <option disabled>Loading roles...</option>
            )}
          </select>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
