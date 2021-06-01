export class PatientDetails {
    focus = new focus();
    location = new location();
    patient = new patient();
    Pharmacist = new Pharmacist();
    MedicationOrder: MedicationOrder[];
}
export class focus {
    identifier: string;
}
export class location {
    system: string;
    NCPDP: number;
}
export class patient {
    name = new Name();
    birthdate: string;
    telecom = new Array();
    address = new Address();
}
export class telecom {
    system: string;
    use: string;
    value: string;
}
export class Name {
    given = new Array();
    family: string;
    prefix: string;
    suffix: string;
    text: string;
}
export class Address {
    line = new Array();
    city: string;
    state: string;
    postalCode: string;
}
export class Pharmacist {
    name = new name();
}
export class name {
    given = new Array();
    family: string;
    prefix: string;
    suffix: string;
}
export class MedicationOrder {
    identifier: string;
}