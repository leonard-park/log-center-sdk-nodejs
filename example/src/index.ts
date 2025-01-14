import {LogController} from "log-center-sdk-nodejs";

(async _ => {
  await new LogController("lumos-aws", "env", "1.0.0", "api").log({
    test: "test",
  })
})()
