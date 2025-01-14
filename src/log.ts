export default class Log {
  application: string = ""
  environment: string = ""
  version: string = ""
  type: string = ""
  level: string = ""
  name: string | null = null
  message:  { [key: string]: any } = {}
  trace: string | null = null
  server_ip: string = ""
  server_name: string = ""
}
