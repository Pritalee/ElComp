import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  getUserDetails(username,password){
    //post these details to API server return user info if correct
  }

  getData(){
    return this.http.get('http://localhost:1234/file.php')
    .subscribe(data=>{
      console.log("we got",data)
    })
  }

}
