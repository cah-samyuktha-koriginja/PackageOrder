import { Component, OnInit } from '@angular/core';
import { MasterServicesService } from './services/master-services.service';
@Component({
  selector: 'app-patientform-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'patientform';
  constructor(private masterServicesService: MasterServicesService) {
  }
  
  ngOnInit(): void {
    this.masterServicesService.getToken().subscribe((response: any) => {      
     //console.log(response)
    });
   }


}
