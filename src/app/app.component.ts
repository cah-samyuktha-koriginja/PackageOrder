import { Component, OnInit } from '@angular/core';

import { MasterServicesService } from './services/master-services.service';

@Component({
  selector: 'app-patientform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'patientform';
  windowObj = window && window.location.origin;
  constructor(private masterServicesService: MasterServicesService) {
  }
  
  ngOnInit(): void {
    this.setEnvironment();
    this.masterServicesService.getToken().subscribe((response: any) => {
    });
  }
 
  private setEnvironment() {
    let env;
    switch (this.windowObj) {
      case "":
        env = "https://api.dev.cardinalhealth.com";
        break;
 
      case "":
        env = "https://api.stg.cardinalhealth.com";
        break;
 
      default:
        env = "https://api.dev.cardinalhealth.com";
        break;
    }
    localStorage.setItem('url', env);
  }


}
