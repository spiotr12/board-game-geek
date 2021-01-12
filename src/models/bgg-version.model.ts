import { IAttributes } from './attributes.interface';
import { BggLink, IBggLink } from './bgg-link.model';
import { BggName, IBggName } from './bgg-name.model';

interface IBggVersionAttributes {
  type: string;
  id: string;
}

export interface IBggVersion extends IAttributes<IBggVersionAttributes> {
  thumbnail?: { _text: string };
  image?: { _text: string };
  link: IBggLink[] | IBggLink;
  name: IBggName[] | IBggName;
  yearpublished: IAttributes<{ value: string }>;
  productcode: IAttributes<{ value: string }>;
  width: IAttributes<{ value: string }>;
  length: IAttributes<{ value: string }>;
  depth: IAttributes<{ value: string }>;
  weight: IAttributes<{ value: string }>;
}

export class BggVersion {
  public id: number;
  public type: string;
  public thumbnail?: string;
  public image?: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished: number;
  public productcode: string;
  public width: number;
  public length: number;
  public depth: number;
  public weight: number;

  constructor(data: IBggVersion) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.thumbnail = data.thumbnail?._text.trim();
    this.image = data.image?._text.trim();
    this.links = Array.isArray(data.link)
      ? data.link.map(link => new BggLink(link))
      : [new BggLink(data.link)];
    this.names = Array.isArray(data.name)
      ? data.name.map(name => new BggName(name))
      : [new BggName(data.name)];
    this.yearpublished = Number.parseInt(data.yearpublished._attributes.value);
    this.productcode = data.productcode._attributes.value;
    this.width = Number.parseFloat(data.width._attributes.value);
    this.length = Number.parseFloat(data.length._attributes.value);
    this.depth = Number.parseFloat(data.depth._attributes.value);
    this.weight = Number.parseFloat(data.weight._attributes.value);
  }
}
