import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

   create(user: User){
    return this.http.post<User>('http://localhost:3000/users', user);
   }
   
   getAll(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/users');

   }
   getById(id: string){
    return this.http.get<User>(`http://localhost:3000/users/${id}`);

   }
   
   getByName(username: string){
    return this.http.get<User>(`http://localhost:3000/users/username/${username}`);

   }


   update(id: string, user: User){
    return this.http.put<User>(`http://localhost:3000/users/${id}`,user);

   }
   deleteById(id: string){
    return this.http.delete<User>(`http://localhost:3000/users/${id}`);

   }
   deleteAll(){
    return this.http.delete<User>('http://localhost:3000/users');

   }
}
