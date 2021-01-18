# Board Game Geek JS API

This package is a wrapper for BGG XML API 2 with typed interfaces and classes. Interfaces are direct
mapping to response parsed by xml-js package. Classes are mapped and simplified interfaces.

## Usage

Thing

```typescript
const response = await axios.get('https://api.geekdo.com/xmlapi2/thing?id=169786&versions=1');
const bggResponse = parseBggXmlApi2ThingResponse(response);
const thing = bggResponse.item;
```

Search

```typescript
const response = await axios.get('https://api.geekdo.com/xmlapi2/search?query=scythe');
const bggResponse = parseBggXmlApi2SearchResponse(response);
const search = bggResponse.items;
```

The `thing` can be of 3 different types: `BggGame`, `BggExpansion`, `BggAccessory`.
