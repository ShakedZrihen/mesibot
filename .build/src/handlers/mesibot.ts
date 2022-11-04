import serverlessExpress from '@vendia/serverless-express';
import { app } from '../app';
console.log('here');
// global variable server to keep hot in lambda
// server is set at the first call and reused then
// cache also db conn if any (such as postgres, for influx not required)
// https://github.com/vendia/serverless-express/issues/351
// https://github.com/vendia/serverless-express/issues/414
let server;

export const handler = (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = true;

  if (server) {
    return server(event, context, cb);
  }

  server = serverlessExpress({ app });
  return server(event, context, cb);
};
