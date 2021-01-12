import { BggVersion, IBggVersion } from './bgg-version.model';
import { BggThing, IBggThing } from './bgg-thing.model';

export interface IBggAccessory extends IBggThing {
  description: { _text: string };
  versions?: { item: IBggVersion[] | IBggVersion }
}

export class BggAccessory extends BggThing {
  public description: string;
  public versions: BggVersion[];

  constructor(data: IBggAccessory) {
    super(data);
    this.description = data.description._text.trim();
    this.versions = data.versions
      ? Array.isArray(data.versions.item)
        ? data.versions.item.map(version => new BggVersion(version))
        : [new BggVersion(data.versions.item)]
      : [];
  }
}
