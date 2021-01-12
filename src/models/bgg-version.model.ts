import { IAttributes } from './attributes.interface';
import { BggThing, IBggThing } from './bgg-thing.model';

export interface IBggVersion extends IBggThing {
  productcode?: IAttributes<{ value: string }>;
  width?: IAttributes<{ value: string }>;
  length?: IAttributes<{ value: string }>;
  depth?: IAttributes<{ value: string }>;
  weight?: IAttributes<{ value: string }>;
}

export class BggVersion extends BggThing {
  public productcode?: string;
  public width?: number;
  public length?: number;
  public depth?: number;
  public weight?: number;

  constructor(data: IBggVersion) {
    super(data);
    this.productcode = data.productcode?._attributes.value;
    this.width = data.width
      ? Number.parseFloat(data.width?._attributes.value)
      : undefined;
    this.length = data.length
      ? Number.parseFloat(data.length?._attributes.value)
      : undefined;
    this.depth = data.depth
      ? Number.parseFloat(data.depth?._attributes.value)
      : undefined;
    this.weight = data.weight
      ? Number.parseFloat(data.weight?._attributes.value)
      : undefined;
  }
}
