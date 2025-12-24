---
title: Decentralized Social Network
description: Build a decentralized social network with Web5
---

Create a social network where users control their own data and can switch between different front-end applications seamlessly.

## Overview

This example demonstrates:
- User profiles stored in DWNs
- Publishing posts
- Following other users
- Commenting and liking
- Cross-app data portability

## Protocol Definition

```javascript
const socialProtocol = {
  protocol: 'https://decentralized-social.com/protocol',
  published: true,
  types: {
    profile: {
      schema: 'https://decentralized-social.com/schemas/profile',
      dataFormats: ['application/json']
    },
    post: {
      schema: 'https://decentralized-social.com/schemas/post',
      dataFormats: ['application/json', 'image/jpeg', 'image/png']
    },
    follow: {
      schema: 'https://decentralized-social.com/schemas/follow',
      dataFormats: ['application/json']
    }
  },
  structure: {
    profile: {
      $actions: [
        { who: 'anyone', can: 'read' },
        { who: 'author', can: 'write' }
      ]
    },
    post: {
      $actions: [
        { who: 'anyone', can: 'read' },
        { who: 'author', can: 'write' }
      ]
    },
    follow: {
      $actions: [
        { who: 'anyone', can: 'read' },
        { who: 'author', can: 'write' }
      ]
    }
  }
};
```

## Creating a Profile

```javascript
async function createProfile(web5, profileData) {
  const { record } = await web5.dwn.records.create({
    data: {
      name: profileData.name,
      bio: profileData.bio,
      avatar: profileData.avatar
    },
    message: {
      protocol: 'https://decentralized-social.com/protocol',
      protocolPath: 'profile',
      schema: 'https://decentralized-social.com/schemas/profile',
      dataFormat: 'application/json',
      published: true
    }
  });
}
```

## Publishing a Post

```javascript
async function createPost(web5, content) {
  const { record } = await web5.dwn.records.create({
    data: {
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    },
    message: {
      protocol: 'https://decentralized-social.com/protocol',
      protocolPath: 'post',
      schema: 'https://decentralized-social.com/schemas/post',
      dataFormat: 'application/json',
      published: true
    }
  });
}
```

## Following Users

```javascript
async function followUser(web5, targetDid) {
  await web5.dwn.records.create({
    data: {
      followedDid: targetDid,
      timestamp: new Date().toISOString()
    },
    message: {
      protocol: 'https://decentralized-social.com/protocol',
      protocolPath: 'follow',
      schema: 'https://decentralized-social.com/schemas/follow',
      dataFormat: 'application/json'
    }
  });
}
```

## Next Steps

- [File Sharing Example](/docs/examples/file-sharing)
- [API Reference](/docs/reference/api-overview)
