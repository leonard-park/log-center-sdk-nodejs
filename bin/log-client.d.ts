export default class LogClient {
    readonly url: string;
    readonly serverName: string;
    readonly serverIp: string | undefined;
    logType: "application" | "api" | "email" | "admin" | "whatsapp";
    logName: string | null;
    readonly throwable: boolean;
}
