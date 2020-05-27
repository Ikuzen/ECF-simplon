import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
   }

   create(user: User){
    return this.http.post<User>('localhost:3000/users', user);
   }
   
   getAll(){
    return this.http.get<User>('localhost:3000/users');

   }
   getById(id: string){
    return this.http.get<User>(`localhost:3000/users/${id}`);

   }

   update(id: string, user: User){
    return this.http.put<User>(`localhost:3000/users/${id}`,user);

   }
   deleteById(id: string){
    return this.http.delete<User>(`localhost:3000/users/${id}`);

   }
   deleteAll(){
    return this.http.delete<User>('localhost:3000/users');

   }
}
