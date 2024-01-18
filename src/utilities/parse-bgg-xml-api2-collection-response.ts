import { xml2js } from 'xml-js';
import { BggCollectionResponse, IBggCollectionResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param responseBody
 */
export const parseBggXmlApi2CollectionResponse: (
  responseBody: string
) => BggCollectionResponse = (responseBody: string) => {
  const data = xml2js(responseBody, {
    compact: true,
  }) as IBggCollectionResponse;
  return new BggCollectionResponse(data);
};
