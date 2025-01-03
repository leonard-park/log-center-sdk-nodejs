# Log Center SDK for Node.js

A simple and powerful logging library for Node.js applications. It provides seamless integration with Logstash and
overrides the global `console` object to send logs directly to your Log Center.

## Features

- Override the global `console` to send logs to Logstash.
- Supports log levels: `log`, `error`, `warn`, `info`, and `debug`.
- Enforces initialization through `setupLogController`.
- Built with TypeScript for strong type safety.

## Installation

### From NPM

```bash
npm install log-center-sdk-nodejs
```

### From Local Directory

If you're testing locally:

1. Build the library:
    ```bash
   tsc
   ```

2. Install the library in your project:
    ```bash
   npm install /path/to/log-center-sdk-nodejs
   ```

---

## Usage

### Initialization

Before using the library, you must call `setupLogController` to initialize it.

TypeScript:
```typescript
import "log-center-sdk-nodejs";

import {setupLogController} from "log-center-sdk-nodejs";

// Initialize the logger
setupLogController("MyApp TS", "production", "1.0.0");

// Use the global console as usual
console.log("This log will be sent to Logstash.");
console.error("This error will be sent to Logstash.");
console.warn("This warning will be sent to Logstash.");
console.info("This info will be sent to Logstash.");
console.debug("This debug log will be sent to Logstash.");
```

Javascript:
```javascript
require("log-center-sdk-nodejs");

const {setupLogController} = require("log-center-sdk-nodejs");

// Initialize the logger
setupLogController("MyApp JS", "production", "1.0.0");

// Use the global console as usual
console.log("This log will be sent to Logstash.");
console.error("This error will be sent to Logstash.");
console.warn("This warning will be sent to Logstash.");
console.info("This info will be sent to Logstash.");
console.debug("This debug log will be sent to Logstash.");
```

---

## API Reference

`setupLogController(application: string, environment: string, version: string): void`

Initializes the logging system and overrides the global `console`.

- `application`: Name of your application (e.g., "MyApp").
- `environment`: The environment where the application is running (e.g., "production").
- `version`: The application version (e.g., "1.0.0").


