"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const console_1 = require("console");
const log_client_1 = __importDefault(require("./log-client"));
class LogController {
    constructor(application, environment, version) {
        this.application = application;
        this.environment = environment;
        this.version = version;
        this.console = new console_1.Console({
            stdout: process.stdout,
            stderr: process.stderr,
        });
        this.client = new log_client_1.default(); // Initialize the log client
    }
    async log(...args) {
        const message = args.map(String).join(" ");
        this.console.log(message);
        await this.sendLog("log", message);
    }
    async error(...args) {
        const message = args.map(String).join(" ");
        this.console.error(message);
        await this.sendLog("error", message);
    }
    async warn(...args) {
        const message = args.map(String).join(" ");
        this.console.warn(message);
        await this.sendLog("warn", message);
    }
    async info(...args) {
        const message = args.map(String).join(" ");
        this.console.info(message);
        await this.sendLog("info", message);
    }
    async debug(...args) {
        const message = args.map(String).join(" ");
        this.console.debug(message);
        await this.sendLog("debug", message);
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
exports.LogController = LogController;
