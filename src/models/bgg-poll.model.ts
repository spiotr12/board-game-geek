import { IAttributes } from './attributes.interface';

export interface IBggPoll extends IAttributes<{ name: string; title: string; totalvotes: string }> {
  results: any[];
}

export class BggPoll {
  public name: string;
  public title: string;
  public totalvotes: number;
  public results: any[] | any; // TODO: Not implemented

  constructor(data: IBggPoll) {
    this.name = data._attributes.name;
    this.title = data._attributes.title;
    this.totalvotes = Number.parseInt(data._attributes.totalvotes);
    this.results = data.results;
  }
}
