let isSetupComplete = false;

const notInitializedMessage = (...args: unknown[]): any => {
  throw new Error(
    "The library has not been initialized. You must call `setupLogController(application, environment, version)` before using any console methods."
  );
};
const overrideGlobalConsole = () => {
  global.console = {
    log: (...args: unknown[]) => notInitializedMessage(...args),
    error: (...args: unknown[]) => notInitializedMessage(...args),
    warn: (...args: unknown[]) => notInitializedMessage(...args),
    info: (...args: unknown[]) => notInitializedMessage(...args),
    debug: (...args: unknown[]) => notInitializedMessage(...args),
  } as Console;
};

// Replace global console immediately
if (typeof window === "undefined") {
  // Running in Node.js
  overrideGlobalConsole();
} else {
  // Running in the browser
  console.warn("SDK is designed for server-side use. Client-side logging is limited.");
}

export function setupLogController(application: string, environment: string, version: string): void {
  const {LogController} = require("./log-controller"); // Lazy-load to avoid circular dependencies

  const logController = new LogController(application, environment, version);

  // Override global console
  global.console = {
    log: (...args: unknown[]) => logController.log(...args),
    error: (...args: unknown[]) => logController.error(...args),
    warn: (...args: unknown[]) => logController.warn(...args),
    info: (...args: unknown[]) => logController.info(...args),
    debug: (...args: unknown[]) => logController.debug(...args),
  } as Console;

  isSetupComplete = true; // Mark setup as complete
}

// Function to enforce setup at runtime
function enforceSetup(): void {
  if (!isSetupComplete) {
    throw new Error(
      "The library has not been initialized. You must call `setupLogController(application, environment, version)` before using any library functionality."
    );
  }
}

// Wrap exported functionality with enforcement
function wrapWithEnforcement<T extends (...args: any[]) => any>(fn: T): T {
  return new Proxy(fn, {
    get(targetObj, property) {
      enforceSetup();
      return Reflect.get(targetObj, property);
    },
  });
}

// Export functionality with runtime checks
export const LogController = wrapWithEnforcement(require("./log-controller").LogController);
export const LogClient = wrapWithEnforcement(require("./log-client").default);

setTimeout(() => {
  if (!isSetupComplete) {
    if (typeof window !== "undefined") {
      console.warn(
        "Warning: `setupLogController` has not been called. The SDK will throw errors for any `console` calls until it is initialized."
      );
    }
  }
}, 0);
