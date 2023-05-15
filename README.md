# Board Game Geek JS API

This package is a wrapper for BGG XML API 2 with typed interfaces and classes. Interfaces are direct
mapping to response parsed by xml-js package. Classes are mapped and simplified interfaces.

## Usage

### Thing

```typescript
const { data } = await axios.get('https://api.geekdo.com/xmlapi2/thing?id=169786&versions=1');
const bggResponse = parseBggXmlApi2ThingResponse(data);
const thing = bggResponse.item;
```

### Thing with ranking and rating stats

```typescript
const { data } = await axios.get('https://api.geekdo.com/xmlapi2/thing?id=169786&versions=1&stats=1');
const bggResponse = parseBggXmlApi2ThingResponse(data);
const thing = bggResponse.item;
```

You can also get multiple things

```typescript
const { data } = await axios.get('https://api.geekdo.com/xmlapi2/thing?id=170416,169786&versions=1');
const bggResponse = parseBggXmlApi2ThingResponse(data);
const thing1 = bggResponse.items[0];
const thing2 = bggResponse.items[1];
```

### Search

```typescript
const { data } = await axios.get('https://api.geekdo.com/xmlapi2/search?query=scythe');
const bggResponse = parseBggXmlApi2SearchResponse(data);
const search = bggResponse.items;
```

The `thing` can be of 3 different types: `BggGame`, `BggExpansion`, `BggAccessory`.

## Examples

### Get Thing using simple Fetch API

```typescript
const response = await fetch('https://api.geekdo.com/xmlapi2/thing?id=169786&versions=1');
const data = await response2.text();
const bggResponse = parseBggXmlApi2ThingResponse(data);
const thing = bggResponse.item;
```

### Bulk fetching

This code snippet takes a list of game names and returns list of parsed Things.

```typescript
const bulkFetchingExample = async () => {
  const gameNames = ['Scythe', 'Brass: Birmingham', 'Gloomhaven', '-non-existing-game-'];
  const results = [];
  const errors = [];

  for (const gameName of gameNames) {
    try {
      // Get Search result
      const searchResponse = await axios.get(`https://api.geekdo.com/xmlapi2/search?query=${gameName}`);
      const searchBggResponse = parseBggXmlApi2SearchResponse(searchResponse.data);
      const searchResult = searchBggResponse?.items;

      if (!searchResult.length) {
        throw new Error('No results found.');
      }

      const bggThingId = searchResult[0].id;

      // Get Thing result (using `id` from previously fetched Search result)
      const thingResponse = await axios.get(
        `https://api.geekdo.com/xmlapi2/thing?id=${bggThingId}&versions=1`,
      );
      const thingBggResponse = parseBggXmlApi2ThingResponse(thingResponse.data);
      const bggThing = thingBggResponse?.item;

      results.push(bggThing);

      // Slow iteration because of API request limit
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(error, gameName);
      errors.push({ gameName, error: `${error}` });
    }
  }

  return { results, errors };
};

```

## Donate / Support

If you like my work, feel free to support it. Donations to the project are always welcome :)

PayPal: [`PayPal.Me/piotrstarzec`](https://paypal.me/piotrstarzec)
