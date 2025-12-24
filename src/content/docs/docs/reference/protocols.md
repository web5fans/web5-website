---
title: Protocols Reference
description: Reference for DWN Protocols API
---

Configure and manage DWN protocols.

## Methods

### `web5.dwn.protocols.configure()`

Installs a protocol.

**Signature:**
```typescript
configure(options: ProtocolConfigureOptions): Promise<ProtocolConfigureResult>
```

**Parameters:**
```typescript
{
  message: {
    definition: {
      protocol: string;
      published: boolean;
      types: Record<string, TypeDefinition>;
      structure: Record<string, StructureDefinition>;
    }
  }
}
```

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

### `web5.dwn.protocols.query()`

Queries installed protocols.

**Example:**
```javascript
const { protocols } = await web5.dwn.protocols.query({
  message: {
    filter: {
      protocol: 'https://example.com/protocol'
    }
  }
});
```

## Protocol Definition Structure

```typescript
interface ProtocolDefinition {
  protocol: string;
  published: boolean;
  types: {
    [typeName: string]: {
      schema: string;
      dataFormats: string[];
    }
  };
  structure: {
    [typeName: string]: {
      $actions: Array<{
        who: 'anyone' | 'author' | 'recipient';
        can: 'read' | 'write' | 'delete';
      }>;
      // Nested types...
    }
  };
}
```

## See Also

- [Protocol Development Guide](/docs/guides/protocols)
