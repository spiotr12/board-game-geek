import { IAttributes } from './attributes.interface';
import {
  BggPollResultsItem,
  IBggPollResultsItem,
} from './bgg-poll-results-item.model';

export interface IBggPollResults extends IAttributes<{ numplayers?: string }> {
  result: IBggPollResultsItem[];
}

export class BggPollResults {
  public numPlayers?: string; // Only on suggested_players
  public resultItems: BggPollResultsItem[];

  constructor(data: IBggPollResults) {
    this.numPlayers = data._attributes?.numplayers;
    this.resultItems = data.result.map(
      (resultItem) => new BggPollResultsItem(resultItem)
    );
  }
}

// TYPES of POLLS

// suggested_numplaters PollResults:
// results: [
//   {
//     _attributes: { numplayers: '1' },
//     result: BggResultItem[
//       { _attributes: { value: 'Best', numvotes: '0' } },
//       { _attributes: { value: 'Recommended', numvotes: '0' } },
//       { _attributes: { value: 'Not Recommended', numvotes: '19' } }
//   ]
// }

// suggested_playerage PollResults:
// results: [
//   {
//     _attributes: { EMPTY },
//     result: BggResultItem[
//       { _attributes: { value: '2', numvotes: '0' } },
//       { _attributes: { value: '3', numvotes: '0' } },
//       { _attributes: { value: '4', numvotes: '19' } }
//        ...
//   ]
// }

// language_dependence PollResults:
// results: [
//   {
//     _attributes: { EMPTY },
//     result: BggResultItem[
//       { _attributes: { level: '1', value: 'No necessary in-game text', numvotes: '13' } },
//       { _attributes: { level: '2', value: 'Some necessary text - easily memorized or small crib sheet', numvotes: '0' } },
//       { _attributes: { level: '3', value: 'Moderate in-game text - needs crib sheet or paste ups', numvotes: '0' } },
//        ...
//   ]
// }
