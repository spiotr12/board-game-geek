import { IAttributes } from './attributes.interface';

export type IBggRank = IAttributes<{
  bayesaverage: string;
  friendlyname: string;
  id: string;
  name: string;
  type: string;
  value: string;
}>

export class BggRank {
  public bayesaverage: number;
  public friendlyname: string;
  public id: number;
  public name: string;
  public type: string;
  public value: number;

  constructor(data: IBggRank) {
    const { _attributes: { bayesaverage, friendlyname, id, name, type, value } } = data;

    this.bayesaverage = Number.parseFloat(bayesaverage);
    this.friendlyname =friendlyname;
    this.id = Number.parseInt(id);
    this.name = name;
    this.type = type;
    this.value = Number.parseInt(value);
  }
}
