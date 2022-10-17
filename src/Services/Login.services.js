import axios from "axios";
import { API } from "../const";


export default class LoginServices {

    login(values) {
        return axios.post(API.concatToAPIStorageURL('login'), values);

    }

    usuarioAutenticado() {

        return localStorage.getItem("token") !== undefined ? true : false
    }

    async logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("nome")
        localStorage.removeItem("email")
    }
}
