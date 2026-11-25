export  interface UsuarioAuth{
    constrasena: string,
    correo: string,
}

export interface UsuarioSesion{
    mensaje: string,
    id_usuario: number,
}