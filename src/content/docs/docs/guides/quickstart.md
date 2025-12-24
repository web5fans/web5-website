---
title: Quick Start Guide
description: Get started with Web5 in under 10 minutes
---

This guide will help you build your first Web5 application in just a few minutes. By the end, you'll have a working app that creates a decentralized identity and stores data in a Decentralized Web Node.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **pnpm** package manager
- A code editor (we recommend VS Code)
- Basic knowledge of JavaScript/TypeScript

## Installation

First, install the Web5 SDK in your project:

```bash
npm install @web5/api
# or
pnpm add @web5/api
```

## Create Your First DID

A Decentralized Identifier (DID) is your unique identity on Web5. Let's create one:

```javascript
import { Web5 } from '@web5/api';

// Connect to Web5
const { web5, did } = await Web5.connect();

console.log('Your DID:', did);
// Output: did:ion:EiD2z...
```

That's it! You now have a fully functional decentralized identity.

## Store Data in Your DWN

Now let's store some data in your Decentralized Web Node:

```javascript
// Create a record
const { record } = await web5.dwn.records.create({
  data: {
    title: 'My First Note',
    content: 'Hello Web5!',
    timestamp: new Date().toISOString()
  },
  message: {
    schema: 'https://schema.org/Note',
    dataFormat: 'application/json'
  }
});

console.log('Record created:', record.id);
```

## Read Data from Your DWN

Retrieve the data you just stored:

```javascript
// Query records
const { records } = await web5.dwn.records.query({
  message: {
    filter: {
      schema: 'https://schema.org/Note'
    }
  }
});

// Read the first record
const data = await records[0].data.json();
console.log('Retrieved note:', data);
```

## Update and Delete Records

You can also update or delete records:

```javascript
// Update a record
await record.update({
  data: {
    title: 'My Updated Note',
    content: 'Hello Web5 - Updated!',
    timestamp: new Date().toISOString()
  }
});

// Delete a record
await record.delete();
```

## Next Steps

Congratulations! You've created your first Web5 application. Here's what to explore next:

1. **[Core Concepts](/docs/guides/core-concepts)** - Dive deeper into DIDs, VCs, and DWNs
2. **[Working with Schemas](/docs/guides/schemas)** - Learn how to structure your data
3. **[Authentication](/docs/guides/authentication)** - Implement user authentication
4. **[API Reference](/docs/reference/api-overview)** - Explore all available methods

## Common Issues

### Connection Errors

If you encounter connection issues, ensure you have a stable internet connection and try again:

```javascript
const { web5, did } = await Web5.connect({
  sync: '5s' // Sync every 5 seconds
});
```

### Import Errors

Make sure you're using ES modules in your `package.json`:

```json
{
  "type": "module"
}
```

## Get Help

Need assistance? Join our community:

- **Discord**: Ask questions in real-time
- **GitHub Issues**: Report bugs or request features
- **Stack Overflow**: Search for solutions with the `web5` tag

---

Ready to build something amazing? Check out our [example projects](https://github.com/TBD54566975/web5-examples) for inspiration!
