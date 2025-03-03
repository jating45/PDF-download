import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const navigate = useNavigate();

  const handleViewPDF = () => {
    navigate("/view-pdf"); 
  };

  return (
    <header className="bg-primary text-white py-3 shadow-lg">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="fs-3 fw-bold">Welcome to our page</h1>
        <button className="btn btn-light text-primary" onClick={handleViewPDF}>
          View PDF
        </button>
      </div>
    </header>
  );
};

export default Header;
