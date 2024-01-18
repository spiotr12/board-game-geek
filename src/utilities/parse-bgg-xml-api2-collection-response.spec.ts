import axios, { AxiosResponse } from 'axios';
import { parseBggXmlApi2CollectionResponse } from './parse-bgg-xml-api2-collection-response';

const getBggUrl = (username: string) =>
  `https://api.geekdo.com/xmlapi2/collection?username=${username}&brief=1&stats=1`;

const fetchCollection = async (username: string): Promise<AxiosResponse> => {
  const response = await axios.get(getBggUrl(username));

  if (response.status === 202) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return fetchCollection(username);
  }

  return response;
};

describe('parseBggXmlApi2CollectionResponse', () => {
  it('collection', async () => {
    // Arrange
    const username = 'spiotr12';
    const { data } = await fetchCollection(username);

    // Act
    const bggResponse = parseBggXmlApi2CollectionResponse(data);

    // Assert
    expect(bggResponse).toBeDefined();
    expect(bggResponse?.total).toEqual(78);
    expect(bggResponse.items.length).toEqual(78);

    const unratedGame = bggResponse.items.find(({ id }) => id === 169786); //  Scythe

    expect(unratedGame?.userStatus.own).toEqual(false);
    expect(unratedGame?.userStatus.prevowned).toEqual(false);
    expect(unratedGame?.userStatus.fortrade).toEqual(false);
    expect(unratedGame?.userStatus.want).toEqual(false);
    expect(unratedGame?.userStatus.wanttoplay).toEqual(false);
    expect(unratedGame?.userStatus.wanttobuy).toEqual(false);
    expect(unratedGame?.userStatus.wishlist).toEqual(false);
    expect(unratedGame?.userStatus.preordered).toEqual(false);
    expect(
      new Date(unratedGame?.userStatus.lastmodified || 0).getTime()
    ).toEqual(new Date('2017-10-06 04:28:20').getTime());
    expect(unratedGame?.userRating).toEqual(undefined);

    const ratedGame = bggResponse.items.find(({ id }) => id === 199727); //  Scythe: Najeźdzcy z dalekich krain

    expect(ratedGame?.userStatus.own).toEqual(true);
    expect(ratedGame?.userStatus.prevowned).toEqual(false);
    expect(ratedGame?.userStatus.fortrade).toEqual(false);
    expect(ratedGame?.userStatus.want).toEqual(false);
    expect(ratedGame?.userStatus.wanttoplay).toEqual(false);
    expect(ratedGame?.userStatus.wanttobuy).toEqual(false);
    expect(ratedGame?.userStatus.wishlist).toEqual(false);
    expect(ratedGame?.userStatus.preordered).toEqual(false);
    expect(new Date(ratedGame?.userStatus.lastmodified || 0).getTime()).toEqual(
      new Date('2021-04-30 06:35:21').getTime()
    );
    expect(ratedGame?.userRating).toEqual(10);
  }, 60000);
});
