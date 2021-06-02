import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterServicesService } from '../../../../../services/master-services.service';
import { PatientDetails, MedicationRequest, MedicationDispense } from '../../../../../models/patient-details.model';
import { UsNumberPipe } from '../../../../../pipe/us-number-pipe';

@Component({
  selector: 'app-accounts-users-create',
  templateUrl: './accounts-users-create.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
  providers: [MasterServicesService, NgxSpinnerService, UsNumberPipe]
})
export class AccountsUsersCreateComponent implements OnInit {
  firstName = new FormControl();
  middleName = new FormControl();
  MedicationRequest = new MedicationRequest();
  MedicationDispense = new MedicationDispense();


  SubmitForm: FormGroup;
  myform: FormGroup;
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
      identifier: ['af7816a4-3b87-41c4-91d5-f4f7a0369099'],
      NCPDP: ['4583337'],
      system: ['BestRx'],
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      prefix: [null],
      suffix: [null],
      dob: [null],
      home_system: [''],
      home_use: [''],
      home_number: [null],
      work_system: [''],
      work_use: [''],
      work_number: [null],
      mobile_system: [''],
      mobile_use: [''],
      mobile_number: [null],
      line_1: [''],
      line_2: [''],
      city: [''],
      state: [null],
      postalCode: [''],
      pharmacist_first_name: [''],
      pharmacist_middle_name: [''],
      pharmacist_last_name: [''],
      pharmacist_prefix: [''],
      pharmacist_suffix: [''],
      authorOn: [''],
      validityPeriodEnd: [''],
      requestor_medication_code: [''],
      requestor_medication_system: [''],
      requestor_home_number: [''],
      requestor_home_use: [''],
      requestor_home_system: [''],
      requestor_postalCode: [''],
      requestor_state: [''],
      requestor_city: [''],
      requestor_line_2: [''],
      requestor_line_1: [''],
      requestor_dob: [''],
      requestor_last_name: [''],
      requestor_middle_name: [''],
      requestor_first_name: [''],
      requestor_suffix: [''],
      requestor_prefix: [''],
      medication_dispense_daysSupply: [''],
      medication_dispense_quantity: [''],
      medication_dispense_authorizingPrescription: [''],
      medication_dispense_substitution: [''],
      medication_dispense_dateNeedBy: [''],
      medication_dispense_originalFillDate: [''],
      medication_dispense_dispenseStartDate: [''],
      medication_dispense_dispenseRefillNumber: [''],
      medication_dispense_refillsRemaining: [''],
      medication_dispense_refillMessage: [''],
      medication_dispense_manifestId: [''],
      medication_dispense_orderType: [''],
      medication_dispense_totalSyncedRX: [''],
      medication_dispense_RXSyncSeq: [''],
      medication_dispense_medication_system: [''],
      medication_dispense_medication_code: [''],



      dosage_instructions_1_text: [''],
      dosage_instructions_1_asNeededBoolean: [''],
      dosage_instructions_1_additionalInstruction: [''],
      dosage_instructions_1_dose_quantity_value: [''],
      dosage_instructions_1_dose_quantity_unit: [''],
      dosage_instructions_1_timing_frequency: [''],
      dosage_instructions_1_timing_period: [''],
      dosage_instructions_1_timing_periodUnit: [''],
      dosage_instructions_1_timing_count: [''],
      dosage_instructions_1_timing_timeOfDay_1: [''],
      dosage_instructions_1_timing__timeOfDay_2: [''],
      
      
      
      dosage_instructions_2_text: [''],
      dosage_instructions_2_asNeededBoolean: [''],
      dosage_instructions_2_additionalInstruction_1: [''],
      dosage_instructions_2_additionalInstruction_2: [''],
      dosage_instructions_2_additionalInstruction_3: [''],
      dosage_instructions_2_additionalInstruction_4: [''],

