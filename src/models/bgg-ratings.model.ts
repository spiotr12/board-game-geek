import { IAttributes } from './attributes.interface';
import { BggRank } from './bgg-rank.model';

export type IBggRatings = {
  average: IAttributes<{ value: string }>;
  averageweight: IAttributes<{ value: string }>;
  bayesaverage: IAttributes<{ value: string }>;
  median: IAttributes<{ value: string }>;
  numcomments: IAttributes<{ value: string }>;
  numweights: IAttributes<{ value: string }>;
  owned: IAttributes<{ value: string }>;
  ranks: {
    rank: IAttributes<{
      bayesaverage: string;
      friendlyname: string;
      id: string;
      name: string;
      type: string;
      value: string;
    }>[];
  };
  stddev: IAttributes<{ value: string }>;
  trading: IAttributes<{ value: string }>;
  usersrated: IAttributes<{ value: string }>;
  wanting: IAttributes<{ value: string }>;
  wishing: IAttributes<{ value: string }>;
};

export class BggRatings {
  private _ranks: BggRank[];

  public average: number;
  public averageweight: number;
  public bayesaverage: number;
  public median: number;
  public numcomments: number;
  public numweights: number;
  public owned: number;
  public stddev: number;
  public trading: number;
  public usersrated: number;
  public wanting: number;
  public wishing: number;

  public get ranks(): BggRank[] {
    return this._ranks.filter(({ value })=> !Number.isNaN(value))
  }

  constructor(data: IBggRatings) {
    this.average = Number.parseFloat(data.average._attributes.value || '') ?? -1;
    this.averageweight = Number.parseFloat(data.averageweight._attributes.value || '') ?? -1;
    this.bayesaverage = Number.parseFloat(data.bayesaverage._attributes.value || '') ?? -1;
    this.median = Number.parseFloat(data.median._attributes.value || '') ?? -1;
    this.numcomments = Number.parseInt(data.numcomments._attributes.value || '') ?? -1;
    this.numweights = Number.parseInt(data.numweights._attributes.value || '') ?? -1;
    this.owned = Number.parseInt(data.owned._attributes.value || '') ?? -1;
    this.stddev = Number.parseFloat(data.stddev._attributes.value || '') ?? -1;
    this.trading = Number.parseInt(data.trading._attributes.value || '') ?? -1;
    this.usersrated = Number.parseInt(data.usersrated._attributes.value || '') ?? -1;
    this.wanting = Number.parseInt(data.wanting._attributes.value || '') ?? -1;
    this.wishing = Number.parseInt(data.wishing._attributes.value || '') ?? -1;
    this._ranks = Array.isArray(data.ranks?.rank)
      ? (data.ranks?.rank || []).map((rank) => new BggRank(rank))
      :  [new BggRank(data.ranks?.rank)];
  }
}
