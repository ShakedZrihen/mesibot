import { Router } from 'express';
import _ from 'lodash';
import { getSongFromSlackMessage } from '../slack.service';

export const events = Router();

const eventsHandlers = {
  reaction_removed: async (event) => {
    console.log(event.type, event.user, event.reaction);
    await getSongFromSlackMessage({
      channel_id: event.item.channel,
      ts: event.item.ts
    });
  },
  reaction_added: async (event) => {
    console.log(event.type, event.user, event.reaction);
    await getSongFromSlackMessage({
      channel_id: event.item.channel,
      ts: event.item.ts
    });
  }
};
events.post('/', async (req, res) => {
  const { body } = req;
  console.log(body.event.type);
  const handler = _.get(eventsHandlers, body.event.type, _.noop);
  try {
    await handler(body.event);
  } catch (e) {
    console.log({ e });
  }
  res.sendStatus(200);
});
