import { Router } from 'express';
import {
  exchangeCodeForToken,
  getSlackInstaller
} from './slack/slack.auth.service';
import _ from 'lodash';

const authRouter = Router();

authRouter.get('/slack/grant', async (req, res) => {
  const slackInstaller = getSlackInstaller();
  const grantUrl = await slackInstaller.generateInstallUrl({
    scopes: [
      'channels:read',
      'channels:join',
      'channels:history',
      'channels:manage'
    ],
    redirectUri: 'https://mesibot.ngrok.io/auth/slack/grant/success'
  });
  res.redirect(grantUrl);
});

authRouter.get('/slack/grant/success', async (req, res) => {
  const { state, code } = req.query;
  console.log({ state, code });
  const userDetails = await exchangeCodeForToken({ code });
  console.log({ userDetails });
  const userSlackId = _.get(userDetails, 'authed_user.id');
  console.log({ userSlackId });
  res.redirect(`http://localhost:3000/login?userSlackId=${userSlackId}`);
});

export default authRouter;
