import { BggGame } from "@bgg/models/bgg-game.model";
import { BggExpansion } from './bgg-expansion.model';
import { BggAccessory } from './bgg-accessory.model';

export type BggThing = BggGame | BggExpansion | BggAccessory;
