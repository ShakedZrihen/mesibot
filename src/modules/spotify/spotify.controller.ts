import { Router } from 'express';
import _ from 'lodash';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';

export const spotify = Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
});

spotify.post('/', async (req, res) => {
  const {
    body: { payload }
  } = req;
  const searchQuery = JSON.parse(payload).value;
  await spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });

  const {
    body: { tracks }
  } = await spotifyApi.searchTracks(`track:${searchQuery}`);

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
