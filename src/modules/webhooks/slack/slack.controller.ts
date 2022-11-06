//webhooks/slack/linearb-bot/commands

import { Router } from 'express';
import { commands } from './commands/commands.controller';
import { interactive } from './interactive/interactive.controller';

export const slack = Router();
slack.use('/commands', commands);
slack.use('/interactive', interactive);
