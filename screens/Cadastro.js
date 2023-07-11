import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';


export default function Cadastro({ navigation }) {

    const [email, setEmail] = useState(null)
    const [nome, setNome] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [telefone, setTelefone] = useState(null)
    /* Por padrão, o checkbox estará desmarcado(false) */
    const [isSelected, setSelected] = useState(false)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorNome, setErrorNome] = useState(null)
    const [errorCpf, setErrorCpf] = useState(null)
    const [errorTelefone, setErrorTelefone] = useState(null)
    const [isLoading, setLoading] = useState(false)


    let cpfField = null
    let telefoneField = null

    const validar = () => {
        let error = false
        setErrorEmail(null)
        setErrorCpf(null)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if (!re.test(String(email).toLowerCase())) {
            setErrorEmail("Preencha seu e-mail corretamente")
            error = true
        }
        if (!cpfField.isValid()) {
            setErrorCpf("Preencha seu CPF corretamente")
            error = true
        }

        if (telefone == null) {
            setErrorTelefone("Preencha seu telefone corretamente")
            error = true
        }
        return !error

    }

    const salvar = () => {
        if (validar()) {
            /*console.log("Salvou")*/
            setLoading(true)
            let data = {
                email: email,
                cpf: cpf,
                nome: nome,
                telefone: telefone
            }

            /* chamando um método assíncrono que retorna uma promise:  */
            usuarioService.cadastrar(data)
                /* Tratamento da promise: */
                /* DEU CERTO */
                .then((response) => {
                    setLoading(false)
                    console.log(response.data)
                })
                /* DEU ERRADO */
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                    console.log("Deu erro")
                })


        }
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={[styles.container, specificStyle.specificContainer]}
            keyboardVerticalOffset={80}>
            <ScrollView style={{ width: "100%" }}>
                <Text h3>Cadastre-se</Text>
                <Input
                    placeholder="E-mail"
                    onChangeText={value => {
                        setEmail(value)
                        setErrorEmail(null)
                    }}
                    /*Tipo de teclado */
                    keyboardType="email-address"
                    errorMessage={errorEmail}
                />

                <Input
                    placeholder="Nome"
                    onChangeText={value => setNome(value)}
                    errorMessage={errorNome}
                />

                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="CPF"
                        type={'cpf'}
                        value={cpf}
                        onChangeText={value => {
                            setCpf(value)
                            setErrorCpf(null)
                        }}
                        /*Tipo de teclado */
                        keyboardType="number-pad"
                        /*Tipo de tecla de retorno */
                        returnKeyType="done"
                        style={styles.maskedInput}
                        /* referenciando meu objeto que está na ela(minha caixa de texto) */
                        ref={(ref) => cpfField = ref}
                    />
                </View>
                <Text style={styles.errorMessage}>{errorCpf}</Text>




                <View style={styles.containerMask}>
                    <TextInputMask
                        placeholder="Telefone"
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={telefone}
                        onChangeText={value => {
                            setTelefone(value)
                        }}
                        keyboardType="phone-pad"
                        /*Tipo de tecla de retorno */
                        returnKeyType="done"
                        style={styles.maskedInput}
                        /* referenciando meu objeto que está na ela(minha caixa de texto) */
                        ref={(ref) => telefoneField = ref}

                    />

                </View>
                <Text style={styles.errorMessage}>{errorTelefone}</Text>




                <CheckBox
                    title="Eu aceito os termos de uso"
                    checkedIcon="check"
                    uncheckedIcon="square-o"
                    checkedColor="green"
                    uncheckedColor="red"
                    checked={isSelected}
                    onPress={() => setSelected(!isSelected)}
                />


                {isLoading &&
                    <Text>Carregando...</Text>
                }

                {!isLoading &&
                    <Button
                        icon={
                            <Icon
                                name="check"
                                size={15}
                                color="white"
                            />
                        }
                        title="Salvar"
                        buttonStyle={specificStyle.button}
                        /*Evento do click     */
                        onPress={() => salvar()}

                    />
                }
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const specificStyle = StyleSheet.create({
    specificContainer: {
        backgroundColor: "#fff",
        padding: 10
    },
    button: {
        width: "100%",
        marginTop: 10
    }
})