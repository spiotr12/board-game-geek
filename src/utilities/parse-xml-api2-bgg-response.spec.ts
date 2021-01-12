import axios from 'axios';
import { parseXmlApi2BggResponse } from './parse-xml-api2-bgg-response';
import { BggAccessory, BggExpansion, BggGame, BggResponse } from '@bgg/models';

const getBggUrl = (id: number) => `https://api.geekdo.com/xmlapi2/thing?id=${id}&versions=1`;

describe('parseXmlApi2BggResponse', () => {
  it('board game', async () => {
    // Arrange
    const bggId = 169786; //  Scythe
    const response = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
  });

  it('board game expansion', async () => {
    // Arrange
    const bggId = 223555; // Scythe - The Wind Gambit
    const response = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse?.type).toEqual('boardgameexpansion');
    expect(bggResponse?.item).toBeInstanceOf(BggExpansion);
  });

  it('board game accessory', async () => {
    // Arrange
    const bggId = 238417; // Scythe - Realistic Resource Tokens
    const response = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseXmlApi2BggResponse(response.data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggResponse);
    expect(bggResponse?.type).toEqual('boardgameaccessory');
    expect(bggResponse?.item).toBeInstanceOf(BggAccessory);
  });

  describe.skip('test all', async () => {
    const limit = 5000;

    for (let i = 1; i < limit; i++) {
      const id = i;

      it(`test id ${id}`, async () => {
        // Arrange
        const response = await axios.get(getBggUrl(id));

        try {
          // Act
          const bggResponse = parseXmlApi2BggResponse(response.data);
          console.log(bggResponse);

          // Assert
          if (bggResponse !== null) {
            expect(bggResponse).toBeDefined();
            expect(bggResponse).toBeInstanceOf(BggResponse);
          }
        } catch (e) {
          console.log(e);
          throw e;
        }
      });
    }
  });
});
