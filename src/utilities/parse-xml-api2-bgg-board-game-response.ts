import { xml2js } from 'xml-js';
import { BoardGameResponse, IBoardGameResponse } from '@bgg/models';

export const parseXmlApi2BggBoardGameResponse: any = (response: string) => {
  const data = xml2js(response, { compact: true }) as IBoardGameResponse;
  return new BoardGameResponse(data);
};
