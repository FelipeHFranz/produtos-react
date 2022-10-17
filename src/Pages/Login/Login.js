
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginServices from "../../Services/Login.services";
import UsuarioServices from "../../Services/UsuarioServices";
import { validaremail, validarSenha } from "../../Utils/validadores";

import "./Login.css";

const initialValue = {
    email: '',
    senha: ''
}


const loginService = new LoginServices();
const usuarioService = new UsuarioServices();
const Login = () => {
    const [values, setValues] = useState(initialValue);
    const navigate = useNavigate();

    function onChange(ev) {
        const { name, value } = ev.target;
        setValues({ ...values, [name]: value });
    }

    async function onSubmit(ev) {
        
        ev.preventDefault();
        await loginService.login(values).then(async (res) => {
           
            localStorage.setItem('token', res.data.token);

            await usuarioService.getUsuario().then((res) => {

                localStorage.setItem("nome", res.data.nome)
                localStorage.setItem("email", res.data.email)
                navigate('/produtos')
            }).catch((e) => {
                console.log(e);
            })


        }).catch((e) => {
            alert("Email ou senha incorretos");
        });



    }

    const validarInput = () => {
        return validaremail(values.email) && validarSenha(values.senha);
    }
    const usuarioAutenticado = loginService.usuarioAutenticado()
    if (usuarioAutenticado) {

        return (
            <div className="test">
                <div className="user-login subContainer">
                    <p>Você já esta logado! vá para </p><NavLink to='/produtos'>Home</NavLink>
                </div>
            </div>
        )
    } else
        return (
            <div className="backgrounddiv">
                <div className="user-login">
                    <h1>Autenticação</h1>
                    <form onSubmit={onSubmit}>
                        <div className="div-form">

                           
                            <TextField label="Email" variant="standard" type="text" name='email' onChange={onChange} />
                            <TextField label="Senha" variant="standard" type="password" name='senha'  onChange={onChange} />

                        </div>

                        <div className="uibuttonLogin">
                            <Button size='small' className="uibuttonLogin" variant="contained" type="submit" disabled={!validarInput()}>
                                Entrar
                            </Button>
                        </div>


                    </form>
                    <div className="subContainer">
                        <p>Não possui conta?</p><NavLink to='/cadastro'>Cadastrar</NavLink>
                    </div>

                </div></div>
        )
}


export default Login;