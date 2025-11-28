import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Games, Users } from './tablas';

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

}
