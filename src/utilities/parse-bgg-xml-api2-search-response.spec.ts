import axios from 'axios';
import { parseBggXmlApi2SearchResponse } from './parse-bgg-xml-api2-search-response';
import { BggThingType } from '@bgg/models';

const searchBggUrl = (query: string) => `https://api.geekdo.com/xmlapi2/search?query=${query}`;

describe('parseBggXmlApi2SearchResponse', () => {
  describe('search', () => {
    it('should work', async () => {
      // Arrange
      const response = await axios.get(searchBggUrl('scythe'));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(response.data);

      // Assert
      expect(bggResponse).toBeDefined();
      expect(bggResponse.total).toEqual(66);
      expect(bggResponse.items.length).toEqual(66);
    });

    it('should get by string', async () => {
      // Arrange
      const response = await axios.get(searchBggUrl('igrajac+z+wiatrem'));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(response.data);

      // Assert
      expect(bggResponse).toBeDefined();
    });

    it('should get by string and type', async () => {
      // Arrange
      const response = await axios.get(searchBggUrl(`igrajac+z+wiatrem&type=${BggThingType.boardGameExpansion}`));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(response.data);

      // Assert
      expect(bggResponse).toBeDefined();
    });

    it('should get by string exactly one', async () => {
      // Arrange
      const response = await axios.get(searchBggUrl(`igrajac+z+wiatrem&exact=1`));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(response.data);

      // Assert
      expect(bggResponse).toBeDefined();
    });
  });
});
