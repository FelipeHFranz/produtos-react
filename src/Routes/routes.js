import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuNavBar from "../components/Menu/Menu";
import ProdutoList from "../Pages/autenticado/produto/Produto-List/ProdutiList";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Login from "../Pages/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes";



const Routering = () => {
    return (
        <Router>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="cadastro" element={<Cadastro />} />
               
                <Route path="produtos" element={<ProtectedRoutes>  <MenuNavBar/><ProdutoList/></ProtectedRoutes>} />
            </Routes>
        </Router>
    )
}

export default Routering;