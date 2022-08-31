export class Field {
  GCode!: string;
  UnitContractGcode!: string;
  TypeCode!: string;
  DurationJDate!: string;
  GnrFirmTypeGCode!: string;
  NationalId!: string;
  Name!: string;
  ShareQty!: string;
  SharePercent!: string;
  ActionUserGCode!: string;
  ActionDate!: string;
  ActionTime!: string;
}
export class Shareholders {
  state!: boolean;
  msg!: Field;
}
