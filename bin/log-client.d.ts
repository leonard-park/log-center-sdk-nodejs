export default class LogClient {
    readonly url: string;
    readonly serverName: string;
    readonly serverIp: string | undefined;
    readonly logType: "application" | "api" | "email" | "admin";
    readonly logName: string | null;
    readonly throwable: boolean;
}
