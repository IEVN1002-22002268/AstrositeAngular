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
  id_user?: number,
  Correo: string,
  Username: string,
  Nombre: string,
  Contrasena: string,
  FechaNac: Date,
  foto?: string,
  descripcion?: string,
  telefono?: number
}

export interface History{

}
