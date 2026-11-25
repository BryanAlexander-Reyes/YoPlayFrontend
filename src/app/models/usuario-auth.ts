export  interface UsuarioAuth{
    contrasena: string,
    correo: string,
}

export interface UsuarioSesion{
    mensaje: string,
    id_usuario: number,
}