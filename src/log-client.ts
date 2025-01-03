import {hostname, networkInterfaces} from "os";

export default class LogClient {
  public readonly url: string = "https://logcenter.leonardpark.dev/logs";

  public readonly serverName: string = hostname();
  public readonly serverIp = Object.values(networkInterfaces())
    .flat(1)
    .filter((info) => info && !info.internal)[0]?.address;

  public readonly logType: "application" | "api" | "email" | "admin" = "application";
  public readonly logName: string | null = null;
  public readonly throwable: boolean = false;
}
