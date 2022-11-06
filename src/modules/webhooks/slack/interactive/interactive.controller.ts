import { Router } from 'express';
import _ from 'lodash';
import { postAddSongSuccessMessage } from '../slack.service';
import { createPlaylistModalHandler } from './interactions/createPlaylistModal';
import interactionList from './interactive.consts';

export const interactive = Router();

const interactiveHandler = {
  [interactionList.createPlaylistModal.callbackId]: createPlaylistModalHandler,
  [interactionList.addSongModal.callbackId]: async ({ payload }) => {
    const selectedSongObject = Object.values(payload.view.state.values)[0][
      interactionList.addSongModal.actions.songSearchbox
    ].selected_option;
    const songId: any = selectedSongObject.value;
    const songName = selectedSongObject.text.text;
    await postAddSongSuccessMessage({
      channel_id: payload.channel_id,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `:notes: @${payload.user.username} has added the song: *${songName}* :notes:`
          }
        }
      ]
    });
  }
};

interactive.post('/', async (req, res) => {
  try {
    const {
      body: { payload }
    } = req;
    const parsedPayload = JSON.parse(payload);
    // console.log(JSON.stringify(parsedPayload, null, 4));
    const callbackId = parsedPayload.view.callback_id.split('-'); // [0] - callbackId, [1] - currentChannel
    const handler = _.get(interactiveHandler, callbackId[0], _.noop);
    await handler({ payload: { ...parsedPayload, channel_id: callbackId[1] } });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});