      dosage_instructions_2_dose_quantity_value: [''],
      dosage_instructions_2_dose_quantity_unit: [''],
      dosage_instructions_2_timing_frequency: [''],
      dosage_instructions_2_timing_period: [''],
      dosage_instructions_2_timing_periodUnit: [''],
      dosage_instructions_2_timing_count: [''],
      dosage_instructions_2_timing_timeOfDay_1: [''],
      dosage_instructions_2_timing__timeOfDay_2: [''],



    });
  }
  submitForm() {
    const requestObj = this.SubmitForm.value;
    this.PatientDetailsForm.focus.identifier = requestObj.identifier;
    this.PatientDetailsForm.location.system = requestObj.system;
    this.PatientDetailsForm.location.NCPDP = requestObj.NCPDP;

    this.PatientDetailsForm.patient.name.family = requestObj.last_name;
    this.PatientDetailsForm.patient.name.prefix = requestObj.prefix;
    this.PatientDetailsForm.patient.name.suffix = requestObj.suffix;
    this.PatientDetailsForm.patient.name.text = requestObj.first_name + ' ' + requestObj.middle_name + ' ' + requestObj.last_name;
    this.PatientDetailsForm.patient.name.given.push(requestObj.first_name);
    this.PatientDetailsForm.patient.name.given.push(requestObj.middle_name);
    this.PatientDetailsForm.patient.birthdate = requestObj.dob;

    this.PatientDetailsForm.patient.address.city = requestObj.city;
    this.PatientDetailsForm.patient.address.state = requestObj.state;
    this.PatientDetailsForm.patient.address.postalCode = requestObj.postalCode;
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_1);
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_2);

    this.PatientDetailsForm.patient.telecom[0] = { "system": requestObj.home_system, "use": requestObj.home_use, "value": requestObj.home_number };
    this.PatientDetailsForm.patient.telecom[1] = { "system": requestObj.work_system, "use": requestObj.work_use, "value": requestObj.work_number };
    this.PatientDetailsForm.patient.telecom[2] = { "system": requestObj.mobile_system, "use": requestObj.mobile_use, "value": requestObj.mobile_number };

    this.PatientDetailsForm.Pharmacist.name.family = requestObj.pharmacist_last_name;
    this.PatientDetailsForm.Pharmacist.name.prefix = requestObj.pharmacist_prefix;
    this.PatientDetailsForm.Pharmacist.name.suffix = requestObj.pharmacist_suffix;
    this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_first_name);
    this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_middle_name);


    this.MedicationRequest.authorOn =  requestObj.authorOn;
    this.MedicationRequest.validityPeriod.end =  requestObj.validityPeriodEnd;
    this.MedicationRequest.medicationCodeableConcept[0].code =  requestObj.requestor_medication_code;
    this.MedicationRequest.medicationCodeableConcept[0].system =  requestObj.requestor_medication_system;

    this.MedicationRequest.Requestor.name.family =  requestObj.requestor_last_name;
    this.MedicationRequest.Requestor.name.prefix =  requestObj.requestor_prefix;
    this.MedicationRequest.Requestor.name.suffix =  requestObj.requestor_suffix;
    this.MedicationRequest.Requestor.name.text =  requestObj.requestor_first_name+' '+requestObj.requestor_middle_name+' '+requestObj.requestor_last_name;
    this.MedicationRequest.Requestor.name.given.push(requestObj.requestor_first_name);
    this.MedicationRequest.Requestor.name.given.push(requestObj.requestor_middle_name);

    this.MedicationRequest.Requestor.address.city =  requestObj.requestor_city;
    this.MedicationRequest.Requestor.address.postalCode =  requestObj.requestor_postalCode;
    this.MedicationRequest.Requestor.address.state =  requestObj.requestor_state;
    this.MedicationRequest.Requestor.address.line.push(requestObj.requestor_line_1);
    this.MedicationRequest.Requestor.address.line.push(requestObj.requestor_line_2);
    this.MedicationRequest.Requestor.telecom[0] = { "system": requestObj.requestor_home_system, "use": requestObj.requestor_home_use, "value": requestObj.requestor_home_number };


    this.MedicationDispense.daysSupply = requestObj.medication_dispense_daysSupply;
    this.MedicationDispense.quantity = requestObj.medication_dispense_quantity;
    this.MedicationDispense.authorizingPrescription.value = requestObj.medication_dispense_authorizingPrescription;
    this.MedicationDispense.substitution.wasSubstituted = requestObj.medication_dispense_substitution;

    this.MedicationDispense.extension.dateNeedBy = requestObj.medication_dispense_dateNeedBy;
    this.MedicationDispense.extension.originalFillDate = requestObj.medication_dispense_originalFillDate;
    this.MedicationDispense.extension.dispenseStartDate = requestObj.medication_dispense_dispenseStartDate;
    this.MedicationDispense.extension.dispenseRefillNumber = requestObj.medication_dispense_dispenseRefillNumber;
    this.MedicationDispense.extension.refillsRemaining = requestObj.medication_dispense_refillsRemaining;
    this.MedicationDispense.extension.refillMessage = requestObj.medication_dispense_refillMessage;
    this.MedicationDispense.extension.manifestId = requestObj.medication_dispense_manifestId;
    this.MedicationDispense.extension.orderType = requestObj.medication_dispense_orderType;
    this.MedicationDispense.extension.totalSyncedRX = requestObj.medication_dispense_totalSyncedRX;
    this.MedicationDispense.extension.RXSyncSeq = requestObj.medication_dispense_RXSyncSeq;

    this.MedicationDispense.medicationCodeableConcept[0].system = requestObj.medication_dispense_medication_system;
    this.MedicationDispense.medicationCodeableConcept[0].code = requestObj.medication_dispense_medication_code;




    this.MedicationDispense.dosageInstruction[0].asNeededBoolean = requestObj.dosage_instructions_1_asNeededBoolean;
    this.MedicationDispense.dosageInstruction[0].text = requestObj.dosage_instructions_1_text;
    this.MedicationDispense.dosageInstruction[0].additionalInstruction[0].text = requestObj.dosage_instructions_1_additionalInstruction;
    this.MedicationDispense.dosageInstruction[0].doseQuantity.unit = requestObj.dosage_instructions_1_dose_quantity_unit;
    this.MedicationDispense.dosageInstruction[0].doseQuantity.value = requestObj.dosage_instructions_1_dose_quantity_value;
    this.MedicationDispense.dosageInstruction[0].timing[0].count = requestObj.dosage_instructions_1_timing_count;
    this.MedicationDispense.dosageInstruction[0].timing[0].frequency = requestObj.dosage_instructions_1_timing_frequency;
    this.MedicationDispense.dosageInstruction[0].timing[0].period = requestObj.dosage_instructions_1_timing_period;
    this.MedicationDispense.dosageInstruction[0].timing[0].periodUnit = requestObj.dosage_instructions_1_timing_periodUnit;
    this.MedicationDispense.dosageInstruction[0].timing[0].timeOfDay.push(requestObj.dosage_instructions_1_timing_timeOfDay_1);
    this.MedicationDispense.dosageInstruction[0].timing[0].timeOfDay.push(requestObj.dosage_instructions_1_timing__timeOfDay_2);


    this.MedicationDispense.dosageInstruction[1].asNeededBoolean = requestObj.dosage_instructions_2_asNeededBoolean;
    this.MedicationDispense.dosageInstruction[1].text = requestObj.dosage_instructions_2_text;

    this.MedicationDispense.dosageInstruction[1].additionalInstruction[0].text = requestObj.dosage_instructions_2_additionalInstruction_1;
    this.MedicationDispense.dosageInstruction[1].additionalInstruction.push({text: requestObj.dosage_instructions_2_additionalInstruction_2});
    this.MedicationDispense.dosageInstruction[1].additionalInstruction.push({text: requestObj.dosage_instructions_2_additionalInstruction_3});
    this.MedicationDispense.dosageInstruction[1].additionalInstruction.push({text: requestObj.dosage_instructions_2_additionalInstruction_4});

    this.MedicationDispense.dosageInstruction[1].doseQuantity.unit = requestObj.dosage_instructions_2_dose_quantity_unit;
    this.MedicationDispense.dosageInstruction[1].doseQuantity.value = requestObj.dosage_instructions_2_dose_quantity_value;
    this.MedicationDispense.dosageInstruction[1].timing[0].count = requestObj.dosage_instructions_2_timing_count;
    this.MedicationDispense.dosageInstruction[1].timing[0].frequency = requestObj.dosage_instructions_2_timing_frequency;
    this.MedicationDispense.dosageInstruction[1].timing[0].period = requestObj.dosage_instructions_2_timing_period;
    this.MedicationDispense.dosageInstruction[1].timing[0].periodUnit = requestObj.dosage_instructions_2_timing_periodUnit;
    this.MedicationDispense.dosageInstruction[1].timing[0].timeOfDay.push(requestObj.dosage_instructions_2_timing_timeOfDay_1);
    this.MedicationDispense.dosageInstruction[1].timing[0].timeOfDay.push(requestObj.dosage_instructions_2_timing__timeOfDay_2);




    this.PatientDetailsForm.MedicationOrder[0].MedicationRequest = this.MedicationRequest;
    this.PatientDetailsForm.MedicationOrder[0].MedicationDispense = this.MedicationDispense;
    this._APIMasters.postPatient(this.PatientDetailsForm).subscribe(data => {}, error => { this.LoadingScreen(false); });
  }
  LoadingScreen(e: any) { if (e) { this.spinner.show(); } else { this.spinner.hide(); } }
}
