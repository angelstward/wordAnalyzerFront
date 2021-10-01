import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { URlS } from '../constants/url';
import { TextModel } from '../models/Text.model';

@Injectable({
  providedIn: 'root'
})
export class SenderService { 
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method",
      "Access-Control-Allow-Methods": "*",
      "Allow": "*"
     
    })
  }   

  constructor(private http: HttpClient) { }

  
  httpHeaders: HttpHeaders = this.httpOptions.headers;

  public GetWords(text: TextModel): Observable<any> {    
    const token = localStorage.getItem('token');
    this.httpHeaders.append('Authorization', 'Bearer' + token);   
    return this.http.post(environment.apiUrl + URlS.PROCESSOR+URlS.SEND_TEXT,JSON.stringify(text), {headers: this.httpHeaders});
  }

  public GetToken(text: TextModel) :Observable<any>{    
    return this.http.post(environment.apiUrl + URlS.AUTH,JSON.stringify(text), this.httpOptions);
  }

}
