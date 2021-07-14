import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterServicesService } from '../../../../../services/master-services.service';
import { PatientDetails, MedicationRequest, MedicationDispense, dosageInstruction, timing, lines } from '../../../../../models/patient-details.model';

@Component({
  selector: 'app-accounts-users-create',
  templateUrl: './accounts-users-create.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
  providers: [MasterServicesService, NgxSpinnerService]
})
export class AccountsUsersCreateComponent implements OnInit {
  token = {} as any;
  PatientDetailsForm = new PatientDetails();
  MedicationRequest = new MedicationRequest();
  MedicationDispense = new MedicationDispense();
  SubmitForm: FormGroup;
  activeLineDetailsTab = 'lineDetails_0';
  activeTimingDetailsTab = 'timingDetails_0';

  statusMsg: any = '';
  responseData: any;
  public showMsg: boolean = true;
  response: any;
  dayOfWeek: any;

  optionsDayOfWeek = [
    {
      name: 'mon',
      isChecked: false,
    },
    {
      name: 'tue',
      isChecked: false,
    },
    {
      name: 'wed',
      isChecked: false,
    },
    {
      name: 'thu',
      isChecked: false,
    },
    {
      name: 'fri',
      isChecked: false,
    },
    {
      name: 'sat',
      isChecked: false,
    },
    {
      name: 'sun',
      isChecked: false,
    }
  ];
  optionsTimesOfDay = [
    {
      name: 'MORN',
      isChecked: false,
    },
    {
      name: 'NOON',
      isChecked: false,
    },
    {
      name: 'EVEN',
      isChecked: false,
    },
    {
      name: 'BEDTIME',
      isChecked: false,
    }
  ];

  timeOfDayArray: Array<string> = [];
  dayOfWeekArray: Array<string> = [];
  public readonly timesOfDay: Array<string> = [];
  public readonly daysOfWeek: Array<string> = [];


  constructor(private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _APIMasters: MasterServicesService) {
    this.initiateSubmitForm();
  }
  ngOnInit(): void {
    this.refreshToken();
    this.addLineDetails();
  }
  initiateSubmitForm() {
    this.showMsg = true;
    this.statusMsg = '';
    this.response = { status: 100, statusText: 'Pending', colorCode: 'info' };

    this.SubmitForm = this._formBuilder.group({
      identifier: ['af7816a4-3b87-41c4-91d5-f4f7a0369099'],
      NCPDP: ['4583337'],
      system: ['BestRx'],
      id: ['ID00001'],
      first_name: ['Jane'],
      middle_name: [''],
      last_name: ['Jackson'],
      prefix: [null],
      suffix: [null],
      dob: ['1982-12-04'],
      home_system: ['phone'],
      home_use: ['home'],
      home_number: ['(313)123-1235'],
      line_1: ['123 Main Street'],
      line_2: ['Apt E'],
      city: ['Delaware'],
      state: ['DE'],
      postalCode: ['96079'],
      pharmacist_first_name: ['Robin'],
      pharmacist_middle_name: [''],
      pharmacist_last_name: ['Brown'],
      pharmacist_prefix: ['Pharm. D.'],
      pharmacist_suffix: ['Dr.'],

      medication_dispense_manifestId: ['9901'],
      medication_dispense_totalSyncedRX: 1,
      medication_dispense_dateNeedBy: ['2021-07-15T13:23:00Z'],
      lineDetails: this._formBuilder.array([]),
    });
  }

