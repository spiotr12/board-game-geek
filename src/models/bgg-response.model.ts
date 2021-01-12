import { IAttributes } from './attributes.interface';
import { BggGame, IBggGame } from './bgg-game.model';
import { BggAccessory } from './bgg-accessory.model';
import { BggExpansion } from './bgg-expansion.model';

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
  items: { item: IBggGame } & IAttributes<{ termsofuse: string }>
}

export class BggResponse {
  public type: BggThingType;
  public item?: BggGame | BggExpansion | BggAccessory;

  constructor(data: IBggResponse) {
    this.type = data.items.item._attributes.type as BggThingType;
    if (this.type === BggThingType.boardGame) {
      this.item = new BggGame(data.items.item);
    } else if (this.type === BggThingType.boardGameExpansion) {
      this.item = new BggExpansion(data.items.item);
    } else if (this.type === BggThingType.boardGameAccessory) {
      this.item = new BggAccessory(data.items.item);
    }
    // TODO: Bgg Expansion
  }
}
