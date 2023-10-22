import { IAttributes } from './attributes.interface';
import { BggCollectionItem, IBggCollectionItem } from './bgg-collection.model';

export interface IBggCollectionResponse {
  _declaration: IAttributes<{
    version: string;
    encoding: string;
  }>;
  items: {
    item: IBggCollectionItem[];
  } & IAttributes<{
    totalitems: string;
    termsofuse: string;
    pubdate: string;
  }>;
}
export class BggCollectionResponse {
  items: BggCollectionItem[];
  totalitems: number;

  constructor(data: IBggCollectionResponse) {
    if (Array.isArray(data.items.item)) {
      this.items = data.items.item.map((item) => new BggCollectionItem(item));
    } else {
      this.items = [new BggCollectionItem(data.items.item)];
    }
    this.totalitems = parseInt(data.items._attributes.totalitems);
  }
}
