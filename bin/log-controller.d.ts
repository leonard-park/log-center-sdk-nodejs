import LogClient from "./log-client";
export declare class LogController {
    application: string;
    environment: string;
    version: string;
    private console;
    protected client: LogClient;
    constructor(application: string, environment: string, version: string);
    log(...args: unknown[]): Promise<void>;
    error(...args: unknown[]): Promise<void>;
    warn(...args: unknown[]): Promise<void>;
    info(...args: unknown[]): Promise<void>;
    debug(...args: unknown[]): Promise<void>;
    protected sendLog(level: string, message: string, trace?: string | null): Promise<void>;
    protected requestSendLog(data: {
        [key: string]: string | null;
    }): Promise<void>;
}
