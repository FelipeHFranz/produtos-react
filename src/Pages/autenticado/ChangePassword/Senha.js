import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import UsuarioServices from "../../../Services/UsuarioServices";
import { validarSenha } from "../../../Utils/validadores";
import "./Senha.css"

const usuarioService = new UsuarioServices();
function Senha(props) {
    const [senhas, setUsuario] = useState([]);


    const onChange = (ev) => {

        const { name, value } = ev.target;
        setUsuario({ ...senhas, [name]: value });
    }
    const onSubmit = async (ev) => {

        ev.preventDefault();

        await usuarioService.changePassword(senhas).then((res) => {

            alert('Atualizada');
            onCloseDialog();
        }).catch((e) => {
            console.log(e);
            alert('Não fou possivel atualizar');
        })
    }


    //dialgo
    const { onCloseDialog, openDialog } = props;

    const handleCloseDialog = () => {
        onCloseDialog();
    };
    const validarInput = () => {

        return validarSenha(senhas.senhaAtual) && validarSenha(senhas.senhaNova);
    }



    return (

        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle>Alterar senha</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <div className="div-form">

                        <TextField label="Senha Atual" variant="standard" type="password" name='senhaAtual' onChange={onChange} />
                        <TextField label="Nova Senha" variant="standard" type="password" name='senhaNova' onChange={onChange} />

                    </div>

                    <div className="uibuttonCad">
                        <Button size='small' className="uibuttonLogin" variant="contained" type="submit" disabled={!validarInput()}>
                            Alterar
                        </Button>
                    </div>


                </form>

            </DialogContent>
        </Dialog>

    )


}

export default Senha;