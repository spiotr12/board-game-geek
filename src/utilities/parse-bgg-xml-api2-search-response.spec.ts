import axios from 'axios';
import { parseBggXmlApi2SearchResponse } from './parse-bgg-xml-api2-search-response';
import { BggThingType } from '@bgg/models';

const searchBggUrl = (query: string) =>
  `https://api.geekdo.com/xmlapi2/search?query=${query}`;

describe('parseBggXmlApi2SearchResponse', () => {
  describe('search', () => {
    it('should work', async () => {
      // Arrange
      const { data } = await axios.get(searchBggUrl('scythe'));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(data);

      // Assert
      expect(bggResponse).toBeDefined();

      // BGG is updating with time, today 22 Oct 2023 there are 74 items for 'scythe' xd
      expect(bggResponse.total).toBeGreaterThanOrEqual(72);
      expect(bggResponse.items.length).toBeGreaterThanOrEqual(72);
    });

    it('should get by string', async () => {
      // Arrange
      const { data } = await axios.get(searchBggUrl('igrajac+z+wiatrem'));

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(data);

      // Assert
      expect(bggResponse).toBeDefined();
    });

    it('should get by string and type', async () => {
      // Arrange
      const { data } = await axios.get(
        searchBggUrl(
          `igrajac+z+wiatrem&type=${BggThingType.boardGameExpansion}`
        )
      );

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(data);

      // Assert
      expect(bggResponse).toBeDefined();
    });

    it('should get by string exactly one', async () => {
      // Arrange
      const { data } = await axios.get(
        searchBggUrl(`igrajac+z+wiatrem&exact=1`)
      );

      // Act
      const bggResponse = parseBggXmlApi2SearchResponse(data);

      // Assert
      expect(bggResponse).toBeDefined();
    });
  });
});