  //LINE Details Form Starts Here
  get lineDetails(): FormArray { return this.SubmitForm.get("lineDetails") as FormArray }
  newLineDetails(): FormGroup {
    return this._formBuilder.group({
      authorizingPrescription: '202105241557',
      authorOn: ['2020-12-06T13:23:30Z'],
      validityPeriodEnd: ['2021-12-06T13:23:30Z'],
      requestor_prefix: ['Dr.'],
      requestor_suffix: [''],
      requestor_first_name: ['Mary'],
      requestor_middle_name: [''],
      requestor_last_name: ['Malone'],
      requestor_line_1: ['15 Central Ave Suite B'],
      requestor_line_2: [''],
      requestor_city: ['Newark'],
      requestor_state: ['DE'],
      requestor_postalCode: ['19713'],
      requestor_home_system: ['phone'],
      requestor_home_use: ['work'],
      requestor_home_number: ['(313)309-4225'],
      medicationCodeableConcept_system: ['http://hl7.org/fhir/sid/ndc'],
      medicationCodeableConcept_code: ['67877-0321-05'],

      mDispanse_daysSupply: '30',
      mDispanse_quantity: '90',
      mDispanse_sig: 'TAKE 1 PILL IN THE MORNING, 2 PILLS AT NIGHT',
      mDispanse_wasSubstituted: 'false',
      mDispanse_dispenseLineid: 'ABC999',
      mDispanse_originalFillDate: '2020-08-01T12:23:00Z',
      mDispanse_dispenseStartDate: '2021-03-11T00:00:00Z',
      mDispanse_dispenseRefillNumber: '4',
      mDispanse_refillsRemaining: '3',
      mDispanse_refillMessage: '',
      mDispanse_orderType: 'ATP',
      mDispanse_RXSyncSeq: '1',
      mDispanse_concept_system: 'http://hl7.org/fhir/sid/ndc',
      mDispanse_concept_code: '67877-0321-05',

      dosageDetails: this._formBuilder.array([this.newDosageDetails()]),
      warningDetails: this._formBuilder.array([this.newWarningDetails()]),
    })
  }
  addLineDetails() {
    this.lineDetails.push(this.newLineDetails());
    this.activeLineDetailsTab = 'lineDetails_' + (this.lineDetails.length - 1);
  }
  removeLineDetails(i: number) { this.lineDetails.removeAt(i); }
  //LINE Details Form Ends Here


  //Dosage Details Form Starts Here
  getDosageDetails(lineForm) { return lineForm.controls.dosageDetails.controls; }
  newDosageDetails(): FormGroup {
    return this._formBuilder.group({
      dosage_instructions_asNeededBoolean: 'false',
      dosage_instructions_dose_quantity_value: '1',
      dosage_instructions_dose_quantity_unit: 'TAB',
      timingDetails: this._formBuilder.array([this.newTimingDetails()]),
      // timeOfDay: this._formBuilder.array([this.newTimeOfDayDetails()]),
    })
  }
  addDosageDetails(i) {
    const control = <FormArray>this.lineDetails.controls[i].get('dosageDetails');
    control.push(this.newDosageDetails());
  }
  removeDosageDetails(i: number, j: number) {
    const control = <FormArray>this.lineDetails.controls[i].get('dosageDetails');
    control.removeAt(j);
  }
  //Dosage Details Form Ends Here

  //Warning Details Form Starts Here
  getWarningDetails(lineForm) { return lineForm.controls.warningDetails.controls; }
  newWarningDetails(): FormGroup { return this._formBuilder.group({ warning: '' }) }
  addWarningDetails(i) {
    const control = <FormArray>this.lineDetails.controls[i].get('warningDetails');
    control.push(this.newWarningDetails());
  }
  removeWarningDetails(i: number, k: number) {
    const control = <FormArray>this.lineDetails.controls[i].get('warningDetails');
    control.removeAt(k);
  }
  //Warning Details Form Ends Here  

