import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginCredentials = login();
    if (loginCredentials[0] === username && loginCredentials[1] === password) {
        navigate('/Home');
    } else {
      alert("Enter valid Name and Password");
    }
  };

  const login = () => {
    const existingData = JSON.parse(localStorage.getItem("insta")) || [];
    for (let i of existingData) {
      if (username === i.username && password === i.password) {
        // Store login credentials in sessionStorage
        const sessionData = JSON.parse(sessionStorage.getItem("insta")) || [];
        sessionData.push({ username: username, password: password });
        sessionStorage.setItem("instaa", JSON.stringify(sessionData));
        alert("User Login Successfully");
        return [username, password];
      }
    }
    return ['', ''];
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-black text-white">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="luname" className="form-label">Username:</label>
            <input
              type="text"
              id="luname"
              className="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lpass" className="form-label">Password:</label>
            <input
              type="password"
              id="lpass"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
