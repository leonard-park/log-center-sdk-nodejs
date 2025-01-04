"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClient = exports.LogController = void 0;
exports.setupLogController = setupLogController;
let isSetupComplete = false;
const notInitializedMessage = (...args) => {
    throw new Error("The library has not been initialized. You must call `setupLogController(application, environment, version)` before using any console methods.");
};
const overrideGlobalConsole = () => {
    global.console = {
        log: (...args) => notInitializedMessage(...args),
        error: (...args) => notInitializedMessage(...args),
        warn: (...args) => notInitializedMessage(...args),
        info: (...args) => notInitializedMessage(...args),
        debug: (...args) => notInitializedMessage(...args),
    };
};
// Replace global console immediately
if (typeof window === "undefined") {
    // Running in Node.js
    overrideGlobalConsole();
}
else {
    // Running in the browser
    console.warn("SDK is designed for server-side use. Client-side logging is limited.");
}
function setupLogController(application, environment, version) {
    const { LogController } = require("./log-controller"); // Lazy-load to avoid circular dependencies
    const logController = new LogController(application, environment, version);
    // Override global console
    global.console = {
        log: (...args) => logController.log(...args),
        error: (...args) => logController.error(...args),
        warn: (...args) => logController.warn(...args),
        info: (...args) => logController.info(...args),
        debug: (...args) => logController.debug(...args),
    };
    isSetupComplete = true; // Mark setup as complete
}
// Function to enforce setup at runtime
function enforceSetup() {
    if (!isSetupComplete) {
        throw new Error("The library has not been initialized. You must call `setupLogController(application, environment, version)` before using any library functionality.");
    }
}
// Wrap exported functionality with enforcement
function wrapWithEnforcement(fn) {
    return new Proxy(fn, {
        get(targetObj, property) {
            enforceSetup();
            return Reflect.get(targetObj, property);
        },
    });
}
// Export functionality with runtime checks
exports.LogController = wrapWithEnforcement(require("./log-controller").LogController);
exports.LogClient = wrapWithEnforcement(require("./log-client").default);
setTimeout(() => {
    if (!isSetupComplete) {
        console.warn("Warning: `setupLogController` has not been called. The SDK will throw errors for any `console` calls until it is initialized.");
    }
}, 0);
