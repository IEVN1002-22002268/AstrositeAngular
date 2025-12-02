export interface Games{
  id_juego: number,
  nombre: string,
  descripcion: string,
  imagen: string,
  precio: number,
  descuento: number,
  genero: string,
  plataforma: string,
  clasificacion: string
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

export interface History{

}
