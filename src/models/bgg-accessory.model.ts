import { BggVersion, IBggVersion } from './bgg-version.model';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { IAttributes } from './attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, BggNameType, IBggName } from './bgg-name.model';

export interface IBggAccessory extends IAttributes<IBggThingAttributes> {
  thumbnail?: { _text: string };
  image?: { _text: string };
  name: IBggName[] | IBggName;
  description: { _text: string };
  yearpublished?: IAttributes<{ value: string }>;
  link: IBggLink[] | IBggLink;
  versions: { item: IBggVersion[] | IBggVersion }
}

export class BggAccessory {
  public id: number;
  public type: 'boardgameaccessory' | string;
  public thumbnail?: string;
  public image?: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;
  public description: string;
  public versions: BggVersion[];

  // Getters

  public get namesValues(): string[] {
    return this.names.map(name => name.value);
  }

  public get primaryName(): string | undefined {
    return this.names.find(name => name.type === BggNameType.primary)?.value;
  }

  public get publishers(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGamePublisher);
  }

  public get accessoryFor(): BggLink | undefined {
    return this.links.find(link => link.type === BggLinkType.boardGameAccessory);
  }

  constructor(data: IBggAccessory) {
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
    this.yearpublished = data.yearpublished ? Number.parseInt(data.yearpublished._attributes.value) : undefined;
    this.description = data.description._text.trim();
    this.versions = Array.isArray(data.versions.item)
      ? data.versions.item.map(version => new BggVersion(version))
      : [new BggVersion(data.versions.item)];
  }
}
