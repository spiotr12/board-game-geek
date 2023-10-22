import { IAttributes } from './attributes.interface';
import { IBggRank, BggRank } from './bgg-rank.model';
import { BggThingType } from './bgg-thing.type';

export interface IBggCollectionAttributes {
  objecttype: string;
  objectid: string;
  subtype: string;
  collid: string;
}
export type IBggStatus = IAttributes<{
  own: '0' | '1';
  prevowned: '0' | '1';
  fortrade: '0' | '1';
  want: '0' | '1';
  wanttoplay: '0' | '1';
  wanttobuy: '0' | '1';
  wishlist: '0' | '1';
  preordered: '0' | '1';
  lastmodified: string;
}>;

export type StatusType =
  | 'own'
  | 'prevowned'
  | 'fortrade'
  | 'want'
  | 'wanttoplay'
  | 'wanttobuy'
  | 'wishlist'
  | 'preordered';
export type IBggTextAttribute = { _text: string };

type IAtributesValue = IAttributes<{ _value: string }>;

export type IBggCollectionStats = IAttributes<{
  minplayers: string;
  maxplayers: string;
  minplaytime?: string;
  maxplaytime?: string;
  playingtime?: string;
  numowned: string;
}> & {
  rating: IAtributesValue & {
    usersrated: IAtributesValue;
    average: IAtributesValue;
    bayesaverage: IAtributesValue;
    stddev: IAtributesValue;
    median: IAtributesValue;
    ranks: {
      rank: IBggRank[] | IBggRank;
    };
  };
};
export class BggCollectionStats {
  minPlayers: number;
  maxPlayers: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  avgPlaytime?: number;
  numowned: number;
  personalRating?: number;
  usersrated: number;
  average: number;
  bayesaverage: number;
  stddev: number;
  median: number;
  ranks?: BggRank[] | BggRank;
  constructor(data: IBggCollectionStats) {
    this.minPlayers = parseInt(data._attributes.minplayers);
    this.maxPlayers = parseInt(data._attributes.maxplayers);
    this.minPlaytime = parseIntUndefined(data._attributes.minplaytime);
    this.maxPlaytime = parseIntUndefined(data._attributes.maxplaytime);
    this.avgPlaytime = parseIntUndefined(data._attributes.playingtime);
    this.numowned = parseInt(data._attributes.numowned);
    this.personalRating = parseFloat(data.rating._attributes._value);
    this.usersrated = parseInt(data.rating.usersrated._attributes._value);
    this.average = parseFloat(data.rating.average._attributes._value);
    this.bayesaverage = parseFloat(data.rating.bayesaverage._attributes._value);
    this.stddev = parseFloat(data.rating.stddev._attributes._value);
    this.median = parseFloat(data.rating.median._attributes._value);
    const rank = data.rating.ranks.rank;
    this.ranks = Array.isArray(rank)
      ? rank.map((rank) => new BggRank(rank))
      : [rank].map((rank) => new BggRank(rank));
  }
}

export interface IBggCollectionItem
  extends IAttributes<IBggCollectionAttributes> {
  name: IAttributes<{
    sortindex?: string;
  }> & { _text: string };
  yearpublished: IBggTextAttribute;
  thumbnail?: IBggTextAttribute;
  image?: IBggTextAttribute;
  status: IBggStatus;
  numplays: IBggTextAttribute;
  comment?: IBggTextAttribute;

  stats?: IBggCollectionStats;
}

export type Collection = {
  username: string;
  things: BggCollectionItem[];
};

export class BggCollectionItem {
  id: number;
  collId: number;
  type: BggThingType | string;
  name: string;
  yearpublished: number;
  image?: string;
  thumbnail?: string;
  statusList: { status: StatusType[]; lastModified: string };
  numPlays: number;
  comment?: string;
  stats?: BggCollectionStats;

  constructor(data: IBggCollectionItem) {
    this.id = parseInt(data._attributes.objectid);
    this.collId = parseInt(data._attributes.collid);
    this.type = data._attributes.subtype;
    this.name = data.name._text;
    this.yearpublished = parseInt(data.yearpublished._text);
    this.image = data?.image?._text;
    this.thumbnail = data?.thumbnail?._text;
    this.statusList = {
      status: Object.entries(data.status._attributes)
        .filter(([, flag]) => (flag as string) === '1')
        .map(([status]) => status) as StatusType[],
      lastModified: data.status._attributes.lastmodified,
    };
    this.numPlays = parseInt(data.numplays._text);
    this.comment = data?.comment?._text;

    if (data.stats) this.stats = new BggCollectionStats(data.stats);
  }

  get status(): StatusType | StatusType[] {
    return this.statusList.status;
  }
  get lastModified(): string {
    return this.statusList.lastModified;
  }
}

function parseIntUndefined(
  string?: string,
  radix?: number
): number | undefined {
  return string ? parseInt(string, radix) : undefined;
}
