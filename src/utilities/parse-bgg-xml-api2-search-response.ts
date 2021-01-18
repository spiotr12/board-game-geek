import { xml2js } from 'xml-js';
import { BggSearchResponse, IBggSearchResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */
export const parseBggXmlApi2SearchResponse: (response: string) => BggSearchResponse = (response: string) => {
  const data = xml2js(response, { compact: true }) as IBggSearchResponse;
  return new BggSearchResponse(data);
};
