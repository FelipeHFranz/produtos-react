import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
function DeleteDialog(props) {
    const { onCloseDialog, openDialog,  message,name } = props;


    const handleCloseDialog = () => {
        onCloseDialog(false);
    };
    return (

        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle>Excluir</DialogTitle>
            <DialogContent>

                {message} : {name} ?
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" autoFocus onClick={() => onCloseDialog(true)}>
                    Sim
                </Button>
                <Button variant="contained" color="success" onClick={() => onCloseDialog(false)} autoFocus>
                    Não
                </Button>
            </DialogActions>
        </Dialog>

    )

}


export default DeleteDialog;