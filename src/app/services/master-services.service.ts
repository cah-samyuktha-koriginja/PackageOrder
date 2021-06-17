import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MasterServicesService {

  httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  generatedToken:any;
  IoTAPI: string = environment.API_URL;
  constructor(private _http: HttpClient) { }

  getToken(){
  this.httpOptions['headers'] = this.httpOptions.headers.set('Authorization', 'Basic SjJhZXlZMDFYVXF6SlF3cllIYTQ3RDhHbjd1c0N2UTY6b21pdXNlcTVIVE1WMFR5WQ====');
  const url = "https://api.dev.cardinalhealth.com/oauth2/v2/token/jwttoken?grant_type=client_credentials";
  return this._http.post(url, null, this.httpOptions).pipe(
    map((response: any) => {
      if (!response.hasError) {
        return response;
      }
    })
  )
}


  postPatient(request, token) {
    const HeaderData = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':token }) };
    return this._http.post('https://api.dev.cardinalhealth.com/wbd/order/api/v1/compliancePackageOrder/save' , request, HeaderData);
  }
}
