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
    const message = args.map(String).join(" ");
    await this.sendLog("log", message);
  }

  async error(...args: unknown[]): Promise<void> {
    const message = args.map(String).join(" ");
    await this.sendLog("error", message);
  }

  async warn(...args: unknown[]): Promise<void> {
    const message = args.map(String).join(" ");
    await this.sendLog("warn", message);
  }

  async info(...args: unknown[]): Promise<void> {
    const message = args.map(String).join(" ");
    await this.sendLog("info", message);
  }

  async debug(...args: unknown[]): Promise<void> {
    const message = args.map(String).join(" ");
    await this.sendLog("debug", message);
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
