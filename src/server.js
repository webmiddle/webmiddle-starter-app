import Server from "webmiddle-server";
import * as services from "./services";
import * as tests from "./tests";

function extractTestServices(data, prefix = "tests", obj = {}) {
  Object.keys(data).forEach(key => {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((Service, i) => {
        obj[`${prefix}/${key}/${Service.name}`] = Service;
      });
    } else {
      extractTestServices(value, `${prefix}/${key}`, obj);
    }
  });
  return obj;
}

const server = new Server(
  {
    ...services,
    ...extractTestServices(tests)
  },
  {
    port: process.env.PORT || 3000,
    apiKey: process.env.API_KEY || ""
  }
);
server.start();

console.log("Services", server.serviceRoutes);
