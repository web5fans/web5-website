---
title: Authentication
description: Implement secure authentication with Web5
---

Learn how to implement secure, decentralized authentication in your Web5 applications using DIDs and Verifiable Credentials.

## Traditional vs Web5 Authentication

**Traditional Authentication:**
- Username/password stored on servers
- Third-party OAuth providers
- Session cookies and tokens
- Centralized user databases

**Web5 Authentication:**
- Self-sovereign identity with DIDs
- No passwords required
- Cryptographic proof of identity
- User-controlled authentication

## Basic Authentication Flow

```javascript
import { Web5 } from '@web5/api';

// User connects with their DID
const { web5, did } = await Web5.connect();

// Verify the user owns this DID
const challenge = generateChallenge();
const signature = await signChallenge(challenge, did);

if (verifySignature(signature, challenge, did)) {
  console.log('User authenticated!');
}
```

## Implementing Sign-In with Web5

```javascript
async function signInWithWeb5() {
  try {
    const { web5, did } = await Web5.connect();
    
    // Store session
    sessionStorage.setItem('userDid', did);
    
    return { success: true, did };
  } catch (error) {
    console.error('Authentication failed:', error);
    return { success: false };
  }
}
```

## Session Management

```javascript
// Check if user is authenticated
function isAuthenticated() {
  return sessionStorage.getItem('userDid') !== null;
}

// Get current user DID
function getCurrentUser() {
  return sessionStorage.getItem('userDid');
}

// Sign out
function signOut() {
  sessionStorage.removeItem('userDid');
}
```

## Using Verifiable Credentials for Auth

Require specific credentials for access:

```javascript
async function requireEmployeeCredential(vcJwt) {
  const { valid } = await web5.vc.verify({ vcJwt });
  
  if (!valid) {
    throw new Error('Invalid credential');
  }
  
  // Parse credential claims
  const claims = parseJWT(vcJwt);
  
  if (claims.type !== 'EmployeeCredential') {
    throw new Error('Not an employee');
  }
  
  return true;
}
```

## Next Steps

- [Working with Schemas](/docs/guides/schemas)
- [Protocol Development](/docs/guides/protocols)
- [API Reference](/docs/reference/api-overview)
