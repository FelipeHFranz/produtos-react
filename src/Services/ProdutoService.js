
import axios from "axios";
import { API } from "../const";


export default class ProdutoServices {
    header (){
        return  {headers: {
              Authorization: "Bearer " + localStorage.getItem('token')}
          }
      }


    cadastrar(values) {
        return axios.post(API.concatToAPIStorageURL('produto'), values, this.header());
    }

    getProdutos() {
        return axios.get(API.concatToAPIStorageURL('produto/all'), this.header());
    }
    getProdutoById(id) {
        return axios.get(API.concatToAPIStorageURL('produto/' + id), this.header());
    }
    putProduto(values) {
        console.log(values);
        return axios.put(API.concatToAPIStorageURL('produto'),values, this.header());
    }
    deleteProduto(id) {
        return axios.delete(API.concatToAPIStorageURL('produto/' + id), this.header());
    }


}
