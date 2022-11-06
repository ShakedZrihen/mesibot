import { Router } from 'express';
import { exchangeCodeForToken, getSlackInstaller } from './slack/slack.auth.service';
import _ from 'lodash';

const authRouter = Router();

authRouter.get('/slack/grant', async (req, res) => {
    const slackInstaller = getSlackInstaller();
    const grantUrl = await slackInstaller.generateInstallUrl({
        scopes: ['channels:read', 'channels:join', 'channels:history', 'channels:manage'],
        redirectUri: 'https://b04512d13c61.ngrok.io/auth/slack/grant/success'
    })
    res.redirect(grantUrl);
})

authRouter.get('/slack/grant/success', async (req, res) => {
    const { state, code } = req.query;
    const userDetails = await exchangeCodeForToken({ code, state });
    const userSlackId = _.get(userDetails, 'authed_user.id');
    res.redirect(`http://localhost:3000/login?userSlackId=${userSlackId}`)
})

export default authRouter;