import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authslice";  
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MyAccount.css";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token"); // Fetch token from local storage

  const [updatedUser, setUpdatedUser] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);

  // Sync local state with Redux state when `user` changes
  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  // Handle input field changes for editing user details
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Enable edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle profile update API request
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!token || !updatedUser.id) return; // Ensure token and user ID exist before updating

    try {
      // Construct updated user data, including password only if provided
      const updatedData = {
        id: updatedUser.id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
        ...(updatedUser.password ? { password: updatedUser.password } : {}), 
      };

      // Send update request to the backend
      const response = await fetch(`http://localhost:5000/user/update/${updatedUser.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false); // Exit edit mode
        dispatch(updateUser(data.user)); // Update Redux state with new user data
        setUpdatedUser({ ...updatedData, password: "" }); // Clear password field after update
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="my-account-card">
      <h1 className="text-center">My Account</h1>
      <div className="account-details">
        <p><strong>Name:</strong> {isEditing ? <input type="text" name="name" value={updatedUser.name || ""} onChange={handleChange} className="form-control" /> : updatedUser.name}</p>
        <p><strong>Phone:</strong> {isEditing ? <input type="tel" name="phone" value={updatedUser.phone || ""} onChange={handleChange} className="form-control" /> : updatedUser.phone}</p>
        <p><strong>Address:</strong> {isEditing ? <input type="text" name="address" value={updatedUser.address || ""} onChange={handleChange} className="form-control" /> : updatedUser.address}</p>
        <p><strong>Email:</strong> {updatedUser.email}</p>
        <p><strong>Password:</strong> {isEditing ? <input type="password" name="password" value={updatedUser.password || ""} onChange={handleChange} className="form-control" /> : "******"}</p>

        {/* Show "Edit" button when not editing, and "Update" button when in edit mode */}
        {!isEditing ? (
          <button type="button" className="btn btn-edit" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button type="submit" className="btn btn-update" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
