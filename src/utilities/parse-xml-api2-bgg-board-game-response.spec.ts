import axios from 'axios';
import { parseXmlApi2BggBoardGameResponse } from './parse-xml-api2-bgg-board-game-response';

describe('parseXmlApi2BggBoardGameResponse', () => {
  it('sandbox', async () => {
    // Arrange
    const bggId = 169786;
    const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${bggId}&versions=1`);

    // Act
    const parsedResponse = parseXmlApi2BggBoardGameResponse(response.data);

    // Assert
    expect(parsedResponse).toBeDefined();
  });
});
