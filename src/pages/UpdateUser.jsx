import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/UpdateUser.css"; // Inclua estilos específicos para o formulário
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    isActive: false,
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`/api/v1/users/${userId}`)
        .then((response) => {
          const user = response.data || {};
          setUserData({
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            role: user.role || "",
            isActive: user.isActive || false,
          });
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleReturn = () => {
    navigate("/find-users");
  };

  return (
    <div className="card shadow-lg border-0 text-white fundo">
      <div className="card-header text-center">
        <h2>Update User</h2>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter the user's name"
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
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Enter the user's phone"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Enter the user's address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              placeholder="Enter the user's role"
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isActive"
              name="isActive"
              checked={userData.isActive}
              onChange={handleInputChange}
            />
            <label htmlFor="isActive" className="form-check-label">
              Active User
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-primary"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleReturn}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
