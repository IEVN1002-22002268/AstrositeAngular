export interface Games{
  ID_Juego: number,
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
  Correo: string,
  Username: string,
  Nombre: string,
  Contrasena: string,
  FechaNac: Date,
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
