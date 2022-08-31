import {NavItem} from '../nav/nav-item';

export class Field {
  token!: string;
  FirstName!: string;
  LastName!: string;
  NationalId!: string;
  Mobile!: string;
  Email!: string;
  GnrSexGcode!: string;
  FatherName!: string;
  IdNumber!: string;
  BirthDate!: string;
  RoleId!: number;
  UserGroupGCode!: number;
  UserGroupRankGCode!: number;
  menu!: NavItem;
}
// tslint:disable-next-line:class-name
export class companies {
  firmName!: string;
  FirminfoGcode!: string;
  roleName!: string;
  menu!: NavItem[];
}
export class CurrentUser {
  msg!: string;
  state!: boolean;
  user!: Field;
  companies!: companies[];
}

export class GetToken {
  state!: boolean;
  msg!: string;
}
