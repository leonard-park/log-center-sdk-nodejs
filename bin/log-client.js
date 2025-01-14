"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = require("node:os");
class LogClient {
    constructor() {
        var _a;
        this.url = "https://logcenter.leonardpark.dev/logs";
        this.serverName = (0, node_os_1.hostname)();
        this.serverIp = (_a = Object.values((0, node_os_1.networkInterfaces)())
            .flat(1)
            .filter((info) => info && !info.internal)[0]) === null || _a === void 0 ? void 0 : _a.address;
        this.logType = "application";
        this.logName = null;
        this.throwable = false;
    }
}
exports.default = LogClient;
