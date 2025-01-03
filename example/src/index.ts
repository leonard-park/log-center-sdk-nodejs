import {setupLogController} from "log-center-sdk-nodejs";

(async _ => {
    setupLogController("MyApp", "production", "1.0.0");

    console.log("This is a test log.");
})()
