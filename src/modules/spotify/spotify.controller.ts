import { Router } from 'express';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';
import { playSong } from './spotify.service';

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
  //   const searchQuery = JSON.parse(payload).value;
  //   console.log({ searchQuery });
  await spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });
  const {
    body: { tracks }
  } = await spotifyApi.searchTracks(`track:lady`);
  console.log({ tracks });
  return res.status(200).json({
    options: [
      {
        label: 'born this way',
        value: 'UXD-342'
      },
      {
        label: 'dope',
        value: 'FE-459'
      },
      {
        label: 'hair',
        value: 'FE-238'
      }
    ]
  });
});

spotify.post('/playSong', playSong)
