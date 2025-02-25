import Log from "./log";
import {hostname, networkInterfaces} from "os";

export default class LogController {
  application: string;
  environment: string;
  version: string;

  logType: "application" | "api" | "email" | "admin" | "whatsapp"
  logName: string | null = null;

  public readonly url: string = "https://logcenter.leonardpark.dev/logs";
  public readonly serverName: string = hostname();
  public readonly serverIp = Object.values(networkInterfaces())
    .flat(1)
    .filter((info) => info && !info.internal)[0]?.address;


  constructor(
    application: string,
    environment: string,
    version: string,
    logType: "application" | "api" | "email" | "admin" | "whatsapp",
    logName: string | null = null
  ) {
    this.application = application;
    this.environment = environment;
    this.version = version;
    this.logType = logType;
    this.logName = logName;
  }

  async log(data: { [key: string]: any }): Promise<void> {
    await this.sendLog("log", data);
  }

  async error(data: { [key: string]: any }): Promise<void> {
    await this.sendLog("error", data);
  }

  async warn(data: { [key: string]: any }): Promise<void> {
    await this.sendLog("warn", data);
  }

  async info(data: { [key: string]: any }): Promise<void> {
    await this.sendLog("info", data);
  }

  async debug(data: { [key: string]: any }): Promise<void> {
    await this.sendLog("debug", data);
  }

  protected async sendLog(
    level: string,
    message: { [key: string]: any },
    trace: string | null = null
  ) {
    const logData: Log = {
      application: this.application,
      environment: this.environment,
      version: this.version,
      type: this.logType,
      level,
      name: this.logName,
      message,
      trace,
      server_ip: this.serverIp ?? "",
      server_name: this.serverName,
    }
    await this.requestSendLog(logData);
  }

  protected async requestSendLog(data: Log): Promise<void> {
    fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }).catch((err) => {})
  }
}
