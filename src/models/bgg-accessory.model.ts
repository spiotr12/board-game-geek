import { BggVersion, IBggVersion } from './bgg-version.model';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { IAttributes } from './attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, IBggName } from './bgg-name.model';

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
  public type: string;
  public thumbnail?: string;
  public image?: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;
  public description: string;
  public versions: BggVersion[];

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

  public get version(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.boardGameVersion)?.value;
  }

  public get language(): string | undefined {
    return this.links.find(l => l.type === BggLinkType.language)?.value;
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
