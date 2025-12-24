---
title: Core Concepts
description: Understanding the fundamental building blocks of Web5
---

Web5 is built on three fundamental pillars that work together to create a truly decentralized web experience. Understanding these concepts is essential for building Web5 applications.

## Decentralized Identifiers (DIDs)

DIDs are the foundation of identity in Web5. Unlike traditional usernames or email addresses, DIDs are:

- **Self-Owned**: You create and control your identifier without any central authority
- **Portable**: Use the same identity across any Web5 application
- **Verifiable**: Cryptographically provable ownership
- **Persistent**: Your identity remains consistent across platforms

### DID Structure

A DID looks like this:

```
did:ion:EiD2z4K3JhFj8kNP4xZ9Qw...
```

It consists of three parts:
- **Scheme**: Always starts with `did:`
- **Method**: The specific DID method (e.g., `ion`, `key`, `web`)
- **Identifier**: A unique string specific to that DID

### Creating a DID

```javascript
import { Web5 } from '@web5/api';

const { web5, did } = await Web5.connect();
console.log('My DID:', did);
```

## Verifiable Credentials (VCs)

Verifiable Credentials allow you to prove claims about yourself without revealing unnecessary information. Think of them as digital versions of physical credentials like:

- Driver's licenses
- Diplomas
- Age verification
- Membership cards

### Key Features

**Issuer**: The entity that creates and signs the credential
**Holder**: The person who owns the credential (you!)
**Verifier**: Anyone who needs to verify the credential's authenticity

### Example: Age Verification

Instead of showing your full driver's license to prove you're over 21, you can share a VC that only proves your age without revealing your birthdate, address, or photo.

```javascript
// Issue a credential
const vc = await web5.vc.create({
  type: 'AgeCredential',
  issuer: issuerDid,
  subject: holderDid,
  data: {
    over21: true
  }
});

// Verify a credential
const isValid = await web5.vc.verify({
  vcJwt: vc
});
```

## Decentralized Web Nodes (DWNs)

DWNs are personal data stores that you control. They replace centralized databases with a network of nodes that sync your data automatically.

### How DWNs Work

1. **Data Storage**: Store any type of data (text, images, videos)
2. **Synchronization**: Your data syncs across multiple nodes
3. **Access Control**: You decide who can read or write your data
4. **Protocol Support**: Apps follow standardized protocols to access data

### DWN Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Your      │────▶│    Your     │◀────│   Remote    │
│   Device    │     │     DWN     │     │     DWN     │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Backup    │
                    │     DWN     │
                    └─────────────┘
```

### Working with Records

```javascript
// Write data
const { record } = await web5.dwn.records.create({
  data: { message: 'Hello Web5!' },
  message: {
    schema: 'https://schema.org/Message',
    dataFormat: 'application/json'
  }
});

// Read data
const data = await record.data.json();

// Query records
const { records } = await web5.dwn.records.query({
  message: {
    filter: {
      schema: 'https://schema.org/Message'
    }
  }
});
```

## Protocols

Protocols define how applications interact with your DWN. They specify:

- What types of data can be stored
- Who has permission to access data
- How data is structured and related

### Example: Social Media Protocol

```javascript
const protocol = {
  protocol: 'https://social-media-protocol.xyz',
  published: true,
  types: {
    post: {
      schema: 'https://schema.org/SocialMediaPosting',
      dataFormats: ['application/json']
    },
    comment: {
      schema: 'https://schema.org/Comment',
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
      }
    }
  }
};

await web5.dwn.protocols.configure({
  message: { definition: protocol }
});
```

## Data Schemas

Schemas ensure data consistency across applications. They define the structure and types of data:

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "title": { "type": "string" },
    "content": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "author": { "type": "string" }
  },
  "required": ["title", "content", "timestamp"]
}
```

## Putting It All Together

Here's how these concepts work together in a real application:

1. **User creates a DID** - Their unique identity
2. **User connects to their DWN** - Their personal data store
3. **App installs a protocol** - Defines how to store/access data
4. **User shares VCs** - Proves attributes without revealing everything
5. **Data syncs across devices** - Seamless experience everywhere

## Next Steps

Now that you understand the core concepts, explore:

- [Working with Schemas](/docs/guides/schemas) - Structure your data properly
- [Authentication](/docs/guides/authentication) - Implement secure login
- [Protocol Development](/docs/guides/protocols) - Build your own protocols
- [API Reference](/docs/reference/api-overview) - Detailed API documentation
