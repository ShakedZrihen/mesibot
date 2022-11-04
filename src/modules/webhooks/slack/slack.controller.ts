//webhooks/slack/linearb-bot/commands

import { Router } from 'express';
import { commands } from './commands/commands.controller';

export const slack = Router();
slack.use('/commands', commands);
