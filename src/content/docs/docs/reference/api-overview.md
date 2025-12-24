---
title: API Overview
description: Complete reference for the Web5 JavaScript SDK
---

The Web5 JavaScript SDK provides a comprehensive set of APIs for building decentralized applications. This reference covers all major components and methods.

## Installation

```bash
npm install @web5/api
# or
pnpm add @web5/api
```

## Web5 Class

The main entry point for interacting with Web5.

### `Web5.connect(options?)`

Connects to Web5 and returns a Web5 instance along with the user's DID.

**Parameters:**
- `options` (optional): Configuration options
  - `sync`: Sync interval (e.g., `'5s'`, `'1m'`)
  - `techPreview`: Enable experimental features
  - `didCreateOptions`: Options for DID creation

**Returns:** `Promise<{ web5: Web5, did: string }>`

**Example:**

```javascript
import { Web5 } from '@web5/api';

const { web5, did } = await Web5.connect({
  sync: '5s'
});
```

---

## DID API

Methods for working with Decentralized Identifiers.

### `web5.did.create(method, options?)`

Creates a new DID with the specified method.

**Parameters:**
- `method`: DID method (`'ion'`, `'key'`, `'web'`)
- `options`: Method-specific options

**Returns:** `Promise<{ did: string, keySet: KeySet }>`

**Example:**

```javascript
const { did, keySet } = await web5.did.create('ion');
```

### `web5.did.resolve(didUri)`

Resolves a DID to its DID Document.

**Parameters:**
- `didUri`: The DID URI to resolve

**Returns:** `Promise<DidDocument>`

**Example:**

```javascript
const didDoc = await web5.did.resolve('did:ion:EiD2z...');
```

---

## DWN Records API

Manage data stored in Decentralized Web Nodes.

### `web5.dwn.records.create(options)`

Creates a new record in the DWN.

**Parameters:**
- `options`:
  - `data`: The data to store (object, string, or Blob)
  - `message`: Message options
    - `schema`: Schema URI
    - `dataFormat`: MIME type
    - `published`: Boolean (public or private)
    - `protocol`: Protocol URI (optional)
    - `protocolPath`: Protocol path (optional)

**Returns:** `Promise<{ record: Record, status: Status }>`

**Example:**

```javascript
const { record } = await web5.dwn.records.create({
  data: {
    title: 'My Note',
    content: 'Hello World'
  },
  message: {
    schema: 'https://schema.org/Note',
    dataFormat: 'application/json',
    published: true
  }
});
```

### `web5.dwn.records.query(options)`

Queries records from the DWN.

**Parameters:**
- `options`:
  - `message`: Query filter
    - `filter`: Filter criteria
      - `schema`: Schema URI
      - `protocol`: Protocol URI
      - `protocolPath`: Protocol path
      - `dataFormat`: MIME type
    - `dateSort`: Sort by date (`'createdAscending'` or `'createdDescending'`)

**Returns:** `Promise<{ records: Record[], status: Status }>`

**Example:**

```javascript
const { records } = await web5.dwn.records.query({
  message: {
    filter: {
      schema: 'https://schema.org/Note'
    },
    dateSort: 'createdDescending'
  }
});
```

### `web5.dwn.records.read(options)`

Reads a specific record by ID.

**Parameters:**
- `options`:
  - `message`:
    - `filter`:
      - `recordId`: The record ID to read

**Returns:** `Promise<{ record: Record, status: Status }>`

**Example:**

```javascript
const { record } = await web5.dwn.records.read({
  message: {
    filter: {
      recordId: 'bafyreib...'
    }
  }
});
```

### `web5.dwn.records.delete(recordId)`

Deletes a record from the DWN.

**Parameters:**
- `recordId`: The ID of the record to delete

**Returns:** `Promise<{ status: Status }>`

**Example:**

```javascript
await web5.dwn.records.delete('bafyreib...');
```

---

## Record Instance Methods

Methods available on Record instances returned from DWN operations.

### `record.data.json()`

Retrieves record data as JSON.

**Returns:** `Promise<object>`

### `record.data.text()`

Retrieves record data as text.

**Returns:** `Promise<string>`

### `record.data.blob()`

Retrieves record data as Blob.

**Returns:** `Promise<Blob>`

### `record.update(options)`

Updates the record with new data.

**Parameters:**
- `options`:
  - `data`: New data to store

**Returns:** `Promise<{ status: Status }>`

**Example:**

```javascript
await record.update({
  data: {
    title: 'Updated Note',
    content: 'New content'
  }
});
```

### `record.delete()`

Deletes the record.

**Returns:** `Promise<{ status: Status }>`

---

## Protocols API

Manage DWN protocols.

### `web5.dwn.protocols.configure(options)`

Installs a protocol in the DWN.

**Parameters:**
- `options`:
  - `message`:
    - `definition`: Protocol definition object

**Returns:** `Promise<{ protocol: Protocol, status: Status }>`

**Example:**

```javascript
await web5.dwn.protocols.configure({
  message: {
    definition: {
      protocol: 'https://example.com/protocol',
      published: true,
      types: { /* ... */ },
      structure: { /* ... */ }
    }
  }
});
```

### `web5.dwn.protocols.query(options)`

Queries installed protocols.

**Parameters:**
- `options`:
  - `message`:
    - `filter`:
      - `protocol`: Protocol URI

**Returns:** `Promise<{ protocols: Protocol[], status: Status }>`

---

## Verifiable Credentials API

Create and verify credentials.

### `web5.vc.create(options)`

Creates a new Verifiable Credential.

**Parameters:**
- `options`:
  - `type`: Credential type
  - `issuer`: Issuer DID
  - `subject`: Subject DID
  - `data`: Credential claims
  - `expirationDate`: Optional expiration

**Returns:** `Promise<string>` (JWT)

**Example:**

```javascript
const vcJwt = await web5.vc.create({
  type: 'EmployeeCredential',
  issuer: issuerDid,
  subject: employeeDid,
  data: {
    position: 'Software Engineer',
    startDate: '2024-01-01'
  }
});
```

### `web5.vc.verify(options)`

Verifies a Verifiable Credential.

**Parameters:**
- `options`:
  - `vcJwt`: The credential JWT to verify

**Returns:** `Promise<{ valid: boolean }>`

**Example:**

```javascript
const { valid } = await web5.vc.verify({
  vcJwt: vcJwt
});
```

---

## Error Handling

All API methods return a status object with error information:

```javascript
const { record, status } = await web5.dwn.records.create({...});

if (status.code !== 200) {
  console.error('Error:', status.detail);
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

---

## TypeScript Support

The SDK includes full TypeScript definitions:

```typescript
import { Web5, Record, Protocol } from '@web5/api';

const { web5, did }: { web5: Web5; did: string } = await Web5.connect();
```

---

## Next Steps

- [Quick Start Guide](/docs/guides/quickstart) - Build your first app
- [Core Concepts](/docs/guides/core-concepts) - Understand the fundamentals
- [GitHub Repository](https://github.com/TBD54566975/web5-js) - View source code
