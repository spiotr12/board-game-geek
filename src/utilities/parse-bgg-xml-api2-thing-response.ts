import { xml2js } from 'xml-js';
import { BggThingResponse, IBggThingResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param responseBody
 */
export const parseBggXmlApi2ThingResponse: (responseBody: string) => BggThingResponse | null = (responseBody: string) => {
  const data = xml2js(responseBody, { compact: true }) as IBggThingResponse;
  if (!data.items.item) {
    return null; // Not found
  }
  return new BggThingResponse(data);
};
