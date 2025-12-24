---
title: Decentralized File Sharing
description: Build a decentralized file sharing application
---

Create a secure file sharing app where users maintain full control over their files and sharing permissions.

## Features

- Upload files to your DWN
- Share files with specific users
- Revoke access at any time
- End-to-end encryption
- No central server storing files

## Upload Files

```javascript
async function uploadFile(web5, file) {
  const arrayBuffer = await file.arrayBuffer();
  
  const { record } = await web5.dwn.records.create({
    data: arrayBuffer,
    message: {
      schema: 'https://schema.org/MediaObject',
      dataFormat: file.type,
      published: false // Keep private by default
    }
  });
  
  return record;
}
```

## Share with Others

```javascript
async function shareFile(web5, recordId, recipientDid) {
  // Create a sharing record
  await web5.dwn.records.create({
    data: {
      fileRecordId: recordId,
      sharedWith: recipientDid,
      permissions: ['read'],
      sharedAt: new Date().toISOString()
    },
    message: {
      schema: 'https://file-sharing.com/schemas/share',
      dataFormat: 'application/json'
    }
  });
  
  // Send to recipient's DWN
  await web5.dwn.records.write({
    data: {
      fileRecordId: recordId,
      sharedBy: web5.did,
      permissions: ['read']
    },
    target: recipientDid
  });
}
```

## Download Files

```javascript
async function downloadFile(record) {
  const blob = await record.data.blob();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'file'; // Add actual filename
  a.click();
  
  URL.revokeObjectURL(url);
}
```

## Revoke Access

```javascript
async function revokeAccess(web5, shareRecordId) {
  const { record } = await web5.dwn.records.read({
    message: {
      filter: { recordId: shareRecordId }
    }
  });
  
  await record.delete();
}
```

## Next Steps

- [Todo App Example](/docs/examples/todo-app)
- [API Reference](/docs/reference/api-overview)
