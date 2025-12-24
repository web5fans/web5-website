---
title: Working with Schemas
description: Structure your data with JSON schemas
---

Schemas define the structure and validation rules for your data in Web5 applications. They ensure consistency and interoperability across different apps.

## Why Use Schemas?

- **Data Validation**: Ensure data meets expected formats
- **Interoperability**: Different apps can understand the same data
- **Documentation**: Self-documenting data structures
- **Type Safety**: Enable better tooling and type checking

## Creating a Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "content": {
      "type": "string"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["title", "content", "createdAt"]
}
```

## Using Schemas in Records

```javascript
const { record } = await web5.dwn.records.create({
  data: {
    title: 'My Blog Post',
    content: 'Hello World!',
    tags: ['web5', 'decentralization'],
    createdAt: new Date().toISOString()
  },
  message: {
    schema: 'https://myapp.com/schemas/blog-post',
    dataFormat: 'application/json'
  }
});
```

## Common Schema Patterns

### User Profile

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "bio": { "type": "string" },
    "avatar": { "type": "string", "format": "uri" },
    "website": { "type": "string", "format": "uri" }
  }
}
```

### Social Post

```json
{
  "type": "object",
  "properties": {
    "content": { "type": "string", "maxLength": 500 },
    "media": {
      "type": "array",
      "items": { "type": "string", "format": "uri" }
    },
    "timestamp": { "type": "string", "format": "date-time" }
  }
}
```

## Next Steps

- [Protocol Development](/docs/guides/protocols)
- [API Reference](/docs/reference/api-overview)
