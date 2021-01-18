import { IAttributes } from './attributes.interface';

export type IBggName = IAttributes<{
  type: BggNameType;
  value: string;
  sortindex?: string;
}>

export enum BggNameType {
  primary = 'primary',
  alternate = 'alternate'
}

/**
 * Parsed name from bgg xml data
 */
export class BggName {
  public value: string;
  public type: BggNameType;
  public sortindex?: string;

  constructor(data: IBggName) {
    this.value = data._attributes.value;
    this.type = data._attributes.type;
    this.sortindex = data._attributes.sortindex;
  }
}
