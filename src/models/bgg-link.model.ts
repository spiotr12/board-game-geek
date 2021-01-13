import { IAttributes } from './attributes.interface';

export type IBggLink = IAttributes<{
  type: string;
  id: string;
  value: string;
  inbound?: string;
}>;

export enum BggLinkType {
  boardGameCategory = 'boardgamecategory',
  boardGameMechanic = 'boardgamemechanic',
  boardGameFamily = 'boardgamefamily',
  boardGameExpansion = 'boardgameexpansion',
  boardGameImplementation = 'boardgameimplementation',
  boardGameDesigner = 'boardgamedesigner',
  boardGameArtist = 'boardgameartist',
  boardGamePublisher = 'boardgamepublisher',
  boardGameVersion = 'boardgameversion',
  language = 'language',
}

export class BggLink {
  public id: number;
  public type: BggLinkType | string;
  public value: string;
  public inbound?: boolean;

  constructor(data: IBggLink) {
    this.id = Number.parseInt(data._attributes.id);
    this.type = data._attributes.type;
    this.value = data._attributes.type;
    this.inbound = data._attributes?.inbound === 'true';
  }
}
