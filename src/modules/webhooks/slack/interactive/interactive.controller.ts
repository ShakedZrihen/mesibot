import { Router } from 'express';
import _ from 'lodash';
import { addSongToPlaylist } from '../../../../common/dynamodb/handler';
import { getSongById, mapSongs } from '../../../spotify/spotify.service';
import { postAddSongSuccessMessage } from '../slack.service';
import { createPlaylistModalHandler } from './interactions/createPlaylistModal';
import interactionList from './interactive.consts';

export const interactive = Router();

const interactiveHandler = {
  [interactionList.createPlaylistModal.callbackId]: createPlaylistModalHandler,
  [interactionList.addSongModal.callbackId]: async ({ payload, pusher }) => {
    const selectedSongObject = Object.values(payload.view.state.values)[0][
      interactionList.addSongModal.actions.songSearchbox
    ].selected_option;
    const songId: any = selectedSongObject.value;
    const songFullData = await getSongById(songId);
    const songName = selectedSongObject.text.text;
    const addedSong = await addSongToPlaylist({
      channelId: payload.channel_id,
      songInfo: {
        album: {
          name: songFullData.album.name,
          id: songFullData.album.id,
          uri: songFullData.album.uri,
          images: songFullData.album.images
        },
        artists: songFullData.artists,
        id: songFullData.id,
        name: songFullData.name,
        uri: songFullData.uri,
        songByArtist: songName,
        priority: 1000,
        addedBy: payload.user,
        duration_ms: songFullData.duration_ms
      }
    });
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
    try {
      const formattedSong = await mapSongs([addedSong]);
      pusher.trigger(payload.channel_id, 'NEW_SONG', formattedSong[0]);
    } catch (e) {
      console.log('Failed update list', e);
    }
  }
};

interactive.post('/', async (req, res) => {
  try {
    const {
      body: { payload }
    } = req;
    const pusher = req.app.get('pusher');
    const parsedPayload = JSON.parse(payload);
    // console.log(JSON.stringify(parsedPayload, null, 4));
    const callbackId = parsedPayload.view.callback_id.split('-'); // [0] - callbackId, [1] - currentChannel
    const handler = _.get(interactiveHandler, callbackId[0], _.noop);
    await handler({
      payload: { ...parsedPayload, channel_id: callbackId[1] },
      pusher
    });
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
});
