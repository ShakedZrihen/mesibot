import express from 'express';
import boolParser from 'express-query-boolean';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { webhooks } from './modules/webhooks/webhooks.controller';
import { spotify } from './modules/spotify/spotify.controller';

// initialize app
export const app = express();

app.set('trust proxy', 1);
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(
  bodyParser.json({
    type: 'application/json',
    limit: '5mb'
  })
);
app.use(boolParser());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// Configure routes
app.get('/health', async (req, res) => {
  return res.sendStatus(200);
});

app.use('/webhooks', webhooks);
app.use('/spotify', spotify);

export default app;
