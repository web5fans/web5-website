---
title: Verifiable Credentials Reference
description: Reference for Verifiable Credentials API
---

Create and verify Verifiable Credentials.

## Methods

### `web5.vc.create()`

Creates a new Verifiable Credential.

**Signature:**
```typescript
create(options: VcCreateOptions): Promise<string>
```

**Parameters:**
```typescript
{
  type: string;
  issuer: string;
  subject: string;
  data: Record<string, any>;
  expirationDate?: string;
}
```

**Returns:** JWT string

**Example:**
```javascript
const vcJwt = await web5.vc.create({
  type: 'EmployeeCredential',
  issuer: issuerDid,
  subject: employeeDid,
  data: {
    position: 'Engineer',
    department: 'Engineering'
  }
});
```

### `web5.vc.verify()`

Verifies a Verifiable Credential.

**Signature:**
```typescript
verify(options: VcVerifyOptions): Promise<VcVerifyResult>
```

**Parameters:**
```typescript
{
  vcJwt: string;
}
```

**Returns:**
```typescript
{
  valid: boolean;
}
```

**Example:**
```javascript
const { valid } = await web5.vc.verify({
  vcJwt: vcJwt
});
```

## VC Structure

A Verifiable Credential contains:

- **Issuer**: Who issued the credential
- **Subject**: Who the credential is about
- **Type**: What kind of credential
- **Claims**: The actual data/attributes
- **Proof**: Cryptographic signature
- **Expiration**: Optional expiry date

## See Also

- [Core Concepts: Verifiable Credentials](/docs/guides/core-concepts#verifiable-credentials-vcs)
- [Authentication Guide](/docs/guides/authentication)
