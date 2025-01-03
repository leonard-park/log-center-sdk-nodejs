let isSetupComplete = false;

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
    console.log("Starting log");
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
  return ((...args: any[]) => {
    enforceSetup();
    return fn(...args);
  }) as T;
}

// Export functionality with runtime checks
export const LogController = wrapWithEnforcement(require("./log-controller").LogController);
export const LogClient = wrapWithEnforcement(require("./log-client").default);

// Self-invoking to enforce initialization
(() => {
  if (!isSetupComplete) {
    console.warn(
      "Warning: `setupLogController` has not been called. Please ensure to initialize the library before using it."
    );
  }
})();
