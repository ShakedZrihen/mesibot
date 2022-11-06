import { Router } from 'express';
import _ from 'lodash';
import { getPlaylistItems } from '../../common/dynamodb/handler';
import PusherClient from '../pusher/pusher.client';
import * as spotifyApi from './spotify.service';

export const spotify = Router();

spotify.post('/', async (req, res) => {
  const {
    body: { payload }
  } = req;
  const searchQuery = JSON.parse(payload).value;
  const tracks = await spotifyApi.search(searchQuery);

  return res.status(200).json({
    options: _.uniqBy(tracks.items, ({ name }) => name).map((song: any) => ({
      text: {
        type: 'plain_text',
        text: `${song.name!} by ${song.artists[0]?.name}`
      },
      value: song.id
    }))
  });
});

spotify.post('/get-playlist', spotifyApi.getPlaylist);
spotify.post('/create-playlist', spotifyApi.createPlaylist);
spotify.post('/add-track', spotifyApi.addTracksToPlaylist);
spotify.post('/add-with-position', spotifyApi.addWithPostision);

spotify.get('/playlist/:playlistId', async (req, res) => {
  const mappedSongs = await spotifyApi.getPlaylistSongs(req.params.playlistId);
  PusherClient.trigger(req.params.playlistId, 'playlistUpdate', mappedSongs);
  return res.send(mappedSongs);
});
