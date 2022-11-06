import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export enum Url {
  LIST='http://localhost:63823/api/article/list',
  GET='http://localhost:63823/api/article/get',
  EDIT='http://localhost:63823/api/article/edit',
  DELETE='http://localhost:63823/api/article/delete'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get<Tresult>(url: string, param?: any) {
    if (param)
      return this.http.get<Tresult>(url, { params: param });
    return this.http.get<Tresult>(url);
  }

  post<Tresult>(url: string, payload: any) {
    return this.http.post<Tresult>(url, payload);  
  }

  delete<Tresult>(url: string) {
    return this.http.delete<Tresult>(url);
  }
}
