---
title: Building a Todo App with Web5
description: Build a decentralized todo application with Web5
---

Learn how to build a complete decentralized todo application where users own their data.

## Features

- Create, read, update, and delete todos
- Data stored in user's DWN
- Works across devices
- No backend server needed

## Setup

```bash
npm create vite@latest web5-todo -- --template react
cd web5-todo
npm install @web5/api
```

## Implementation

### Connect to Web5

```javascript
import { Web5 } from '@web5/api';
import { useEffect, useState } from 'react';

function App() {
  const [web5, setWeb5] = useState(null);
  const [did, setDid] = useState('');

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setDid(did);
    };
    initWeb5();
  }, []);

  return <div>Connected as: {did}</div>;
}
```

### Create Todo

```javascript
async function createTodo(text) {
  const { record } = await web5.dwn.records.create({
    data: {
      text,
      completed: false,
      createdAt: new Date().toISOString()
    },
    message: {
      schema: 'https://schema.org/Action',
      dataFormat: 'application/json'
    }
  });
  
  return record;
}
```

### List Todos

```javascript
async function loadTodos() {
  const { records } = await web5.dwn.records.query({
    message: {
      filter: {
        schema: 'https://schema.org/Action'
      },
      dateSort: 'createdDescending'
    }
  });

  const todos = await Promise.all(
    records.map(async (record) => ({
      id: record.id,
      data: await record.data.json()
    }))
  );

  return todos;
}
```

### Update Todo

```javascript
async function toggleTodo(record, currentState) {
  await record.update({
    data: {
      ...await record.data.json(),
      completed: !currentState
    }
  });
}
```

### Delete Todo

```javascript
async function deleteTodo(record) {
  await record.delete();
}
```

## Full Example

Check out the [complete source code](https://github.com/TBD54566975/web5-examples/tree/main/todo-app) on GitHub.

## Next Steps

- [Social Network Example](/docs/examples/social-network)
- [File Sharing Example](/docs/examples/file-sharing)
