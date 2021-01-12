import axios from 'axios';
import { parseXmlApi2BggResponse } from './parse-xml-api2-bgg-response';
import { BggAccessory, BggItem, BggResponse } from '@bgg/models';

describe('parseXmlApi2BggResponse', () => {
  it('board game', async () => {
    // Arrange
    const bggId = 169786; //  Scythe
    const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${bggId}&versions=1`);

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggItem);
  });

  it('board game expansion', async () => {
    // Arrange
    const bggId = 223555; // Scythe - The Wind Gambit
    const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${bggId}&versions=1`);

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse?.type).toEqual('boardgameexpansion');
  });

  it('board game accessory', async () => {
    // Arrange
    const bggId = 238417; // Scythe - Realistic Resource Tokens
    const response = await axios.get(`https://api.geekdo.com/xmlapi2/thing?id=${bggId}&versions=1`);

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggResponse);
    expect(bggResponse?.type).toEqual('boardgameaccessory');
    expect(bggResponse?.item).toBeInstanceOf(BggAccessory);
  });
});
