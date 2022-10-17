import React, { useEffect, useState } from "react";
import ProdutoServices from "../../../../Services/ProdutoService";
import "./ProdutoList.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, CardContent, CardHeader, IconButton, TablePagination } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProdutoOP from "../Produto-op/Produto-op";
import DeleteDialog from "../../../../Utils/Delete/Delete";



const produtoService = new ProdutoServices();
const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);

    function getProdutos() {
        produtoService.getProdutos().then((res) => {

            setProdutos(res.data)
        })
    }


    useEffect(() => {
        getProdutos();
    }, [])

    //dialog cadastro de produto
    const [produtoOP, setprodutoOP] = useState({ type: null, produto: null });
    const [openProdutoOPDialog, setOpenProdutoOPDialog] = useState(false);
    const onProdutoOPDialog = (type, produto) => {

        produtoOP.type = type;
        produtoOP.produto = produto;
        setOpenProdutoOPDialog(true);
    }
    const closeProdutoOPDialog = (value) => {
        getProdutos();
        setOpenProdutoOPDialog(false);
    };

    //dialog delete
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteProduto, setDelete] = useState({ id: null, message: null, name: null });
    const onDeleteDialog = (produto) => {
        deleteProduto.id = produto.id;
        deleteProduto.message = "Realmente deseja excluir o produto";
        deleteProduto.name = produto.descricao;
        setOpenDeleteDialog(true);
    }
    const closeDeleteOPDialog = (value) => {
        if (value) {
            produtoService.deleteProduto(deleteProduto.id).then(res => {
                setProdutos(produtos.filter(x => x.id != deleteProduto.id));
                alert("Produto excluido");
            }).catch(e => {
                console.log(e);
                alert("Não foi possivel excluir");
            })
        }
        setOpenDeleteDialog(false);
    };

    //funções de conf da tabela
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Card className='card'>

            <CardHeader
                action={
                    <IconButton size="large" color="primary" onClick={() => onProdutoOPDialog('insert')}>
                        <AddCircleIcon />
                    </IconButton>
                }
                title="Produtos"

            />

            <CardContent>
                <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Descrição</TableCell>
                                <TableCell align="left">Valor</TableCell>
                                <TableCell align="left">Editar</TableCell>
                                <TableCell align="left">Deletar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                                <TableRow key={i}>
                                    <TableCell align="left">{row.descricao}</TableCell>
                                    <TableCell align="left">{row.valor}</TableCell>
                                    <TableCell align="left">
                                        <IconButton color="success" onClick={() => onProdutoOPDialog("edit", row)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton color="error" onClick={() => onDeleteDialog(row)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[1, 5, 10, 50]} count={produtos.length} rowsPerPage={rowsPerPage} page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage} />
            </CardContent>
            <ProdutoOP openDialog={openProdutoOPDialog}
                onCloseDialog={closeProdutoOPDialog} type={produtoOP.type} produto={produtoOP.produto} />
            <DeleteDialog openDialog={openDeleteDialog}
                onCloseDialog={closeDeleteOPDialog} id={deleteProduto.type} message={deleteProduto.message} name={deleteProduto.name} />
        </Card>

    )
}



export default ProdutoList;