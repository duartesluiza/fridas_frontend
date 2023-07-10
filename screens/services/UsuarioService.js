import axios from "axios";


class UsuarioService {
    async cadastrar(data) {
        return axios({
            url: "http://192.168.0.17:3000/usuario/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'aplication/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}