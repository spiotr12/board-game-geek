import { xml2js } from 'xml-js';
import { BggThingResponse, IBggThingResponse } from '../models';

/**
 * Parses the http response body from BGG XML API 2
 *
 * @param response
 */
export const parseBggXmlApi2ThingResponse: (response: string) => BggThingResponse | null = (response: string) => {
  const data = xml2js(response, { compact: true }) as IBggThingResponse;
  if (!data.items.item) {
    return null; // Not found
  }
  return new BggThingResponse(data);
};
