import { IAttributes } from './attributes.interface';
import { BggPollResults, IBggPollResults } from './bgg-poll-results.model';

export interface IBggPoll
  extends IAttributes<{ name: string; title: string; totalvotes: string }> {
  results: IBggPollResults[] | IBggPollResults;
}

// Results parsed to a more understandable structure:
// [
//   { option: 'Option A', votes: [['Recomended', 23], ['Best', 12]] }

//    or

//   { option: 'Option B', votes: 23 }
//   ...
// ]
type PollResult = {
  option: string;
  votes: number | [string, number][]; // Array of [Subcategory, numVotes] for complex Polls like suggested_numplayers
};

export class BggPoll {
  public name: string;
  public title: string;
  public totalvotes: number;
  public results: BggPollResults[];

  constructor(data: IBggPoll) {
    this.name = data._attributes.name;
    this.title = data._attributes.title;
    this.totalvotes = Number.parseInt(data._attributes.totalvotes);
    this.results = (
      Array.isArray(data.results) ? data.results : [data.results]
    ).map((result) => new BggPollResults(result));
  }

  get resultsParsed(): PollResult[] {
    // suggested_numplayers type Poll
    if (this.results.length > 1) {
      return this.results.map(({ numPlayers, resultItems }) => ({
        option: numPlayers?.toString() ?? 'Option not found',
        votes: resultItems.map(({ value, numVotes }) => [value, numVotes]),
      }));
    }

    // other type Poll
    return this.results[0].resultItems.map(({ level, value, numVotes }) => ({
      option: `${value}${level === undefined ? '' : ` [${level}]`}`,
      votes: numVotes,
    }));
  }
}
