"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_client_1 = __importDefault(require("./log-client"));
class LogController {
    constructor(application, environment, version) {
        this.application = application;
        this.environment = environment;
        this.version = version;
        this.client = new log_client_1.default(); // Initialize the log client
    }
    async log(...args) {
        await this.sendLog("log", JSON.stringify(args));
    }
    async error(...args) {
        await this.sendLog("error", JSON.stringify(args));
    }
    async warn(...args) {
        await this.sendLog("warn", JSON.stringify(args));
    }
    async info(...args) {
        await this.sendLog("info", JSON.stringify(args));
    }
    async debug(...args) {
        await this.sendLog("debug", JSON.stringify(args));
    }
    async sendLog(level, message, trace = null) {
        var _a;
        const logData = {
            application: this.application,
            environment: this.environment,
            version: this.version,
            type: this.client.logType,
            level,
            name: this.client.logName,
            message,
            trace,
            server_ip: (_a = this.client.serverIp) !== null && _a !== void 0 ? _a : "",
            server_name: this.client.serverName,
        };
        await this.requestSendLog(logData);
    }
    async requestSendLog(data) {
        await fetch(this.client.url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        });
    }
}
exports.default = LogController;