  //Timing Details Form Starts Here
  getTimingDetails(formDat) { return formDat.controls.timingDetails.controls; }
  newTimingDetails(): FormGroup {
    return this._formBuilder.group({
      timing_frequency: '1',
      timing_period: '1',
      timing_periodUnit: 'd',
      timing_count: '30',
      timeOfDay: this._formBuilder.array([this.newTimeOfDayDetails()]),
    })
  };
  addTimingDetails(i, j) {
    const control_1 = <FormArray>this.lineDetails.controls[i].get('dosageDetails');
    const control = <FormArray>control_1.controls[j].get('timingDetails');
    control.push(this.newTimingDetails());
    this.activeTimingDetailsTab = 'timingDetails_' + (control.length - 1);

  }
  removeTimingDetails(i: number, j: number, k: number) {
    const control = <FormArray>this.SubmitForm.get(['lineDetails', i, 'dosageDetails', j, 'timingDetails']);
    control.removeAt(k);
  }
  //Timing Details Form Ends Here  


  //Time Of Day Details Form Starts Here
  getTimeOfDayDetails(formDat) { return formDat.controls.timeOfDay.controls; }
  newTimeOfDayDetails(): FormGroup { return this._formBuilder.group({ timeOfDayDetails: '08:00' }) };
  addTimeOfDayDetails(i, j, k) {
    const control_1 = <FormArray>this.lineDetails.controls[i].get('dosageDetails');
    const control_2 = <FormArray>control_1.controls[j].get('timingDetails');
    const control = <FormArray>control_2.controls[k].get('timeOfDay');
    control.push(this.newTimeOfDayDetails());
  }
  removeTimeOfDayDetails(i: number, j: number, k: number, l: number) {
    const control = <FormArray>this.SubmitForm.get(['lineDetails', i, 'dosageDetails', j, 'timingDetails', k, 'timeOfDay']);
    control.removeAt(l);
  }
  //Time Of Day Details Form Ends Here  

  refreshToken() {
    //generate token
    this._APIMasters.getToken().subscribe((response: any) => {

      this.token=response.access_token;
      this.token="Bearer "+this.token;
     });
}


  submitForm() {
    const requestObj = this.SubmitForm.value;
    this.PatientDetailsForm.focus.identifier = requestObj.identifier;
    this.PatientDetailsForm.location.system = requestObj.system;
    this.PatientDetailsForm.location.NCPDP = requestObj.NCPDP;

    this.PatientDetailsForm.patient.id = requestObj.id;
    this.PatientDetailsForm.patient.birthdate = requestObj.dob;
    this.PatientDetailsForm.patient.name.prefix = requestObj.prefix;
    this.PatientDetailsForm.patient.name.suffix = requestObj.suffix;
    this.PatientDetailsForm.patient.name.family = requestObj.last_name;
    this.PatientDetailsForm.patient.name.text = requestObj.first_name + ' ' + requestObj.middle_name + ' ' + requestObj.last_name;
    this.PatientDetailsForm.patient.name.given = [];

    requestObj.first_name ? this.PatientDetailsForm.patient.name.given.push(requestObj.first_name) : '';
    requestObj.middle_name ? this.PatientDetailsForm.patient.name.given.push(requestObj.middle_name) : '';

    this.PatientDetailsForm.patient.address.line.push(requestObj.line_1);
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_2);
    this.PatientDetailsForm.patient.address.city = requestObj.city;
    this.PatientDetailsForm.patient.address.state = requestObj.state;
    this.PatientDetailsForm.patient.address.postalCode = requestObj.postalCode;

    this.PatientDetailsForm.patient.telecom.push({ "system": requestObj.home_system, "use": requestObj.home_use, "value": requestObj.home_number });

