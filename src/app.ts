import express from 'express';
import boolParser from 'express-query-boolean';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import defineRoutes from './routes';
import pusherConfig from './modules/pusher/pusher.config';

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

pusherConfig(app);

// Configure routes
app.get('/health', async (req, res) => {
  return res.sendStatus(200);
});

defineRoutes(app);

export default app;

