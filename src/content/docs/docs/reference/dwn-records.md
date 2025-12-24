---
title: DWN Records Reference
description: Complete reference for DWN Records API
---

Manage data in Decentralized Web Nodes.

## Methods

### `web5.dwn.records.create()`

Creates a new record.

**Signature:**
```typescript
create(options: RecordCreateOptions): Promise<RecordCreateResult>
```

**Parameters:**
```typescript
{
  data: any;
  message: {
    schema: string;
    dataFormat: string;
    published?: boolean;
    protocol?: string;
    protocolPath?: string;
  }
}
```

**Example:**
```javascript
const { record } = await web5.dwn.records.create({
  data: { title: 'Hello' },
  message: {
    schema: 'https://schema.org/Note',
    dataFormat: 'application/json'
  }
});
```

### `web5.dwn.records.query()`

Queries records.

**Signature:**
```typescript
query(options: RecordQueryOptions): Promise<RecordQueryResult>
```

**Example:**
```javascript
const { records } = await web5.dwn.records.query({
  message: {
    filter: {
      schema: 'https://schema.org/Note'
    }
  }
});
```

### `web5.dwn.records.read()`

Reads a specific record.

**Example:**
```javascript
const { record } = await web5.dwn.records.read({
  message: {
    filter: { recordId: 'abc...' }
  }
});
```

### `web5.dwn.records.delete()`

Deletes a record.

**Example:**
```javascript
await web5.dwn.records.delete('recordId');
```

## Record Instance Methods

### `record.data.json()`

Returns data as JSON.

### `record.data.text()`

Returns data as text.

### `record.data.blob()`

Returns data as Blob.

### `record.update(options)`

Updates the record.

### `record.delete()`

Deletes the record.

## See Also

- [Core Concepts: DWNs](/docs/guides/core-concepts#decentralized-web-nodes-dwns)
