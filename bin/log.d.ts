export default class Log {
    application: string;
    environment: string;
    version: string;
    type: string;
    level: string;
    name: string | null;
    message: string;
    trace: string | null;
    server_ip: string;
    server_name: string;
}
