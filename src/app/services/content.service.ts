import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http : HttpClient) { 
    
  }

  
  private url = "https://litera-demo.dolooptech.com/msword_addin/"
  //private url = "http://localhost:8000/"

  public getContent(text):Observable<any>{

    const header = {
      "Authorization" : "Bearer "+localStorage.getItem("token")
    }
    return this.http.post(this.url+"getContent" , text , {headers : header});
  }

  public login(username , password){

    const body = JSON.stringify({username , password});
    return this.http.post(this.url+"login" , body);

  }

  public getProfile(){
    const header = {
      "Authorization" : "Bearer "+localStorage.getItem("token")
    }
    return this.http.get(this.url+"profile" , {headers:header})
  }
}
