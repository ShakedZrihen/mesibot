import { Router } from 'express';
import _ from 'lodash';
import { postHelpMessageToChannel } from '../slack.service';
import { createPlaylistModalHandler } from './interactions/createPlaylistModal';
import interactionList from './interactive.consts';

export const interactive = Router();

const interactiveHandler = {
  [interactionList.createPlaylistModal.callbackId]: createPlaylistModalHandler
};

interactive.post('/', async (req, res) => {
  const {
    body: { payload }
  } = req;
  const parsedPayload = JSON.parse(payload);
  console.log(JSON.stringify(parsedPayload, null, 2));
  const handler = _.get(interactiveHandler, parsedPayload.callback_id, _.noop);
  await handler(parsedPayload);
  res.sendStatus(204);
});
