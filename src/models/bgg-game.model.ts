import { IAttributes } from './attributes.interface';
import { BggPoll, IBggPoll } from './bgg-poll.model';
import { BggVersion, IBggVersion } from './bgg-version.model';
import { IBggThingAttributes } from './bgg-thing-attributes.interface';
import { BggLink, BggLinkType, IBggLink } from './bgg-link.model';
import { BggName, BggNameType, IBggName } from './bgg-name.model';

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

/**
 * Parsed game from bgg xml data
 */
export class BggGame {
  public id: number;
  public type: 'boardgame' | string;
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

  public get namesValues(): string[] {
    return this.names.map(name => name.value);
  }

  public get primaryName(): string | undefined {
    return this.names.find(name => name.type === BggNameType.primary)?.value;
  }

  public get categories(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameCategory);
  }

  public get mechanics(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameMechanic);
  }

  public get families(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameFamily);
  }

  public get expansions(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameExpansion);
  }

  public get implementations(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameImplementation);
  }

  public get designers(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameDesigner);
  }

  public get artists(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGameArtist);
  }

  public get publishers(): BggLink[] {
    return this.links.filter(link => link.type === BggLinkType.boardGamePublisher);
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
