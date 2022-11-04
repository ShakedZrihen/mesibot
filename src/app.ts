import express, { Router } from 'express';
import boolParser from 'express-query-boolean';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

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
const v1Router = Router();
v1Router.get('/health', async (req, res) => {
  return res.sendStatus(200);
});
app.use('/v1', v1Router);

export default app;
