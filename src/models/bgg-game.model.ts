import { IAttributes } from './attributes.interface';
import { BggPoll, IBggPoll } from './bgg-poll.model';
import { BggVersion, IBggVersion } from './bgg-version.model';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, IBggName } from './bgg-name.model';

export interface IBggGame extends IAttributes<IBggThingAttributes> {
  thumbnail: { _text: string };
  image: { _text: string };
  name: IBggName[] | IBggName;
  description: { _text: string };
  yearpublished: IAttributes<{ value: string }>;
  minplayers: IAttributes<{ value: string }>;
  maxplayers: IAttributes<{ value: string }>;
  poll: IBggPoll[];
  playingtime: IAttributes<{ value: string }>;
  minplaytime: IAttributes<{ value: string }>;
  maxplaytime: IAttributes<{ value: string }>;
  minage: IAttributes<{ value: string }>;
  link: IBggLink[] | IBggLink;
  versions: { item: IBggVersion[] | IBggVersion }
}

export class BggGame {
  public id: number;
  public type: string;
  public thumbnail: string;
  public image: string;
  public links: BggLink[];
  public names: BggName[];
  public yearpublished?: number;
  public description: string;
  public minplayers: number;
  public maxplayers: number;
  public polls: BggPoll[];
  public playingtime: number;
  public minplaytime: number;
  public maxplaytime: number;
  public minage: number;
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

  constructor(data: IBggGame) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.thumbnail = data.thumbnail._text.trim();
    this.image = data.image._text.trim();
    this.links = Array.isArray(data.link)
      ? data.link.map(link => new BggLink(link))
      : [new BggLink(data.link)];
    this.names = Array.isArray(data.name)
      ? data.name.map(name => new BggName(name))
      : [new BggName(data.name)];
    this.yearpublished = data.yearpublished ? Number.parseInt(data.yearpublished._attributes.value) : undefined;
    this.description = data.description._text.trim();
    this.minplayers = Number.parseInt(data.minplayers._attributes.value);
    this.maxplayers = Number.parseInt(data.maxplayers._attributes.value);
    this.polls = data.poll.map(poll => new BggPoll(poll));
    this.playingtime = Number.parseInt(data.playingtime._attributes.value);
    this.minplaytime = Number.parseInt(data.minplaytime._attributes.value);
    this.maxplaytime = Number.parseInt(data.maxplaytime._attributes.value);
    this.minage = Number.parseInt(data.minage._attributes.value);
    this.versions = Array.isArray(data.versions.item)
      ? data.versions.item.map(version => new BggVersion(version))
      : [new BggVersion(data.versions.item)];
  }
}
