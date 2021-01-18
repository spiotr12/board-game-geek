import { xml2js } from 'xml-js';
import { BggResponse, IBggResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */
export const parseBggXmlApi2ThingResponse: (response: string) => BggResponse | null = (response: string) => {
  const data = xml2js(response, { compact: true }) as IBggResponse;
  if (!data.items.item) {
    return null; // Not found
  }
  return new BggResponse(data);
};
