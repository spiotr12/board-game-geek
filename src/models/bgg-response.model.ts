import { IAttributes } from './attributes.interface';
import { BggItem, IBggItem } from './bgg-item.model';
import { BggThing } from '@bgg/models/bgg-thing.model';
import { BggAccessory } from '@bgg/models/bgg-accessory.model';

/**
 * Bgg Think Type that may come from response (and is supported)
 */
export enum BggThingType {
  boardGame = 'boardgame',
  boardGameExpansion = 'boardgameexpansion',
  boardGameAccessory = 'boardgameaccessory',
}

export interface IBggResponse {
  _declaration: IAttributes<{ version: string, encoding: string }>;
  items: { item: IBggItem } & IAttributes<{ termsofuse: string }>
}

export class BggResponse {
  public type: BggThingType;
  public item?: BggThing;

  constructor(data: IBggResponse) {
    this.type = data.items.item._attributes.type as BggThingType;
    if (this.type === BggThingType.boardGame) {
      this.item = new BggItem(data.items.item);
    } else if (this.type === BggThingType.boardGameAccessory) {
      this.item = new BggAccessory(data.items.item);
    }
    // TODO: Bgg Expansion
  }
}
