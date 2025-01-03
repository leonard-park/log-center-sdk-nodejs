import {Console} from "console";
import LogClient from "./log-client";
import rp = require("request-promise-native");
import Log from "./log";

export class LogController {
    application: string;
    environment: string;
    version: string;
    private console: Console;

    protected client: LogClient;

    constructor(application: string, environment: string, version: string) {
        this.application = application;
        this.environment = environment;
        this.version = version;

        this.console = new Console({
            stdout: process.stdout,
            stderr: process.stderr,
        });

        this.client = new LogClient(); // Initialize the log client
    }

    async log(...args: unknown[]): Promise<void> {
        const message = args.map(String).join(" ");
        this.console.log(message);
        await this.sendLog("log", message);
    }

    async error(...args: unknown[]): Promise<void> {
        const message = args.map(String).join(" ");
        this.console.error(message);
        await this.sendLog("error", message);
    }

    async warn(...args: unknown[]): Promise<void> {
        const message = args.map(String).join(" ");
        this.console.warn(message);
        await this.sendLog("warn", message);
    }

    async info(...args: unknown[]): Promise<void> {
        const message = args.map(String).join(" ");
        this.console.info(message);
        await this.sendLog("info", message);
    }

    async debug(...args: unknown[]): Promise<void> {
        const message = args.map(String).join(" ");
        this.console.debug(message);
        await this.sendLog("debug", message);
    }

    protected async sendLog(
        level: string,
        message: string,
        trace: string | null = null
    ) {
        return this.requestSendLog({
            application: this.application,
            environment: this.environment,
            version: this.version,
            type: this.client.logType,
            level,
            name: this.client.logName,
            message,
            trace,
            server_ip: this.client.serverIp ?? "",
            server_name: this.client.serverName,
        });
    }

    protected async requestSendLog(data: Log): Promise<void> {
        return rp({
            method: "POST",
            url: this.client.url,
            json: true,
            body: data,
        });
    }
}
