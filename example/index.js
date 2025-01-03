require("log-center-sdk-nodejs");

const {setupLogController} = require("log-center-sdk-nodejs");

// Initialize the logger
setupLogController("MyApp JS", "production", "1.0.0");

// Use the global console as usual
console.log("This log will be sent to Logstash.");
console.error("This error will be sent to Logstash.");
console.warn("This warning will be sent to Logstash.");
console.info("This info will be sent to Logstash.");
console.debug("This debug log will be sent to Logstash.");
