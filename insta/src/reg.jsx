import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== password2) {
      alert("Passwords do not match");
      return;
    }

    // Validate password constraints
    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    // Your registration logic here
    const registrationData = createData();

    if (registrationData === false) {
      alert("Enter all the fields");
    } else if (registrationData === "Invalid") {
      alert("Username already exists");
    } else {
      // Call register function to store the registration data
      register(registrationData);
      // Redirect to login page
      navigate('/login');
    }

    // Reset the form fields
    setUsername('');
    setEmail('');
    setPassword('');
    setPassword2('');
    setImage(null);
  };

  // Function to create registration data
  const createData = () => {
    if (username === "" || email === "" || password === "" || image === null) {
      return false;
    } else if (check(username) === false) {
      return "Invalid";
    } else {
      // Convert image to Base64 string
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const imageData = reader.result; // Base64-encoded image data
        const userData = {
          username: username,
          email: email,
          password: password,
          image: imageData, // Store image data as Base64 string
          post: {}
        };
        // Call register function to store the registration data
        register(userData);
        // Redirect to login page
        navigate('/login');
      };
      return null;
    }
  };

  // Function to check if username already exists
  const check = (uname) => {
    var existingData = JSON.parse(localStorage.getItem("users")) || [];
    for (let i of existingData) {
      if (uname === i.username) {
        return false;
      }
    }
    return true;
  };

  // Function to register the user
  const register = (dataEntered) => {
    var existingData = JSON.parse(localStorage.getItem("insta")) || [];
 if (dataEntered!=null)
 {
    existingData.push(dataEntered);
    localStorage.setItem("insta", JSON.stringify(existingData));
 }
  };

  // Function to validate password constraints
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-black text-white">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Profile Picture:</label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={(event) => setImage(event.target.files[0])}
              accept="image/*"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password2" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="password2"
              className="form-control"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
