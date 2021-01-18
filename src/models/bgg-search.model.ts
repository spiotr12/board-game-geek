import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { IAttributes } from './attributes.interface';
import { BggThingType } from './bgg-thing.type';
import { BggNameType, IBggName } from './bgg-name.model';

export interface IBggSearch extends IAttributes<IBggThingAttributes> {
  name: IBggName;
  yearpublished: IAttributes<{ value: string }>;
}

export class BggSearch {
  public id: number;
  public type: BggThingType | string;
  public name: string;
  public nameType: BggNameType;
  public yearpublished?: number;

  constructor(data: IBggSearch) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.name = data.name._attributes.value;
    this.nameType = data.name._attributes.type;
    this.yearpublished = data.yearpublished ? Number.parseInt(data.yearpublished._attributes.value) : undefined;
  }
}
