import { IAttributes } from './attributes.interface';
import { IBggCollectionAttributes } from './bgg-collection-attributes.interface';
import { IBggStatus, BggStatus } from './bgg-status.model';

export interface IBggCollectionGame
  extends IAttributes<IBggCollectionAttributes> {
  name: { _text: string };
  status: IBggStatus;
  stats?: { rating: IAttributes<{ value: string }> };
}

/**
 * Parsed collection from bgg xml data
 */
export class BggCollectionGame {
  private _userRating?: string;

  public id: number;
  public type: 'boardgame' | string;
  public name: string;
  public userStatus: BggStatus;

  public get userRating(): number | undefined {
    const parsedRating = Number.parseInt(this._userRating || '');
    return Number.isNaN(parsedRating) ? undefined : parsedRating;
  }

  constructor(data: IBggCollectionGame) {
    this.id = Number.parseInt(data._attributes.objectid);
    this.type = data._attributes.subtype;
    this.name = data.name._text;
    this.userStatus = new BggStatus(data.status);
    this._userRating = data.stats?.rating?._attributes?.value;
  }
}
