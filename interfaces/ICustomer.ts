import { EmployeeInterface } from "./IEmployee";

export interface CustomerInterface {
  Id: string;
  CompanyName?: string;
  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;
  GoogleMapURL?: string;
  Address?: string;
  Description?: string;
  TagGroupCustomer?: string;
  TaxNumber?: string;
  CreateDate?: Date;
  UpdateDate?: Date;
}

export interface CustomerCreateInterface {
  CompanyName?: string;
  ContactPerson?: string;
  ContactNumber?: string;
  ContactEmail?: string;
  ContactLineID?: string;
  GoogleMapURL?: string;
  Address?: string;
  Description?: string;
  TagGroupCustomer?: string;
  TaxNumber?: string;
  EmployeeCreatedId?: string;
}
