import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
});

export const search = async (searchQuery) => {
  await spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });

  const {
    body: { tracks }
  } = await spotifyApi.searchTracks(`track:${searchQuery}`);

  return tracks;
};

export const getSongById = async (songId) => {
  await spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  });
  const res = await spotifyApi.getTrack(songId);
  return res.body;
};
