import { InstallProvider } from '@slack/oauth';
import axios from 'axios';

const clientId = process.env.SLACK_IDENTITY_APP_CLIENT_ID
const clientSecret = process.env.SLACK_IDENTITY_APP_CLIENT_SECRET;
const stateSecret = process.env.SLACK_IDENTITY_APP_STATE_SECRET;

export const getSlackInstaller = () => {
    const installer = new InstallProvider({
        clientId,
        clientSecret,
        stateSecret
    });
    return installer;
}

export const exchangeCodeForToken = async ({ code, state }) => {
    const credentials = {
        code,
        client_id: clientId,
        client_secret: clientSecret
    }

    let formBody: any = [];
    for (var property in credentials) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(credentials[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const _headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const config: any = {
        method: 'POST',
        url: 'https://slack.com/api/oauth.v2.access',
        data: formBody,
        headers: _headers
    }
    const { data } = await axios(config);
    return data;
}


