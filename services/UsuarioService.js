import axios from "axios"

class UsuarioService {

    async cadastrar(data) {
        return axios({
            url: "http://192.168.0.47:3000/usuario/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => {
            /* PROMESSA de cadastro com sucesso  */
            return Promise.resolve(response)
        }).catch((error) => {
            /* PROMESSA de cadastro SEM sucesso, passando o erro que deu */
            return Promise.reject(error)
        })

    }
}

const usuarioService = new UsuarioService()
export default usuarioService