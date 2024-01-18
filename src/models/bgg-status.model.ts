import { IAttributes } from './attributes.interface';

export type IBggStatus = IAttributes<{
  own: string;
  prevowned: string;
  fortrade: string;
  want: string;
  wanttoplay: string;
  wanttobuy: string;
  wishlist: string;
  preordered: string;
  lastmodified: string;
}>;

export class BggStatus {
  public own: boolean;
  public prevowned: boolean;
  public fortrade: boolean;
  public want: boolean;
  public wanttoplay: boolean;
  public wanttobuy: boolean;
  public wishlist: boolean;
  public preordered: boolean;
  public lastmodified: Date;

  constructor(data: IBggStatus) {
    const {
      _attributes: {
        own,
        prevowned,
        fortrade,
        want,
        wanttoplay,
        wanttobuy,
        wishlist,
        preordered,
        lastmodified,
      },
    } = data;

    this.own = own === '1';
    this.prevowned = prevowned === '1';
    this.fortrade = fortrade === '1';
    this.want = want === '1';
    this.wanttoplay = wanttoplay === '1';
    this.wanttobuy = wanttobuy === '1';
    this.wishlist = wishlist === '1';
    this.preordered = preordered === '1';
    this.lastmodified = new Date(lastmodified);
  }
}
