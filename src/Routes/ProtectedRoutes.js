import Login from "../Pages/Login/Login";
import LoginServices from "../Services/Login.services";


const loginService = new LoginServices();

const ProtectedRoutes = ({ children }) => {
    
    const usuarioAutenticado = loginService.usuarioAutenticado()
    return usuarioAutenticado ? children : <Login/>




}

export default ProtectedRoutes;