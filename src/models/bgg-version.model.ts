import { IAttributes } from './attributes.interface';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, BggNameType, IBggName } from './bgg-name.model';

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

/**
 * Parsed version from bgg xml data
 */
export class BggVersion {
  public id: number;
  public type: 'boardgameversion' | 'bgaccessoryversion' | string;
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

  public get namesValues(): string[] {
    return this.names.map(name => name.value);
  }

  public get primaryName(): string | undefined {
    return this.names.find(name => name.type === BggNameType.primary)?.value;
  }

  public get versionFor(): BggLink | undefined {
    return this.links.find(link => link.type === BggLinkType.boardGameVersion);
  }

  public get artists(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameArtist);
  }

  public get publishers(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGamePublisher);
  }

  public get languages(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.language);
  }

  constructor(data: IBggVersion) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.thumbnail = data.thumbnail?._text?.trim();
    this.image = data.image?._text?.trim();
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
