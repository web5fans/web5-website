---
title: Web5 Class Reference
description: Complete reference for the Web5 class
---

The main entry point for all Web5 operations.

## Static Methods

### `Web5.connect(options?)`

Connects to Web5 and returns an instance.

**Signature:**
```typescript
static connect(options?: Web5ConnectOptions): Promise<Web5ConnectResult>
```

**Parameters:**
- `options.sync`: Sync interval (default: `'5s'`)
- `options.techPreview`: Enable experimental features
- `options.didCreateOptions`: DID creation options

**Returns:**
```typescript
{
  web5: Web5;
  did: string;
}
```

**Example:**
```javascript
const { web5, did } = await Web5.connect();
```

## Instance Properties

### `web5.did`

Access DID-related operations.

**Type:** `DidApi`

### `web5.dwn`

Access DWN operations (records, protocols).

**Type:** `DwnApi`

### `web5.vc`

Access Verifiable Credentials operations.

**Type:** `VcApi`

## See Also

- [DID API Reference](/docs/reference/did)
- [DWN Records Reference](/docs/reference/dwn-records)
- [Verifiable Credentials Reference](/docs/reference/credentials)
