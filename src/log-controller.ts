import LogClient from "./log-client";
import Log from "./log";

export default class LogController {
  application: string;
  environment: string;
  version: string;
  protected client: LogClient;

  constructor(application: string, environment: string, version: string) {
    this.application = application;
    this.environment = environment;
    this.version = version;

    this.client = new LogClient(); // Initialize the log client
  }

  async log(...args: unknown[]): Promise<void> {
    await this.sendLog("log", JSON.stringify(args));
  }

  async error(...args: unknown[]): Promise<void> {
    await this.sendLog("error", JSON.stringify(args));
  }

  async warn(...args: unknown[]): Promise<void> {
    await this.sendLog("warn", JSON.stringify(args));
  }

  async info(...args: unknown[]): Promise<void> {
    await this.sendLog("info", JSON.stringify(args));
  }

  async debug(...args: unknown[]): Promise<void> {
    await this.sendLog("debug", JSON.stringify(args));
  }

  protected async sendLog(
    level: string,
    message: string,
    trace: string | null = null
  ) {
    const logData: Log = {
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
    }
    await this.requestSendLog(logData);
  }

  protected async requestSendLog(data: Log): Promise<void> {
    await fetch(this.client.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
  }
}
