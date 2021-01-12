import { IAttributes } from './attributes.interface';
import { BggPoll, IBggPoll } from './bgg-poll.model';
import { BggVersion, IBggVersion } from './bgg-version.model';
import { BggThing, IBggThing } from './bgg-thing.model';

export interface IBggItem extends IBggThing {
  description: { _text: string };
  minplayers: IAttributes<{ value: string }>;
  maxplayers: IAttributes<{ value: string }>;
  poll: IBggPoll[];
  playingtime: IAttributes<{ value: string }>;
  minplaytime: IAttributes<{ value: string }>;
  maxplaytime: IAttributes<{ value: string }>;
  minage: IAttributes<{ value: string }>;
  versions?: { item: IBggVersion[] | IBggVersion }
}

export class BggItem extends BggThing {
  public description: string;
  public minplayers: number;
  public maxplayers: number;
  public polls: BggPoll[];
  public playingtime: number;
  public minplaytime: number;
  public maxplaytime: number;
  public minage: number;
  public versions: BggVersion[];

  constructor(data: IBggItem) {
    super(data);
    this.description = data.description._text.trim();
    this.minplayers = Number.parseInt(data.minplayers._attributes.value);
    this.maxplayers = Number.parseInt(data.maxplayers._attributes.value);
    this.polls = data.poll.map(poll => new BggPoll(poll));
    this.playingtime = Number.parseInt(data.playingtime._attributes.value);
    this.minplaytime = Number.parseInt(data.minplaytime._attributes.value);
    this.maxplaytime = Number.parseInt(data.maxplaytime._attributes.value);
    this.minage = Number.parseInt(data.minage._attributes.value);
    this.versions = data.versions
      ? Array.isArray(data.versions.item)
        ? data.versions.item.map(version => new BggVersion(version))
        : [new BggVersion(data.versions.item)]
      : [];
  }
}
