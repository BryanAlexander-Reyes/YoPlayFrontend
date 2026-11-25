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