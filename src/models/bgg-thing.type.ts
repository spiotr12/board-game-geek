import { BggGame, IBggGame } from './bgg-game.model';
import { BggExpansion, IBggExpansion } from './bgg-expansion.model';
import { BggAccessory, IBggAccessory } from './bgg-accessory.model';

export type IBggThing = IBggGame | IBggExpansion | IBggAccessory;
export type BggThing = BggGame | BggExpansion | BggAccessory;

/**
 * Bgg Think Type that may come from response (and is supported)
 */
export enum BggThingType {
  boardGame = 'boardgame',
  boardGameExpansion = 'boardgameexpansion',
  boardGameAccessory = 'boardgameaccessory',
}
