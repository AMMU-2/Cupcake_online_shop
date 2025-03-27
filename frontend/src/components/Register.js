import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../css/register.css'; 

export default function Register() {
  // State variables to store form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // API call to register user
    fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, address, password, confirmPassword }), 
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error); // Display error message if registration fails
      } else {
        navigate('/login'); // Redirect to login page on successful registration
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
      setError('An error occurred. Please try again.');
    });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center" style={{ width: "100%", marginLeft: "20%" }}>
        <div className="col-md-6">
          <div className="register-container">
            <h2 className="text-center" style={{ backgroundColor: 'rgb(231,84,128)' }}>Create Account</h2>
            <form onSubmit={handleSubmit}>
              
              {/* Name Input Field */}
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control pink-border" name="name" value={name}
                  onChange={(e) => setName(e.target.value)} required />
              </div>

              {/* Email Input Field */}
              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control pink-border" name="email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>

              {/* Phone Number Input Field */}
              <div className="form-group">
                <label>Phone Number:</label>
                <input type="tel" className="form-control pink-border" name="phone" value={phone}
                  onChange={(e) => setPhone(e.target.value)} required />
              </div>

              {/* Address Input Field */}
              <div className="form-group">
                <label>Address:</label> 
                <input type="text" className="form-control pink-border" name="address" value={address}
                  onChange={(e) => setAddress(e.target.value)} required />
              </div>

              {/* Password Input Field */}
              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control pink-border" name="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {/* Confirm Password Input Field */}
              <div className="form-group">
                <label>Confirm Password:</label>
                <input type="password" className="form-control pink-border" name="confirmPassword" value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              {/* Display error message if any */}
              {error && <p className="text-danger">{error}</p>}

              {/* Submit Button */}
              <button type="submit" className="btn btn-pink btn-block mt-3">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
