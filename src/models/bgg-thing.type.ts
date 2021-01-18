import { BggGame } from './bgg-game.model';
import { BggExpansion } from './bgg-expansion.model';
import { BggAccessory } from './bgg-accessory.model';

export type BggThing = BggGame | BggExpansion | BggAccessory;

/**
 * Bgg Think Type that may come from response (and is supported)
 */
export enum BggThingType {
  boardGame = 'boardgame',
  boardGameExpansion = 'boardgameexpansion',
  boardGameAccessory = 'boardgameaccessory',
}
