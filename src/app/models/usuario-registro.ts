export interface Documento{
    id:number,
}

export interface UsuarioRegistro{
    Nombre:string,
    apellido:string,
    email:string,
    contrasena:string,
    tipo_documento:Documento,
    numero_documento:string,
    fecha_nacimiento:string,
    telefono:string,
    terminos:boolean,
}

export interface UsuarioRegistroResponse{
    mensaje:string,
    id_usuario:number,
    id_contrasena:number,
}

export interface CorreoRegistro{
    correo:string,       
}

export interface CorreoRegistroResponse{
    Mensaje:string,
}

export interface CodigoVerificacion{
    codigo:string,
    correo:string,
    proposito:string,
}

export interface CodigoVerificacionResponse{
    Mensaje:string,
    token?:string,
}

