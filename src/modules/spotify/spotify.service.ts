import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';

export const search = () => {};

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
});

export const playSong = async (req, res) => {
  const {
    body: { trackUri }
  } = req;
  await spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });
  await spotifyApi.play();
  return res.status(200).json({});
};
