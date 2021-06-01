import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterServicesService } from '../../../../../services/master-services.service';
import { PatientDetails } from '../../../../../models/patient-details.model';
import { UsNumberPipe } from '../../../../../pipe/us-number-pipe';

@Component({
  selector: 'app-accounts-users-create',
  templateUrl: './accounts-users-create.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
  providers: [MasterServicesService, NgxSpinnerService, UsNumberPipe]
})
export class AccountsUsersCreateComponent implements OnInit {
  SubmitForm: FormGroup;
  PatientDetailsForm = {} as PatientDetails;
  titleList: any[] = [{ label: "Mr" }, { label: "Mrs" }, { label: "Ms" }];
  contactTypeList: any[] = [{ label: 'Phone', id: 'P' }, { label: 'Email', id: 'E' }];
  contactUseList: any[] = [{ label: 'Home', id: 'H' }, { label: 'Work', id: 'W' }, { label: 'Mobile', id: 'M' }];
  stateList: any[] = [{ label: 'Delaware', code: 'DE' }, { label: 'California', code: 'CA' }];
  constructor(private spinner: NgxSpinnerService, private _formBuilder: FormBuilder, private _APIMasters: MasterServicesService, private UsNumberPipe: UsNumberPipe) {
  }
  ngOnInit(): void {
    this.PatientDetailsForm = new PatientDetails();
    this.SubmitForm = this._formBuilder.group({
      identifier: ['af7816a4-3b87-41c4-91d5-f4f7a0369099', [Validators.required]],
      NCPDP: ['4583337', [Validators.required]],
      system: ['BestRx', [Validators.required]],
      first_name: ['', [Validators.required]],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      prefix: [null, [Validators.required]],
      suffix: [null, [Validators.required]],
      dob: [null, [Validators.required]],

      home_system: ['', [Validators.required]],
      home_use: ['', [Validators.required]],
      home_number: [null, [Validators.required]],
      work_system: ['', [Validators.required]],
      work_use: ['', [Validators.required]],
      work_number: [null, [Validators.required]],
      mobile_system: ['', [Validators.required]],
      mobile_use: ['', [Validators.required]],
      mobile_number: [null, [Validators.required]],

      line_1: ['', [Validators.required]],
      line_2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: [null, [Validators.required]],
      postalCode: ['', [Validators.required]],

      pharmacist_first_name: ['', [Validators.required]],
      pharmacist_middle_name: ['', [Validators.required]],
      pharmacist_last_name: ['', [Validators.required]],
      pharmacist_prefix: ['', [Validators.required]],
      pharmacist_suffix: ['', [Validators.required]],
    });
  }
  // CreateNewRecord() {
  //   this.FormValidation();
  //   if (!this.SubmitForm.invalid) {
  //     this.LoadingScreen(true);
  //     const RequestObj = this.SubmitForm.value;
  //     this._APIMasters.postPatient(RequestObj).subscribe(data => {
  //       this.LoadingScreen(false);
  //       const Response = 'Response';
  //       this.response = data[Response];
  //       if (this.response.statusCode === 1) { this.SubmitForm.reset(); }
  //     }, error => { this.LoadingScreen(false);});
  //   } else {
  //   }
  // }
  submitForm() {
    const requestObj = this.SubmitForm.value;
    this.PatientDetailsForm.focus.identifier = requestObj.identifier;
    this.PatientDetailsForm.location.system = requestObj.system;
    this.PatientDetailsForm.location.NCPDP = requestObj.NCPDP;

    this.PatientDetailsForm.patient.name.family = requestObj.last_name;
    this.PatientDetailsForm.patient.name.prefix = requestObj.prefix;
    this.PatientDetailsForm.patient.name.suffix = '';
    this.PatientDetailsForm.patient.name.text = requestObj.first_name + ' ' + requestObj.middle_name + ' ' + requestObj.last_name;
    this.PatientDetailsForm.patient.name.suffix = '';
    this.PatientDetailsForm.patient.name.given.push(requestObj.first_name);
    this.PatientDetailsForm.patient.name.given.push(requestObj.middle_name);
    this.PatientDetailsForm.patient.birthdate = requestObj.dob;

    this.PatientDetailsForm.patient.address.city = requestObj.city;
    this.PatientDetailsForm.patient.address.state = requestObj.state;
    this.PatientDetailsForm.patient.address.postalCode = requestObj.postalCode;
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_1);
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_2);

    this.PatientDetailsForm.patient.telecom.push({ "system": requestObj.home_system, "use": requestObj.home_use, "value": requestObj.home_number });
    this.PatientDetailsForm.patient.telecom.push({ "system": requestObj.work_system, "use": requestObj.work_use, "value": requestObj.work_number });
    this.PatientDetailsForm.patient.telecom.push({ "system": requestObj.mobile_system, "use": requestObj.mobile_use, "value": requestObj.mobile_number });

    this.PatientDetailsForm.Pharmacist.name.family = requestObj.pharmacist_last_name;
    this.PatientDetailsForm.Pharmacist.name.prefix = requestObj.pharmacist_prefix;
    this.PatientDetailsForm.Pharmacist.name.suffix = requestObj.pharmacist_suffix;
    this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_first_name);
    this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_middle_name);

    this._APIMasters.postPatient(this.PatientDetailsForm).subscribe(data => {
    }, error => { this.LoadingScreen(false); });
  }
  LoadingScreen(e: any) { if (e) { this.spinner.show(); } else { this.spinner.hide(); } }
}