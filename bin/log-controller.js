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
        const message = args.map(String).join(" ");
        if (typeof window !== "undefined") {
            await this.sendLog("log", message);
        }
    }
    async error(...args) {
        const message = args.map(String).join(" ");
        if (typeof window !== "undefined") {
            await this.sendLog("error", message);
        }
    }
    async warn(...args) {
        const message = args.map(String).join(" ");
        if (typeof window !== "undefined") {
            await this.sendLog("warn", message);
        }
    }
    async info(...args) {
        const message = args.map(String).join(" ");
        if (typeof window !== "undefined") {
            await this.sendLog("info", message);
        }
    }
    async debug(...args) {
        const message = args.map(String).join(" ");
        if (typeof window !== "undefined") {
            await this.sendLog("debug", message);
        }
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
