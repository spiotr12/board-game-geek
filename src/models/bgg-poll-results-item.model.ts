import { IAttributes } from './attributes.interface';

export type IBggPollResultsItem = IAttributes<{
  level?: string; // Solo en language_dependecy type Poll
  value: string;
  numvotes: string;
}>;

export class BggPollResultsItem {
  public level?: number; // Level is optional
  public value: string;
  public numVotes: number;

  constructor(data: IBggPollResultsItem) {
    this.level = data._attributes.level
      ? Number.parseInt(data._attributes.level)
      : undefined;
    this.value = data._attributes.value;
    this.numVotes = Number.parseInt(data._attributes.numvotes);
  }
}

// suggested_numplayers || suggested_playerage
// result: [
//   { _attributes: { value: 'Best', numvotes: '0' } },
//   { _attributes: { value: 'Recommended', numvotes: '0' } },
//   { _attributes: { value: 'Not Recommended', numvotes: '19' } }
//   ...
// ]

// language_dependency
// result: [
//   { _attributes: { level: '1', value: 'No necessary in-game text', numvotes: '13' } },
//   { _attributes: { level: '2', value: 'Some necessary text - easily memorized or small crib sheet', numvotes: '0' } },
//   { _attributes: { level: '3', value: 'Moderate in-game text - needs crib sheet or paste ups', numvotes: '0' } },
//    ...
// ]
