import { xml2js } from 'xml-js';
import { BggSearchResponse, IBggSearchResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param responseBody
 */
export const parseBggXmlApi2SearchResponse: (responseBody: string) => BggSearchResponse = (responseBody: string) => {
  const data = xml2js(responseBody, { compact: true }) as IBggSearchResponse;
  return new BggSearchResponse(data);
};
