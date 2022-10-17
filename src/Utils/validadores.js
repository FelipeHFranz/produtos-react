const validaremail = (email) => {
    return email?.toString().includes("@") && email?.toString().includes(".");
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}
const validarNome = (nome) => {
    return nome?.toString().length > 4
}
const validarRequerido = (nome) => {
    return nome?.toString().length > 0
}

const validarConfirmarSenha = (senha, confirmarSenha) => {
    return validarSenha(senha) && senha == confirmarSenha
}
export {
    validarSenha,
    validaremail,
    validarConfirmarSenha,
    validarNome, validarRequerido

}