"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_express_1 = __importDefault(require("@vendia/serverless-express"));
const app_1 = require("../app");
// global variable server to keep hot in lambda
// server is set at the first call and reused then
// cache also db conn if any (such as postgres, for influx not required)
// https://github.com/vendia/serverless-express/issues/351
// https://github.com/vendia/serverless-express/issues/414
let server;
const handler = (event, context, cb) => {
    context.callbackWaitsForEmptyEventLoop = true;
    if (server) {
        return server(event, context, cb);
    }
    server = (0, serverless_express_1.default)({ app: app_1.app });
    return server(event, context, cb);
};
exports.handler = handler;
//# sourceMappingURL=mesibot.js.map