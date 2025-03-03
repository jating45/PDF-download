import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
<footer className="bg-dark text-white py-3 mt-4">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()}Hello Everyone</p>
      </div>
    </footer>
  )
}

export default Footer