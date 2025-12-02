import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Games, Users, Reports, Recovery, Personal_data } from './tablas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //  --Solo Juegos--
  public getGames():Observable<Games[]>{
    return this.http.get<Games[]>('http://127.0.0.1:5000/catalogo')
  }

  public getSingleGame(id:number):Observable<Games>{
    console.log("Id juego: " + id)
    return this.http.get<Games>('http://127.0.0.1:5000/catalogo/' + id)
  }


  // --Solo Usuarios--

  public getUsers():Observable<Users[]>{
    return this.http.get<Users[]>('http://127.0.0.1:5000/busqueda-de-amigos')
  }

  registrarUsuario(datos:Users){
    return this.http.post('http://127.0.0.1:5000/registrar', datos)
  }

  iniciarSesion(datos : {}){
    console.log("Correo y contraseña: " + datos)
    return this.http.post('http://127.0.0.1:5000/login', datos)
  }

  public getSingleUser(id:number):Observable<Users>{
    console.log("Id usuario: " + id)
    return this.http.get<Users>('http://127.0.0.1:5000/perfil/' + id)
  }

  modificarUsuario(id:number, datos:Users){
    return this.http.put('http://127.0.0.1:5000/perfil/' + id, datos)

  }


  public eliminarUsuario(id:number):Observable<Users>{
    return this.http.delete<Users>('http://127.0.0.1:5000/perfil/' + id)
  }




  //-----------Reportes-----------------------

  enviarReporte(datos:Reports){
    return this.http.post('http://127.0.0.1:5000/reporte', datos)
  }

  //----------Recovery------------------------

  recuperarCuenta(datos:Recovery){
    return this.http.post('http://127.0.0.1:5000/recuperar-cuenta', datos)
  }

  //-----------Personal Data ----------------

  setPersonalData(datos:Personal_data, id:number){
    return this.http.put('http://127.0.0.1:5000/pago/' + id , datos)
  }
}


  //----------Ventas----------------
