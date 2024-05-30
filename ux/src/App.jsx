import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Pieces from "./pages/Pieces";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateProfile from "./pages/PrivateProfile";
import Error404 from "./pages/Error404";
import Error403 from "./pages/Error403";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";
import PostIndex from "./pages/PostIndex";
import PublicProfile from "./pages/PublicProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: "4rem" }}></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pieces" element={<Pieces />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/creations/index" element={<PostIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateProfile />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/error403" element={<Error403 />} />
        <Route path="*" element={<Error404 />} />
        {/* Agrega más rutas aquí según sea necesario */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
