
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/authslice";  
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/MyAccount.css";

const MyAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); 
  const token = useSelector((state) => state.auth.token); 

  const [updatedUser, setUpdatedUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

 
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!token || !user.id) return;

      
      const updatedData = {
        id: updatedUser.id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
        ...(updatedUser.password && { password: updatedUser.password }),
      };

     
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
        setIsEditing(false);
        dispatch(updateUser(updatedData));  
        setUpdatedUser({ ...updatedUser, password: "" });
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
        <p><strong>Name:</strong> {isEditing ? <input type="text" name="name" value={updatedUser.name} onChange={handleChange} className="form-control" /> : updatedUser.name}</p>
        <p><strong>Phone:</strong> {isEditing ? <input type="tel" name="phone" value={updatedUser.phone} onChange={handleChange} className="form-control" /> : updatedUser.phone}</p>
        <p><strong>Address:</strong> {isEditing ? <input type="text" name="address" value={updatedUser.address} onChange={handleChange} className="form-control" /> : updatedUser.address}</p>
        <p><strong>Email:</strong> {updatedUser.email}</p>
        <p><strong>Password:</strong> {isEditing ? <input type="password" name="password" value={updatedUser.password} onChange={handleChange} className="form-control" /> : "******"}</p>

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

