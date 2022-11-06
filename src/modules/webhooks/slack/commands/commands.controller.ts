//webhooks/slack/commands

import { Router } from 'express';
import _ from 'lodash';
import { create } from './create.command';

export const commands = Router();

const supportedCommands = {
  create
};

commands.post('/', async (req, res) => {
  const { body } = req;
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
