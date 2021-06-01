import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({ providedIn: 'root' })
export class MasterServicesService {
  IoTAPI: string = environment.API_URL;
  constructor(private _http: HttpClient) { }
  postPatient(request) {
    const HeaderData = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this._http.post(this.IoTAPI + 'api/postPatient', request, HeaderData);
  }
}