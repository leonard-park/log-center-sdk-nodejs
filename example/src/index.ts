import "log-center-sdk-nodejs";
import {setupLogController} from "log-center-sdk-nodejs";

(async _ => {
  // Initialize the logger
  setupLogController("MyApp TS", "production", "1.0.0");

  // Use the global console as usual
  console.log("This log will be sent to Logstash.");
  console.error("This error will be sent to Logstash.");
  console.warn("This warning will be sent to Logstash.");
  console.info("This info will be sent to Logstash.");
  console.debug("This debug log will be sent to Logstash.");
})()
