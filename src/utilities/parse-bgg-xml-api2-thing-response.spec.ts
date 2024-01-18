import axios from 'axios';
import { parseBggXmlApi2ThingResponse } from './parse-bgg-xml-api2-thing-response';
import {
  BggAccessory,
  BggExpansion,
  BggGame,
  BggThingResponse,
} from '@bgg/models';

const getBggUrl = (id: number | string, query = '') =>
  `https://api.geekdo.com/xmlapi2/thing?id=${id}&versions=1${query}`;

describe('parseBggXmlApi2ThingResponse', () => {
  it.skip('sandbox', async () => {
    // Arrange
    const bggId = '170416,169786';
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
  });

  it('multiple things', async () => {
    // Arrange
    const bggId = '170416,234757';
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.items[0].type).toEqual('boardgame');
    expect(bggResponse?.items[0]).toBeInstanceOf(BggGame);
    expect(bggResponse?.items[1].type).toEqual('boardgameexpansion');
    expect(bggResponse?.items[1]).toBeInstanceOf(BggExpansion);
  });

  it('board game', async () => {
    // Arrange
    const bggId = 169786; //  Scythe
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
    // Test BggGame Model
    const game = bggResponse?.item as BggGame;
    expect(game?.id).toEqual(bggId);
    expect(game?.type).toEqual('boardgame');
    expect(game?.thumbnail).not.toBeUndefined();
    expect(game?.image).not.toBeUndefined();
    expect(game?.links).not.toBeUndefined();
    expect(game?.links.length).toBeGreaterThan(0);
    expect(game?.names).not.toBeUndefined();
    expect(game?.names.length).toBeGreaterThan(0);
    expect(game?.yearpublished).not.toBeUndefined();
    expect(game?.description).not.toBeUndefined();
    expect(game?.minplayers).not.toBeUndefined();
    expect(game?.maxplayers).not.toBeUndefined();
    expect(game?.minage).not.toBeUndefined();
    expect(game?.versions).not.toBeUndefined();
    expect(game?.versions.length).toBeGreaterThan(0);
    expect(game?.ratings).toBeUndefined();
    // Test BggGame Model getters
    expect(game?.namesValues).not.toBeUndefined();
    expect(game?.namesValues.length).toBeGreaterThan(0);
    expect(game?.primaryName).not.toBeUndefined();
    expect(game?.categories).not.toBeUndefined();
    expect(game?.categories.length).toBeGreaterThan(0);
    expect(game?.mechanics).not.toBeUndefined();
    expect(game?.mechanics.length).toBeGreaterThan(0);
    expect(game?.families).not.toBeUndefined();
    expect(game?.families.length).toBeGreaterThan(0);
    expect(game?.expansions).not.toBeUndefined();
    expect(game?.expansions.length).toBeGreaterThan(0);
    expect(game?.implementations).not.toBeUndefined();
    expect(game?.implementations.length).toBeGreaterThan(0);
    expect(game?.designers).not.toBeUndefined();
    expect(game?.designers.length).toBeGreaterThan(0);
    expect(game?.artists).not.toBeUndefined();
    expect(game?.artists.length).toBeGreaterThan(0);
    expect(game?.publishers).not.toBeUndefined();
    expect(game?.publishers.length).toBeGreaterThan(0);
    // Test BggVersion Model
    const version = game?.versions[0];
    expect(version).not.toBeUndefined();
    expect(version?.id).not.toBeUndefined();
    expect(version?.type).toEqual('boardgameversion');
    expect(version?.thumbnail).not.toBeUndefined();
    expect(version?.image).not.toBeUndefined();
    expect(version?.links).not.toBeUndefined();
    expect(version?.links.length).toBeGreaterThan(0);
    expect(version?.names).not.toBeUndefined();
    expect(version?.names.length).toBeGreaterThan(0);
    expect(version?.yearpublished).not.toBeUndefined();
    expect(version?.productcode).not.toBeUndefined();
    expect(version?.width).not.toBeUndefined();
    expect(version?.length).not.toBeUndefined();
    expect(version?.depth).not.toBeUndefined();
    expect(version?.weight).not.toBeUndefined();
    // Test BggVersion Model getters
    expect(version?.namesValues).not.toBeUndefined();
    expect(version?.namesValues.length).toBeGreaterThan(0);
    expect(version?.primaryName).not.toBeUndefined();
    expect(version?.versionFor).not.toBeUndefined();
    expect(version?.artists).not.toBeUndefined();
    expect(version?.artists.length).toBeGreaterThan(0);
    expect(version?.publishers).not.toBeUndefined();
    expect(version?.publishers.length).toBeGreaterThan(0);
    expect(version?.languages).not.toBeUndefined();
    expect(version?.languages.length).toBeGreaterThan(0);
  });

  it('board game with non-standard thumbnail', async () => {
    // Arrange
    const bggId = 68448; // 7 Wonders
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
    // Test BggGame Model
    const game = bggResponse?.item as BggGame;
    expect(game?.thumbnail).not.toBeUndefined();
  });

  it('unreleased board game without versions', async () => {
    // Arrange
    const bggId = 38034; // A Song of Ice and Fire: The Adventure Game
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
    // Test BggGame Model
    const game = bggResponse?.item as BggGame;
    expect(game?.versions).not.toBeUndefined();
  });

  it('board game stats', async () => {
    // Arrange
    const bggId = 68448; // 7 Wonders
    const { data } = await axios.get(getBggUrl(bggId, '&stats=1'));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgame');
    expect(bggResponse?.item).toBeInstanceOf(BggGame);
    // Test BggGame Model
    const game = bggResponse?.item as BggGame;
    expect(game?.ratings?.average).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.averageweight).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.bayesaverage).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.median).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.numcomments).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.numweights).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.owned).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.stddev).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.trading).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.usersrated).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.wanting).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.wishing).toBeGreaterThanOrEqual(-1);
    expect(game?.ratings?.ranks.length).toBeGreaterThan(0);

    const rank = game?.ratings?.ranks[0];
    expect(rank?.bayesaverage).toBeGreaterThanOrEqual(0);
    expect(rank?.friendlyname).not.toBeUndefined();
    expect(rank?.id).not.toBeUndefined();
    expect(rank?.name).not.toBeUndefined();
    expect(rank?.type).not.toBeUndefined();
    expect(rank?.value).toBeGreaterThanOrEqual(0);
  });

  it('board game expansion', async () => {
    // Arrange
    const bggId = 223555; // Scythe - The Wind Gambit
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse?.type).toEqual('boardgameexpansion');
    expect(bggResponse?.item).toBeInstanceOf(BggExpansion);
    // Test BggExpansion Model
    const expansion = bggResponse?.item as BggExpansion;
    expect(expansion?.id).toEqual(bggId);
    expect(expansion?.type).toEqual('boardgameexpansion');
    expect(expansion?.thumbnail).not.toBeUndefined();
    expect(expansion?.image).not.toBeUndefined();
    expect(expansion?.links).not.toBeUndefined();
    expect(expansion?.links.length).toBeGreaterThan(0);
    expect(expansion?.names).not.toBeUndefined();
    expect(expansion?.names.length).toBeGreaterThan(0);
    expect(expansion?.yearpublished).not.toBeUndefined();
    expect(expansion?.description).not.toBeUndefined();
    expect(expansion?.minplayers).not.toBeUndefined();
    expect(expansion?.maxplayers).not.toBeUndefined();
    expect(expansion?.minage).not.toBeUndefined();
    expect(expansion?.versions).not.toBeUndefined();
    expect(expansion?.versions.length).toBeGreaterThan(0);
    // Test BggExpansion Model getters
    expect(expansion?.namesValues).not.toBeUndefined();
    expect(expansion?.namesValues.length).toBeGreaterThan(0);
    expect(expansion?.primaryName).not.toBeUndefined();
    expect(expansion?.expansionFor).not.toBeUndefined();
    expect(expansion?.expansionFor.length).toBeGreaterThan(0);
    expect(expansion?.categories).not.toBeUndefined();
    expect(expansion?.categories.length).toBeGreaterThan(0);
    expect(expansion?.mechanics).not.toBeUndefined();
    expect(expansion?.mechanics.length).toBeGreaterThan(0);
    expect(expansion?.families).not.toBeUndefined();
    expect(expansion?.families.length).toBeGreaterThan(0);
    expect(expansion?.expansions).not.toBeUndefined();
    expect(expansion?.expansions.length).toBeGreaterThan(0);
    expect(expansion?.designers).not.toBeUndefined();
    expect(expansion?.designers.length).toBeGreaterThan(0);
    expect(expansion?.artists).not.toBeUndefined();
    expect(expansion?.artists.length).toBeGreaterThan(0);
    expect(expansion?.publishers).not.toBeUndefined();
    expect(expansion?.publishers.length).toBeGreaterThan(0);
    // Test BggVersion Model
    const version = expansion?.versions[0];
    expect(version).not.toBeUndefined();
    expect(version?.id).not.toBeUndefined();
    expect(version?.type).toEqual('boardgameversion');
    expect(version?.thumbnail).not.toBeUndefined();
    expect(version?.image).not.toBeUndefined();
    expect(version?.links).not.toBeUndefined();
    expect(version?.links.length).toBeGreaterThan(0);
    expect(version?.names).not.toBeUndefined();
    expect(version?.names.length).toBeGreaterThan(0);
    expect(version?.yearpublished).not.toBeUndefined();
    expect(version?.productcode).not.toBeUndefined();
    expect(version?.width).not.toBeUndefined();
    expect(version?.length).not.toBeUndefined();
    expect(version?.depth).not.toBeUndefined();
    expect(version?.weight).not.toBeUndefined();
    // Test BggVersion Model getters
    expect(version?.namesValues).not.toBeUndefined();
    expect(version?.namesValues.length).toBeGreaterThan(0);
    expect(version?.primaryName).not.toBeUndefined();
    expect(version?.versionFor).not.toBeUndefined();
    expect(version?.artists).not.toBeUndefined();
    expect(version?.artists.length).toBeGreaterThan(0);
    expect(version?.publishers).not.toBeUndefined();
    expect(version?.publishers.length).toBeGreaterThan(0);
    expect(version?.languages).not.toBeUndefined();
    expect(version?.languages.length).toBeGreaterThan(0);
  });

  it('board game accessory', async () => {
    // Arrange
    const bggId = 238417; // Scythe - Realistic Resource Tokens
    const { data } = await axios.get(getBggUrl(bggId));

    // Act
    const bggResponse = parseBggXmlApi2ThingResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse).toBeInstanceOf(BggThingResponse);
    expect(bggResponse?.type).toEqual('boardgameaccessory');
    expect(bggResponse?.item).toBeInstanceOf(BggAccessory);
    // Test BggAccessory Model
    const accessory = bggResponse?.item as BggAccessory;
    expect(accessory?.id).toEqual(bggId);
    expect(accessory?.type).toEqual('boardgameaccessory');
    expect(accessory?.thumbnail).not.toBeUndefined();
    expect(accessory?.image).not.toBeUndefined();
    expect(accessory?.links).not.toBeUndefined();
    expect(accessory?.links.length).toBeGreaterThan(0);
    expect(accessory?.names).not.toBeUndefined();
    expect(accessory?.names.length).toBeGreaterThan(0);
    expect(accessory?.yearpublished).not.toBeUndefined();
    expect(accessory?.description).not.toBeUndefined();
    expect(accessory?.versions).not.toBeUndefined();
    expect(accessory?.versions.length).toBeGreaterThan(0);
    // Test BggAccessory Model getters
    expect(accessory?.namesValues).not.toBeUndefined();
    expect(accessory?.namesValues.length).toBeGreaterThan(0);
    expect(accessory?.primaryName).not.toBeUndefined();
    expect(accessory?.accessoryFor).not.toBeUndefined();
    expect(accessory?.publishers).not.toBeUndefined();
    expect(accessory?.publishers.length).toBeGreaterThan(0);
    // Test BggVersion Model
    const version = accessory?.versions[0];
    expect(version).not.toBeUndefined();
    expect(version?.id).not.toBeUndefined();
    expect(version?.type).toEqual('bgaccessoryversion');
    expect(version?.thumbnail).not.toBeUndefined();
    expect(version?.image).not.toBeUndefined();
    expect(version?.links).not.toBeUndefined();
    expect(version?.names).not.toBeUndefined();
  });

  // describe.skip('test all', async () => {
  //   const limit = 5000;
  //
  //   for (let i = 1; i < limit; i++) {
  //     const id = i;
  //
  //     it(`test id ${id}`, async () => {
  //       // Arrange
  //       const { data }  = await axios.get(getBggUrl(id));
  //
  //       try {
  //         // Act
  //         const bggResponse = parseBggXmlApi2ThingResponse(data);
  //         console.log(bggResponse);
  //
  //         // Assert
  //         if (bggResponse !== null) {
  //           expect(bggResponse).toBeDefined();
  //           expect(bggResponse).toBeInstanceOf(BggThingResponse);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //         throw e;
  //       }
  //     });
  //   }
  // });
});
