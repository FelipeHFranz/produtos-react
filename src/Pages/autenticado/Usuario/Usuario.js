import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import UsuarioServices from "../../../Services/UsuarioServices";
import { validaremail, validarNome } from "../../../Utils/validadores";

import "./Usuario.css"

const usuarioService = new UsuarioServices();
function Usuario(props) {
    const [usuario, setUsuario] = useState('');

    useEffect(() => {
        usuarioService.getUsuario().then((res) => {

            setUsuario(res.data)
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    const onChange = (ev) => {

        const { name, value } = ev.target;
        setUsuario({ ...usuario, [name]: value });
    }
    const onSubmit = async (ev) => {

        ev.preventDefault();

        await usuarioService.putUsuario(usuario).then((res) => {

            alert('Atualizado');
            onCloseDialog();
        }).catch((e) => {
            console.log(e);
            alert('Não fou possivel atualizar');
        })
    }
    const validarInput = () => {

        return validaremail(usuario.email) && validarNome(usuario.nome);
    }

    //dialog
    const { onCloseDialog, openDialog } = props;

    const handleCloseDialog = () => {
        onCloseDialog();
    };




    return (

        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle>Usuário</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <div className="div-form">

                        <TextField label="Nome" variant="standard" type="text" name='nome' value={usuario.nome} onChange={onChange} />
                        <TextField label="Email" variant="standard" type="text" name='email' value={usuario.email} onChange={onChange} />

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

export default Usuario;