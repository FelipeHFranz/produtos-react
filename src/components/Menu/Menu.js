import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginServices from "../../Services/Login.services";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import "./Menu.css"
import Usuario from "../../Pages/autenticado/Usuario/Usuario";
import Senha from "../../Pages/autenticado/ChangePassword/Senha";
const loginService = new LoginServices();
function MenuNavBar() {

    const navigate = useNavigate();

    function Logout() {
        loginService.logout();
        navigate("/login")
    }

    const nome = localStorage.getItem('nome');
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    //dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [openSenhaDialog, setOpenSenhaDialog] = useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClickOpenSenha = () => {
        setOpenSenhaDialog(true);
    };
    const handleCloseDialog = (value) => {
        setOpenDialog(false);
        setOpenSenhaDialog(false);
    };
    return (


        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        App
                    </Typography>

                    <Button color="inherit"

                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AccountCircleSharpIcon /> {nome?.split(' ')[0]}
                    </Button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickOpen}>Usuário</MenuItem>
                        <MenuItem onClick={handleClickOpenSenha}>Trocar senha</MenuItem>
                        <MenuItem onClick={Logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Usuario

                openDialog={openDialog}
                onCloseDialog={handleCloseDialog}
            />
            <Senha
                openDialog={openSenhaDialog}
                onCloseDialog={handleCloseDialog}
            />
        </Box>
    )
}

export default MenuNavBar