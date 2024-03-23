import React from "react";
import Register from "./reg";
import Login from "./log";
import Home from "./home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
