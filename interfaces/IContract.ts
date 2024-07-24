import { CustomerInterface } from "./ICustomer";
import { EmployeeInterface } from "./IEmployee";
import { ServiceCatalogInterface } from "./IServiceCatalog";
import { SlaInterface } from "./ISla";

export interface ContractCreateInterface {
  ContractStart?: string;
  ContractStop?: string;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  Cost?: number;
  Description?: string;
  NoticeDate1?: string;
  NoticeDate2?: string;
  NoticeDate3?: string;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  ServiceCatalogID?: number;
  SlaID?: number;
  CustomerID?: string;
  EmployeeCreatedID?: string;
}

export interface ContractUpdateInterface {
  Id: string;
  ContractStart?: string;
  ContractStop?: string;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  Cost?: number;
  Description?: string;
  NoticeDate?: string;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;
  ServiceCatalogID?: number;
  SlaID?: number;
  CustomerID?: string;
  EmployeeCreatedID?: string;
}

export interface ContractInterface {
  Id: string;
  ContractStart?: Date;
  ContractStop?: Date;
  IncidentPerYear?: number;
  IncidentPerContract?: number;
  Cost?: number;
  Description?: string;
  NoticeDate?: Date;
  UpdateDate?: string;
  CreateDate?: string;
  ProjectName?: string;
  CustomerPO?: string;
  VendorPO?: string;
  ScopeOfWorkURL?: string;

  ServiceCatalogID?: number;
  ServiceCatalog?: ServiceCatalogInterface;
  SlaID?: number;
  Sla?: SlaInterface;
  CustomerID?: string;
  Customer?: CustomerInterface;
  EmployeeCreatedID?: string;
  EmployeeCreated?: EmployeeInterface;
}
