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
  const handler = _.get(
    interactiveHandler,
    parsedPayload.view.callback_id,
    _.noop
  );
  await handler({ payload: parsedPayload });
  res.sendStatus(204);
});
