import authRouter from './modules/auth/auth.controller';
import chatRouter from './modules/chat/chat.controller';
import verifyAndParseHeaders from './modules/middlewares/verifyAndParseHeaders';
import { spotify } from './modules/spotify/spotify.controller';
import { slack } from './modules/webhooks/slack/slack.controller';
import { webhooks } from './modules/webhooks/webhooks.controller';

const defineRoutes = (app) => {
  app.use(verifyAndParseHeaders);
  app.use('/auth', authRouter);
  app.use('/chat', chatRouter);
  app.use('/webhooks', webhooks);
  app.use('/spotify', spotify);
  app.use('/slack', slack);
};

export default defineRoutes;
