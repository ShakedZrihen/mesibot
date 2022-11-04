//webhooks/slack/commands

import { Router } from 'express';
import { WebClient } from '@slack/web-api';
import _ from 'lodash';

export const commands = Router();

const supportedCommands = {
  create: async ({ channel_id, channel_name, user_name, text }) => {
    let playlistName = text.split(' ');
    playlistName.shift();
    const createInNewChannel = playlistName.length >= 2 && playlistName.pop();
    const message = `playlist name "${playlistName}" created for channel ${channel_name} by ${user_name}`;

    // Initialize a single instance for the whole app
    const web = new WebClient(
      ''
    );
    if (createInNewChannel === 'new') {
      console.log('Should create new channel');
    }
    const result = await web.chat.postMessage({
      text: message,
      channel: channel_id
    });
    return result;
  }
};

commands.post('/', async (req, res) => {
  const { body } = req;
  console.log(JSON.stringify(body, null, 2));
  /**
   * {
  "token": "ALjJVJTaEh57TPEX9WYUkvkm",
  "team_id": "T9S1TJFAA",
  "team_domain": "linear-b-inc",
  "channel_id": "C048Q5NMXFC",
  "channel_name": "mesibot",
  "user_id": "U01KL06DLSZ",
  "user_name": "shaked",
  "command": "/mesi",
  "text": "create",
  "api_app_id": "A049L5331NW",
  "is_enterprise_install": "false",
  "response_url": "https://hooks.slack.com/commands/T9S1TJFAA/4328715010836/047xumXg3GvwDI4UEo9sPRby",
  "trigger_id": "4311717980103.332061627350.4e9a4b96f195babcc2beb9adf3091891"
}
   */
  const command = body.text?.split(' ')[0];
  const handler = _.get(supportedCommands, command, _.noop);
  await handler(body);

  // Call the method
  return res.sendStatus(200);
});
