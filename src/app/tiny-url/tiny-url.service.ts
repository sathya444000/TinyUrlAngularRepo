  import { HttpClient } from '@angular/common/http';
import { TinyUrl } from './model/tiny-url';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // 💡 Recommended: This makes it globally available
})
  export class TinyUrlService{
    
     apiUrl = 'https://localhost:7078/api/';

  constructor(private http: HttpClient) { }

  getAllUrls(): Observable<TinyUrl[]> {

  return this.http.get<TinyUrl[]>(
    `${this.apiUrl}public`
  );
} 
addUrl(body:TinyUrl):Observable<any>{
   return this.http.post<any>(
      `${this.apiUrl}add`,
      body
    )
}
deleteUrl(id:number):Observable<any>{
  return this.http.delete(`${this.apiUrl}${id}`
);
   
}
updateUrl(body:TinyUrl):Observable<any>{
    return this.http.put<any>(
      `${this.apiUrl}update`,body
    )
}
}
