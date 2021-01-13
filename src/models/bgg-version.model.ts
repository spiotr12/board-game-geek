import { IAttributes } from './attributes.interface';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, IBggName } from './bgg-name.model';

export interface IBggVersion extends IAttributes<IBggThingAttributes> {
  thumbnail?: { _text: string }; // In: accessory
  image?: { _text: string }; // In: accessory
  link?: IBggLink[] | IBggLink;
  name?: IBggName[] | IBggName;
  yearpublished?: IAttributes<{ value: string }>;
  productcode?: IAttributes<{ value: string }>;
  width?: IAttributes<{ value: string }>;
  length?: IAttributes<{ value: string }>;
  depth?: IAttributes<{ value: string }>;
  weight?: IAttributes<{ value: string }>;
}

export class BggVersion {
  public id: number;
  public type: string;
  public thumbnail?: string;
  public image?: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;
  public productcode?: string;
  public width?: number;
  public length?: number;
  public depth?: number;
  public weight?: number;

  // Getters
  public get name(): BggName | undefined {
    return this.names[0];
  }

  public get nameValue(): string | undefined {
    return this.names[0]?.value;
  }

  public get category(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameCategory)?.value;
  }

  public get mechanic(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameMechanic)?.value;
  }

  public get family(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameFamily)?.value;
  }

  public get expansion(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameExpansion)?.value;
  }

  public get implementation(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameImplementation)?.value;
  }

  public get designer(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameDesigner)?.value;
  }

  public get artist(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameArtist)?.value;
  }

  public get publisher(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGamePublisher)?.value;
  }

  public get language(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.language)?.value;
  }

  constructor(data: IBggVersion) {
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
