import { IAttributes } from './attributes.interface';
import { BggGame, IBggGame } from './bgg-game.model';
import { BggAccessory, IBggAccessory } from './bgg-accessory.model';
import { BggExpansion, IBggExpansion } from './bgg-expansion.model';
import { BggThingType } from './bgg-thing.type';

export interface IBggThingResponse {
  _declaration: IAttributes<{ version: string, encoding: string }>;
  items: { item: IBggGame | IBggExpansion | IBggAccessory } & IAttributes<{ termsofuse: string }>
}

export class BggThingResponse {
  public type: BggThingType;
  public item?: BggGame | BggExpansion | BggAccessory;

  constructor(data: IBggThingResponse) {
    this.type = data.items.item._attributes.type as BggThingType;
    if (this.type === BggThingType.boardGame) {
      this.item = new BggGame(data.items.item as IBggGame);
    } else if (this.type === BggThingType.boardGameExpansion) {
      this.item = new BggExpansion(data.items.item as IBggExpansion);
    } else if (this.type === BggThingType.boardGameAccessory) {
      this.item = new BggAccessory(data.items.item as IBggAccessory);
    }
    // TODO: Bgg Expansion
  }
}
