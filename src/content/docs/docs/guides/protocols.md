---
title: Protocol Development
description: Build custom protocols for your Web5 applications
---

Protocols define how applications interact with user data in Web5. They specify data structures, access controls, and relationships between different record types.

## What is a Protocol?

A protocol is like a contract that defines:
- What types of data can be stored
- Who can read/write that data
- How different data types relate to each other
- Data format requirements

## Basic Protocol Structure

```javascript
const protocol = {
  protocol: 'https://myapp.com/protocol',
  published: true,
  types: {
    post: {
      schema: 'https://myapp.com/schemas/post',
      dataFormats: ['application/json']
    }
  },
  structure: {
    post: {
      $actions: [
        { who: 'anyone', can: 'read' },
        { who: 'author', can: 'write' }
      ]
    }
  }
};
```

## Installing a Protocol

```javascript
await web5.dwn.protocols.configure({
  message: {
    definition: protocol
  }
});
```

## Advanced Example: Social Network

```javascript
const socialProtocol = {
  protocol: 'https://social.example.com/protocol',
  published: true,
  types: {
    post: {
      schema: 'https://social.example.com/schemas/post',
      dataFormats: ['application/json']
    },
    comment: {
      schema: 'https://social.example.com/schemas/comment',
      dataFormats: ['application/json']
    },
    like: {
      schema: 'https://social.example.com/schemas/like',
      dataFormats: ['application/json']
    }
  },
  structure: {
    post: {
      $actions: [
        { who: 'anyone', can: 'read' },
        { who: 'author', can: 'write' }
      ],
      comment: {
        $actions: [
          { who: 'anyone', can: 'write' },
          { who: 'anyone', can: 'read' }
        ]
      },
      like: {
        $actions: [
          { who: 'anyone', can: 'write' },
          { who: 'anyone', can: 'read' }
        ]
      }
    }
  }
};
```

## Writing with Protocols

```javascript
// Create a post
const { record } = await web5.dwn.records.create({
  data: {
    content: 'Hello Web5!',
    timestamp: new Date().toISOString()
  },
  message: {
    protocol: 'https://social.example.com/protocol',
    protocolPath: 'post',
    schema: 'https://social.example.com/schemas/post',
    dataFormat: 'application/json'
  }
});

// Add a comment to the post
await web5.dwn.records.create({
  data: {
    text: 'Great post!',
    timestamp: new Date().toISOString()
  },
  message: {
    protocol: 'https://social.example.com/protocol',
    protocolPath: 'post/comment',
    parentId: record.id,
    schema: 'https://social.example.com/schemas/comment',
    dataFormat: 'application/json'
  }
});
```

## Next Steps

- [API Reference](/docs/reference/api-overview)
- [Example Projects](/docs/examples/todo-app)
