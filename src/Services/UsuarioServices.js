import axios from "axios";
import { API } from "../const";


export default class UsuarioServices {
   header (){
      return  {headers: {
            Authorization: "Bearer " + localStorage.getItem('token')}
        }
    }


    cadastrar(values) {
        return axios.post(API.concatToAPIStorageURL('usuario'), values);
    }

    getUsuario() {
        
        return axios.get(API.concatToAPIStorageURL('usuario'), this.header());
    }
    putUsuario(value) {

        return axios.put(API.concatToAPIStorageURL('usuario'), value, this.header());
    }
    changePassword(value) {
        console.log(value);
        return axios.put(API.concatToAPIStorageURL('usuario/alterarsenha'), value, this.header());
    }

}
