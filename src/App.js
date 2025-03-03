import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Viewpage from "./components/viewpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/view-pdf" element={<Viewpage/>} />
      </Routes>
    </Router>
  );
};

export default App;
