"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
class LogController {
    constructor(application, environment, version, logType, logName = null) {
        var _a;
        this.logName = null;
        this.url = "https://logcenter.leonardpark.dev/logs";
        this.serverName = (0, os_1.hostname)();
        this.serverIp = (_a = Object.values((0, os_1.networkInterfaces)())
            .flat(1)
            .filter((info) => info && !info.internal)[0]) === null || _a === void 0 ? void 0 : _a.address;
        this.application = application;
        this.environment = environment;
        this.version = version;
        this.logType = logType;
        this.logName = logName;
    }
    async log(data) {
        await this.sendLog("log", data);
    }
    async error(data) {
        await this.sendLog("error", data);
    }
    async warn(data) {
        await this.sendLog("warn", data);
    }
    async info(data) {
        await this.sendLog("info", data);
    }
    async debug(data) {
        await this.sendLog("debug", data);
    }
    async sendLog(level, message, trace = null) {
        var _a;
        const logData = {
            application: this.application,
            environment: this.environment,
            version: this.version,
            type: this.logType,
            level,
            name: this.logName,
            message,
            trace,
            server_ip: (_a = this.serverIp) !== null && _a !== void 0 ? _a : "",
            server_name: this.serverName,
        };
        await this.requestSendLog(logData);
    }
    async requestSendLog(data) {
        fetch(this.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        }).catch((err) => { });
    }
}
exports.default = LogController;
