import { Router } from 'express';
import _ from 'lodash';
import { createPlaylistModalHandler } from './interactions/createPlaylistModal';
import interactionList from './interactive.consts';

export const interactive = Router();

const interactiveHandler = {
  [interactionList.createPlaylistModal.callbackId]: createPlaylistModalHandler
};

interactive.post('/', async (req, res) => {
  try {
    const {
      body: { payload }
    } = req;
    const parsedPayload = JSON.parse(payload);
    const callbackId = parsedPayload.view.callback_id.split('-'); // [0] - callbackId, [1] - currentChannel
    const handler = _.get(interactiveHandler, callbackId[0], _.noop);
    await handler({ payload: { ...parsedPayload, channel_id: callbackId[1] } });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});
