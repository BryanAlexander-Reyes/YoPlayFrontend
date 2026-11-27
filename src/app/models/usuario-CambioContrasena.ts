export interface recuperarContrasena {
    mensaje: string;
}

export interface cambiarContrasena {
    token: string;
    contrasenaNueva: string;
}

export interface cambiarContrasenaResponse {
    mensaje: string;
}