    this.PatientDetailsForm.Pharmacist.name.prefix = requestObj.pharmacist_prefix;
    this.PatientDetailsForm.Pharmacist.name.suffix = requestObj.pharmacist_suffix;
    this.PatientDetailsForm.Pharmacist.name.family = requestObj.pharmacist_last_name;
    this.PatientDetailsForm.Pharmacist.name.given = [];
    requestObj.pharmacist_first_name ? this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_first_name) : '';

    requestObj.pharmacist_middle_name ? this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_middle_name) : '';


    this.PatientDetailsForm.MedicationOrder.manifestId = requestObj.medication_dispense_manifestId;
    this.PatientDetailsForm.MedicationOrder.totalSyncedRX = requestObj.medication_dispense_totalSyncedRX;
    this.PatientDetailsForm.MedicationOrder.dateNeedBy = requestObj.medication_dispense_dateNeedBy;
    this.PatientDetailsForm.MedicationOrder.lines = [];
    //Line Details Obj Defining Starts
    requestObj.lineDetails.forEach(lineDetail => {
      let lineData = new lines();
      lineData.authorizingPrescription.value = lineDetail.authorizingPrescription;
      lineData.MedicationRequest.authorOn = lineDetail.authorOn;
      lineData.MedicationRequest.validityPeriod.end = lineDetail.validityPeriodEnd;
      lineData.MedicationRequest.medicationCodeableConcept.push({ system: lineDetail.medicationCodeableConcept_system, code: lineDetail.medicationCodeableConcept_code });

      lineData.MedicationRequest.Requestor.name.family = lineDetail.requestor_last_name;
      lineData.MedicationRequest.Requestor.name.prefix = lineDetail.requestor_prefix;
      lineData.MedicationRequest.Requestor.name.suffix = lineDetail.requestor_suffix;
      lineData.MedicationRequest.Requestor.name.text = lineDetail.requestor_first_name + ' ' + lineDetail.requestor_middle_name + ' ' + lineDetail.requestor_last_name;
      // lineData.MedicationRequest.Requestor.name.given.push(lineDetail.requestor_first_name);
      // lineDetail.requestor_middle_name ? lineData.MedicationRequest.Requestor.name.given.push(lineDetail.requestor_middle_name) : '';

      lineData.MedicationRequest.Requestor.name.given = [];
      lineDetail.requestor_first_name ? lineData.MedicationRequest.Requestor.name.given.push(lineDetail.requestor_first_name) : '';
      lineDetail.requestor_middle_name ? lineData.MedicationRequest.Requestor.name.given.push(lineDetail.requestor_middle_name) : '';

      lineData.MedicationRequest.Requestor.address.city = lineDetail.requestor_city;
      lineData.MedicationRequest.Requestor.address.state = lineDetail.requestor_state;
      lineData.MedicationRequest.Requestor.address.postalCode = lineDetail.requestor_postalCode;
      lineData.MedicationRequest.Requestor.address.city = lineDetail.requestor_last_name;
      lineData.MedicationRequest.Requestor.address.line.push(lineDetail.requestor_line_1);
      lineDetail.requestor_line_2 ? lineData.MedicationRequest.Requestor.address.line.push(lineDetail.requestor_line_2) : '';
      lineData.MedicationRequest.Requestor.telecom.push({ "system": lineDetail.requestor_home_system, "use": lineDetail.requestor_home_use, "value": lineDetail.requestor_home_number });

      lineData.MedicationDispense.dispenseLineid = lineDetail.mDispanse_dispenseLineid;
      lineData.MedicationDispense.originalFillDate = lineDetail.mDispanse_originalFillDate;
      lineData.MedicationDispense.dispenseStartDate = lineDetail.mDispanse_dispenseStartDate;
      lineData.MedicationDispense.dispenseRefillNumber = lineDetail.mDispanse_dispenseRefillNumber;
      lineData.MedicationDispense.refillsRemaining = lineDetail.mDispanse_refillsRemaining;
      lineData.MedicationDispense.refillMessage = lineDetail.mDispanse_refillMessage;
      lineData.MedicationDispense.orderType = lineDetail.mDispanse_orderType;
      lineData.MedicationDispense.RXSyncSeq = lineDetail.mDispanse_RXSyncSeq;
      lineData.MedicationDispense.substitution.wasSubstituted = lineDetail.mDispanse_wasSubstituted;
      lineData.MedicationDispense.daysSupply = lineDetail.mDispanse_daysSupply;
      lineData.MedicationDispense.quantity = lineDetail.mDispanse_quantity;
      lineData.MedicationDispense.sig = lineDetail.mDispanse_sig;

      lineData.MedicationDispense.medicationCodeableConcept.push({ system: lineDetail.mDispanse_concept_system, code: lineDetail.mDispanse_concept_code });

      //Warning Details Obj Defining Starts
      lineDetail.warningDetails.forEach(warningDetail => {
        lineData.MedicationDispense.warning.push(warningDetail.warning);
      });
      //Warning Details Obj Defining Ends

      //Dosage Details Obj Defining Starts
      lineDetail.dosageDetails.forEach(dosageDetail => {
        let dosageData = new dosageInstruction();
        dosageData.asNeededBoolean = dosageDetail.dosage_instructions_asNeededBoolean;
        dosageData.doseQuantity.unit = dosageDetail.dosage_instructions_dose_quantity_unit;
        dosageData.doseQuantity.value = dosageDetail.dosage_instructions_dose_quantity_value;
        dosageDetail.timingDetails.forEach(timingDetail => {
          let timingData = new timing();
          timingData.count = timingDetail.timing_count;
          timingData.frequency = timingDetail.timing_frequency;
          timingData.period = timingDetail.timing_period;
          timingData.periodUnit = timingDetail.timing_periodUnit;
          // timingDetail.timeOfDay.forEach(timeOfDayDet => {
          //   timingData.timeOfDay.push(timeOfDayDet.timeOfDayDetails);
          // });
          timingData.when = this.timeOfDayArray;
          timingData.dayOfWeek = this.dayOfWeekArray;
          dosageData.timing.push(timingData);
        });
        lineData.MedicationDispense.dosageInstruction.push(dosageData);
      });
      //Dosage Details Obj Defining Ends

      this.PatientDetailsForm.MedicationOrder.lines.push(lineData);
    });
    //Line Details Obj Defining Ends
    console.log(this.PatientDetailsForm)
    this._APIMasters.postPatient(this.PatientDetailsForm, this.token).subscribe(res => {
      this.responseData = res;

      this.statusMsg = this.responseData.status.message;

      var self = this; setTimeout(() => { self.showMsg = false; this.initiateSubmitForm(); }, 20000);
    }, error => {

      var self = this; setTimeout(() => { self.showMsg = false; this.initiateSubmitForm(); }, 20000);
      if (error.status == 0) {
        this.response = { status: error.status, statusText: "Token Expired", colorCode: 'danger' };
      }
      else
        this.response = { status: error.status, statusText: error.statusText, colorCode: 'danger' };

      this.LoadingScreen(false);
    });
  }
  LoadingScreen(e: any) { if (e) { this.spinner.show(); } else { this.spinner.hide(); } }


  changeDaySelection(event: any, item: any, eventTrgt: any) {
    const index = this.optionsDayOfWeek.findIndex(e => e.name === item.name);
    this.optionsDayOfWeek[index].isChecked = eventTrgt;

    this.dayOfWeekArray = []
    this.dayOfWeek = '';
    var str = new String('')
    this.optionsDayOfWeek.forEach(x => {
      if (x.isChecked) {
        this.dayOfWeek += str.concat(x.name.toString() + ' | ')
      }

    });
    this.dayOfWeek = this.dayOfWeek.slice(0, -3)
    this.dayOfWeekArray.push(this.dayOfWeek);
  }

  changeTimeSelection(event: any, item: any, eventTrgt: any) {
    const index = this.optionsTimesOfDay.findIndex(e => e.name === item.name);
    this.optionsTimesOfDay[index].isChecked = eventTrgt;

    this.timeOfDayArray = [];
    this.optionsTimesOfDay.forEach(x => {
      if (x.isChecked) {
        this.timeOfDayArray.push(x.name);
      }
    });
  }

}