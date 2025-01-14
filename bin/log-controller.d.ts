import Log from "./log";
export default class LogController {
    application: string;
    environment: string;
    version: string;
    logType: "application" | "api" | "email" | "admin" | "whatsapp";
    logName: string | null;
    readonly url: string;
    readonly serverName: string;
    readonly serverIp: string | undefined;
    constructor(application: string, environment: string, version: string, logType: "application" | "api" | "email" | "admin" | "whatsapp", logName?: string | null);
    log(data: {
        [key: string]: any;
    }): Promise<void>;
    error(data: {
        [key: string]: any;
    }): Promise<void>;
    warn(data: {
        [key: string]: any;
    }): Promise<void>;
    info(data: {
        [key: string]: any;
    }): Promise<void>;
    debug(data: {
        [key: string]: any;
    }): Promise<void>;
    protected sendLog(level: string, message: {
        [key: string]: any;
    }, trace?: string | null): Promise<void>;
    protected requestSendLog(data: Log): Promise<void>;
}
