import Server from "webmiddle-server";
import * as services from "./services";

const server = new Server(services, {
  port: 3000,
});
server.start();
