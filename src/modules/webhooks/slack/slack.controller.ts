//webhooks/slack/linearb-bot/commands

import { Router } from 'express';
import { commands } from './commands/commands.controller';
import { events } from './events/events.controller';
import { interactive } from './interactive/interactive.controller';
import { getUserProfile } from './slack.service';

export const slack = Router();
slack.use('/commands', commands);
slack.use('/interactive', interactive);
slack.use('/events', events);

slack.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const resi = await getUserProfile(id);
  return res.send(resi.user?.profile || {});
});
