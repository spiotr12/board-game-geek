import { IAttributes } from './attributes.interface';
import { BggSearch, IBggSearch } from './bgg-search.model';

export interface IBggSearchResponse {
  _declaration: IAttributes<{ version: string, encoding: string }>;
  items: { item: IBggSearch[] } & IAttributes<{ total: string; termsofuse: string }>
}

export class BggSearchResponse {
  public items: BggSearch[];
  public total: number;

  constructor(data: IBggSearchResponse) {
    this.total = Number.parseInt(data.items._attributes.total);
    const items = data.items.item
      ? Array.isArray(data.items.item)
        ? data.items.item
        : [data.items.item]
      : [];

    this.items = items.map(item => new BggSearch(item));
  }
}
