"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Log {
    constructor() {
        this.application = "";
        this.environment = "";
        this.version = "";
        this.type = "";
        this.level = "";
        this.name = null;
        this.message = "";
        this.trace = null;
        this.server_ip = "";
        this.server_name = "";
    }
}
exports.default = Log;
