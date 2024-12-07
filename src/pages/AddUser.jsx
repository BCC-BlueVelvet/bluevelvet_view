import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/addUser.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    enabled: true,
    roles: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        roles: checked
          ? [...prevData.roles, value] // Adiciona a role
          : prevData.roles.filter((role) => role !== value), // Remove a role
      }));
    } else if (type === "select-one") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value === "true",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.roles.length === 0)
      newErrors.roles = "At least one role must be selected.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post("/api/v1/users", formData);
      alert("User added successfully!");
      navigate("/users");
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
      alert(`Error: ${error.response?.data || "Failed to add the user."}`);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Enabled */}
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

        {/* Permissions */}
        <div className="mb-3">
          <label className="form-label">Permissions:</label>
          {[
            "Administrator",
            "Sales manager",
            "Editor",
            "Shipping manager",
            "Assistant",
          ].map((role) => (
            <div className="form-check" key={role}>
              <input
                type="checkbox"
                id={role}
                value={role}
                className="form-check-input"
                checked={formData.roles.includes(role)}
                onChange={handleChange}
              />
              <label htmlFor={role} className="form-check-label">
                {role}
              </label>
            </div>
          ))}
          {errors.roles && (
            <div className="text-danger mt-2">{errors.roles}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddUser;
