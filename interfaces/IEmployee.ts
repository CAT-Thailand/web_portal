import { DevisionInterface } from "./IDevision";
import { RoleInterface } from "./IRole";
export interface EmployeeInterface {
  Id: string;
  Name?: string;

  Phone?: string;
  LineID?: string;
  Email?: string;
  StartDate: Date;
  ProbationDate: Date;
  TerminationDate: Date;
  UpdateDate: Date;
  CreateDate: Date;

  RoleID?: string;
  DevisiontID?: string;
  EmployeeCreatedID: string;
  SupervisorID: string;

  EmployeeCreated?: EmployeeInterface;
  Supervisor?: EmployeeInterface;
  Role?: RoleInterface;
  Devision?: DevisionInterface;
}

export interface EmployeeCreateInterface {
  Name?: string;

  Phone?: string;
  LineID?: string;
  Email?: string;
  StartDate: Date;
  ProbationDate?: Date;
  TerminationDate?: Date;

  RoleID?: string;
  DevisiontID?: string;
  EmployeeCreatedID: string;
  SupervisorID: string;
}
