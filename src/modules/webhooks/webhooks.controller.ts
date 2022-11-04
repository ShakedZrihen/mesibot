//webhooks/slack/commands
import { Router } from 'express';
import { slack } from './slack/slack.controller';

export const webhooks = Router();
webhooks.use('/slack', slack);
