import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inventory from "./components/Inventory";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Pieces from "./pages/Pieces";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/pieces"
          element={
            <Pieces />
          }
        ></Route>
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
