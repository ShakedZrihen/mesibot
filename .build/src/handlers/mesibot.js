"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var serverlessExpress = require('@vendia/serverless-express');
var app_1 = require("../app");
// global variable server to keep hot in lambda
// server is set at the first call and reused then
// cache also db conn if any (such as postgres, for influx not required)
// https://github.com/vendia/serverless-express/issues/351
// https://github.com/vendia/serverless-express/issues/414
var server;
var handler = function (event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = true;
    if (server) {
        return server(event, context, cb);
    }
    server = serverlessExpress({ app: app_1.app });
    return server(event, context, cb);
};
exports.handler = handler;
//# sourceMappingURL=mesibot.js.map