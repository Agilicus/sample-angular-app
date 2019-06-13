import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RbacInfo } from './rbac.model';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  rbac: RbacInfo;
  constructor(private http: HttpClient) { }

  getRbac(id_token:string): Observable<RbacInfo> {
    let msg = { 'id_token': id_token };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post('https://auth.egov.city/whoami',
      msg,
      httpOptions).pipe(
        tap(
            _rbac => {
              this.rbac = _rbac;
            }
        )
      );
  }
}
