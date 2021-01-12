import { IAttributes } from './attributes.interface';
import { BggLink, IBggLink } from './bgg-link.model';
import { BggName, IBggName } from './bgg-name.model';

interface IBggThingAttributes {
  type: string;
  id: string;
}

export interface IBggThing extends IAttributes<IBggThingAttributes> {
  thumbnail?: { _text: string };
  image?: { _text: string };
  link?: IBggLink[] | IBggLink;
  name?: IBggName[] | IBggName;
  yearpublished?: IAttributes<{ value: string }>;
}

export class BggThing {
  public id: number;
  public type: string;
  public thumbnail?: string;
  public image?: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;

  // Getters
  public get name(): BggName | undefined { return this.names[0]; }

  public get nameValue(): string | undefined { return this.names[0]?.value; }

  constructor(data: IBggThing) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.thumbnail = data.thumbnail?._text.trim();
    this.image = data.image?._text.trim();
    this.links = data.link
      ? Array.isArray(data.link)
        ? data.link.map(link => new BggLink(link))
        : [new BggLink(data.link)]
      : [];
    this.names = data.name
      ? Array.isArray(data.name)
        ? data.name.map(name => new BggName(name))
        : [new BggName(data.name)]
      : [];
    this.yearpublished = data.yearpublished ? Number.parseInt(data.yearpublished._attributes.value) : undefined;
  }
}
