import { IAttributes } from './attributes.interface';

export type IBggLink = IAttributes<{
  type: string;
  id: string;
  value: string;
  inbound?: string;
}>;

export enum BggLinkType {
  boardGameCategory = 'boardgamecategory', // In: game, expansion
  boardGameMechanic = 'boardgamemechanic', // In: game, expansion
  boardGameFamily = 'boardgamefamily', // In: game, expansion
  boardGameExpansion = 'boardgameexpansion', // In: game, expansion
  boardGameImplementation = 'boardgameimplementation', // In: game
  boardGameDesigner = 'boardgamedesigner', // In: game, expansion
  boardGameArtist = 'boardgameartist', // In: game, expansion
  boardGamePublisher = 'boardgamepublisher', // In: game
  boardGameVersion = 'boardgameversion', // In: version, expansion
  language = 'language', // In: version
  boardGameAccessory = 'boardgameaccessory', // In: accessory
}

export class BggLink {
  public id: number;
  public type: BggLinkType;
  public value: string;
  public inbound?: boolean;

  constructor(data: IBggLink) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type as BggLinkType;
    this.value = data._attributes.value;
    this.inbound = data._attributes?.inbound === 'true';
  }
}
