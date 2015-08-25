# Atishoo

Augment github issues with some extra stuff.

## Setup

Requires npm and nvm, mongodb

```
nvm install iojs-v2.4.0
npm install -g nodemon
npm i
```

## Develop

```
npm run dev
```

## Test

```
npm test
```

## Prod

TODO

## Endpoints

### GET /api/issues

Returns github issues with augmented data

### PATCH /api/issues/:id

Save extra attributes using github issue id
```
{
  "data": {
    "type": "issues",
    "id": "102616274",
    "attributes": {
      "points": 16,
      "workflow": "in progress"
    }
  }
}
```
