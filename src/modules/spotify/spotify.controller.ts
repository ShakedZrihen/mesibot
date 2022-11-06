import { Router } from 'express';
import _ from 'lodash';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';
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
