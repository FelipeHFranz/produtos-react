import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ProdutoServices from "../../../../Services/ProdutoService";
import { validarRequerido } from "../../../../Utils/validadores";

const produtoService = new ProdutoServices();
function ProdutoOP(props) {
    const [dataProduto, setProduto] = useState({ descricao: "", valor: "" });


    const onChange = (ev) => {

        const { name, value } = ev.target;
        setProduto({ ...dataProduto, [name]: value });
    }

    //dialog
    const { onCloseDialog, openDialog, type, produto } = props;
    const handleCloseDialog = () => {
        onCloseDialog();
    };
    useEffect(() => {

        if (type == 'edit') {

            setProduto(produto)
        }
    }, [props])

    const onSubmit = (ev) => {

        ev.preventDefault();
        if (type == "insert") {
            produtoService.cadastrar(dataProduto).then((res) => {

                onCloseDialog(res);
            }).catch(e => { console.log(e); })
        }
        if (type == "edit") {

            produtoService.putProduto({ id: produto.id, descricao: dataProduto.descricao, valor: dataProduto.valor }).then((res) => {

                onCloseDialog(res);
            }).catch(e => { console.log(e); })
        }
    }

    const validarInput = () => {
        return validarRequerido(dataProduto.descricao) && validarRequerido(dataProduto.valor)
    }
    return (

        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle>Produto</DialogTitle>
            <DialogContent>
                <form onSubmit={onSubmit}>
                    <div className="div-form">


                        <TextField label="Descrição" variant="standard" type="text" name='descricao' value={dataProduto.descricao} onChange={onChange} />
                        <TextField label="Valor" variant="standard" type="number" name='valor'value={dataProduto.valor} onChange={onChange} />

                    </div>
                   

                    <div className="uibuttonCad">
                        <Button size='small' className="uibuttonLogin" variant="contained" type="submit" disabled={!validarInput()}>
                            {type == 'insert' ? 'Cadastrar' : 'Alterar'}
                        </Button>
                    </div>


                </form>

            </DialogContent>
        </Dialog>

    )

}

export default ProdutoOP;