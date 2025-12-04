import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Games, Users, Reports, Recovery, Personal_data, Friends, Auth, Sales } from './tablas';

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

  getUsers(datos:Users){
    return this.http.post('http://127.0.0.1:5000/busqueda-de-amigos', datos)
  }

  registrarUsuario(datos:Users){
    return this.http.post('http://127.0.0.1:5000/registrar', datos)
  }

  iniciarSesion(datos : {}){
    console.log("Correo y contraseña: " + datos)
    return this.http.post('http://127.0.0.1:5000/login', datos)
  }

  public getSingleUser(id:number, datos : Users){
    console.log("Id usuario: " + id)
    return this.http.post<Users>('http://127.0.0.1:5000/perfil/' + id, datos)
  }

  modificarUsuario(id:number, datos:Users){
    return this.http.put('http://127.0.0.1:5000/perfil/' + id, datos)

  }

  cambiarContrasena(id:number, datos:Users){
    return this.http.put('http://127.0.0.1:5000/contrasena/' + id, datos)
  }

  public eliminarUsuario(id:number):Observable<Users>{
    return this.http.delete<Users>('http://127.0.0.1:5000/perfil/' + id)
  }

  //-----------Amigos----------------
  public sendFriendRequest(datos:Friends){
    return this.http.post('http://127.0.0.1:5000/friendrequest', datos)
  }

  public acceptFriend(datos:Friends){
    return this.http.post('http://127.0.0.1:5000/friends', datos)
  }

  public getFriendList(id:number):Observable<Users>{
    return this.http.get<Users>('http://127.0.0.1:5000/friends/' + id)
  }

  public getFriendRequest(id:number):Observable<Users>{
    return this.http.get<Users>('http://127.0.0.1:5000/friendrequests/' + id)
  }

  public blockSomeone(datos:Friends){
    return this.http.post('http://127.0.0.1:5000/blocked', datos)
  }

  public cancelRequest(datos:Friends){
    return this.http.post('http://127.0.0.1:5000/cancelrequest', datos)
  }

  public getBlockeds(id:number):Observable<Friends>{
    return this.http.get<Friends>('http://127.0.0.1:5000/blocked/' + id)
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

  //---------Verificacion-------------------
  setCodigo(datos:Auth){
    return this.http.post('http://127.0.0.1:5000/codigoveri', datos)
  }

  checkCode(datos :Auth){
    return this.http.post('http://127.0.0.1:5000/correoveri', datos)
  }

  //-----------Ventas-----------------
  setVenta(datos : Sales){
    return this.http.post('http://127.0.0.1:5000/sales', datos)
  }

  public getHistory(id : number):Observable<Sales>{
    return this.http.get<Sales>('http://127.0.0.1:5000/historial/' + id)
  }

}




