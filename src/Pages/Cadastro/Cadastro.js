import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginServices from "../../Services/Login.services";
import UsuarioServices from "../../Services/UsuarioServices";
import { validarConfirmarSenha, validaremail, validarNome, validarSenha } from "../../Utils/validadores";
import './Cadastro.css';


const usuarioService = new UsuarioServices();
const loginServices = new LoginServices();
const Cadastro = () => {
    const [form, setForm] = useState([]);


    const navigate = useNavigate();

    const onChange = (ev) => {

        const { name, value } = ev.target;
        setForm({ ...form, [name]: value });
    }

    async function onSubmit(ev) {

        ev.preventDefault();
        const res = await usuarioService.cadastrar(form).then(function (response) {

            navigate('/login')
        }).catch(function (error) {
            alert(error.response.data)
        });;


        if (res === true) {
            navigate('/login')
        }
    }

    const validarInput = () => {

        return validaremail(form.email) && validarNome(form.nome) && validarSenha(form.senha) && validarConfirmarSenha(form.senha, form.confirmarSenha);
    }
    const usuarioAutenticado = loginServices.usuarioAutenticado()
    if (usuarioAutenticado) {

        return (
            <div className="test">
                <div className="user-login subContainer">
                    <p>Você já esta logado! vá para </p><NavLink to='/'>Home</NavLink>
                </div>
            </div>
        )
    } else
        return (
            <div className="backgrounddiv">
                <div className="div-cad">
                    <h1>Cadastrar</h1>
                    <form onSubmit={onSubmit}>
                        <div className="div-form">

                            <TextField label="Nome completo" variant="standard" type="text" name='nome' onChange={onChange} error={!validarNome(form.nome)} />

                            <TextField label="Email" variant="standard" type="text" name='email' onChange={onChange} error={!validaremail(form.email)} />
                            <TextField label="Senha" variant="standard" type="password" name='senha' onChange={onChange} error={!validarSenha(form.senha)} />
                            <TextField label="Confirme sua senha" variant="standard" type="password" name='confirmarSenha'
                                error={!validarConfirmarSenha(form.senha, form.confirmarSenha)} onChange={onChange} />

                        </div>

                        <div className="uibuttonCad">
                            <Button size='small' className="uibuttonLogin" variant="contained" type="submit" disabled={!validarInput()}>
                                Entrar
                            </Button>
                        </div>

                        <div className="subContainer">
                            <p>Já possui cadastro? </p><NavLink to='/login'>Login</NavLink>
                        </div>
                    </form>

                </div>
            </div>
        )
}

export default Cadastro;