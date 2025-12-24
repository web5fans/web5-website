---
title: DID API Reference
description: Reference for Decentralized Identifier operations
---

Methods for creating and managing Decentralized Identifiers.

## Methods

### `web5.did.create(method, options?)`

Creates a new DID.

**Signature:**
```typescript
create(method: string, options?: DidCreateOptions): Promise<DidResult>
```

**Parameters:**
- `method`: DID method (`'ion'`, `'key'`, `'web'`)
- `options`: Method-specific options

**Returns:**
```typescript
{
  did: string;
  keySet: KeySet;
}
```

**Example:**
```javascript
const { did, keySet } = await web5.did.create('ion');
```

### `web5.did.resolve(didUri)`

Resolves a DID to its DID Document.

**Signature:**
```typescript
resolve(didUri: string): Promise<DidDocument>
```

**Returns:** DID Document object

**Example:**
```javascript
const doc = await web5.did.resolve('did:ion:EiD2z...');
```

## Types

### `DidDocument`

```typescript
interface DidDocument {
  id: string;
  verificationMethod: VerificationMethod[];
  authentication: string[];
  // ... other properties
}
```

## See Also

- [Core Concepts: DIDs](/docs/guides/core-concepts#decentralized-identifiers-dids)
