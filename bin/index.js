"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogClient = exports.LogController = void 0;
exports.setupLogController = setupLogController;
let isSetupComplete = false;
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
    return ((...args) => {
        enforceSetup();
        return fn(...args);
    });
}
// Export functionality with runtime checks
exports.LogController = wrapWithEnforcement(require("./log-controller").LogController);
exports.LogClient = wrapWithEnforcement(require("./log-client").default);
// Self-invoking to enforce initialization
(() => {
    if (!isSetupComplete) {
        console.warn("Warning: `setupLogController` has not been called. Please ensure to initialize the library before using it.");
    }
})();
