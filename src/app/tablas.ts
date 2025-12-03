export interface Games{
  ID_Juego?: number,
  Nombre: string,
  Descripcion: string,
  Imagen: string,
  Precio: number,
  Descuento: number,
  Genero: string,
  Plataforma: string,
  Clasificacion: string
}

export interface Users{
  ID_User?: number,
  Correo?: string,
  Username?: string,
  Nombre?: string,
  Contrasena?: string,
  FechaNac?: Date,
  Foto?: string,
  Descripcion?: string,
  Telefono?: number
}

export interface Reports{
  Correo: string,
  Tema: string,
  Descripcion: string,
  Imagen: string
}

export interface Auth{
  ID_Auth? : number,
  Correo : string,
  Code : number
}

export interface Friends{
  ID_User1?: number,
  ID_User2?: number,
  Status? : number,
  Fecha : Date
}

export interface Personal_data{
  ID_Data?: number,
  ID_User: number,
  Tipo : string,
  NumeroTarjeta: string,
  Vigencia: string,
  CVC: string,
  NombrePropietario: string,
  ApellidoPropietario: string,
  Pais: string,
  CP: number
}

export interface Recovery{
  Correo: string,
  Contrasena: string
}

export interface Sales{
  ID_Sale?: number,
  ID_User: number,
  Fecha: Date,
  ID_Juego: number,
  PrecioTotal: number,
  Descuento: number
}
