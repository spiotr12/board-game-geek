import { IAttributes } from './attributes.interface';
import { BggItem, IBggItem } from './bgg-item.model';

export interface IBoardGameResponse {
  _declaration: IAttributes<{ version: string, encoding: string }>;
  items: { item: IBggItem } & IAttributes<{ termsofuse: string }>
}

export class BoardGameResponse {
  public item: BggItem;

  constructor(data: IBoardGameResponse) {
    this.item = new BggItem(data.items.item);
  }
}
