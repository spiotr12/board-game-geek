import { IAttributes } from './attributes.interface';
import { BggCollectionGame, IBggCollectionGame } from './bgg-collection.model';

export interface IBggCollectionResponse {
  _declaration: IAttributes<{ version: string; encoding: string }>;
  items: { item: IBggCollectionGame[] } & IAttributes<{
    totalitems: string;
    termsofuse: string;
  }>;
}

export class BggCollectionResponse {
  public items: BggCollectionGame[];
  public total: number;

  constructor(data: IBggCollectionResponse) {
    this.total = Number.parseInt(data.items._attributes.totalitems);
    const items = data.items.item
      ? Array.isArray(data.items.item)
        ? data.items.item
        : [data.items.item]
      : [];

    this.items = items.map((item) => new BggCollectionGame(item));
  }
}
