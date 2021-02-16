import { IAttributes } from './attributes.interface';
import { BggGame, IBggGame } from './bgg-game.model';
import { BggAccessory, IBggAccessory } from './bgg-accessory.model';
import { BggExpansion, IBggExpansion } from './bgg-expansion.model';
import { BggThing, BggThingType, IBggThing } from './bgg-thing.type';

export interface IBggThingResponse {
  _declaration: IAttributes<{ version: string, encoding: string }>;
  items: { item: IBggThing | IBggThing[] } & IAttributes<{ termsofuse: string }>
}

export class BggThingResponse {
  public items: (BggThing | undefined)[];

  /**
   * Alias for this.items[0]. Use only if you know there is only one item in response
   */
  public get item(): BggThing | undefined {
    return this.items[0];
  }

  /**
   * Alias for this.item.type
   */
  public get type(): BggThingType | undefined {
    return this.item?.type as BggThingType;
  }

  constructor(data: IBggThingResponse) {
    if (Array.isArray(data.items.item)) {
      this.items = data.items.item.map(item => this.parseItem(item));
    } else {
      this.items = [this.parseItem(data.items.item)];
    }
  }

  private parseItem(item: IBggThing) {
    const type = item._attributes.type as BggThingType;

    switch (type) {
      case BggThingType.boardGame:
        return new BggGame(item as IBggGame);
      case BggThingType.boardGameExpansion:
        return new BggExpansion(item as IBggExpansion);
      case BggThingType.boardGameAccessory:
        return new BggAccessory(item as IBggAccessory);
    }
  }
}
