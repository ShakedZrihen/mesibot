import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
});

const personalSpotifyApi = new SpotifyWebApi({
  accessToken:
    'BQDhyQAzqUUBaXWIYxCNg8XjgIetfp2r_vSxmqnWmku-7ux7g1hbaAz9SK7ucfYiAPjIW3P-RwdON4mmr9wIURNth-nN0-EO_XU4cXZt4quEc-soTZr9HvfueKIosv9qcu-IcsJkvFUkbUVR6MRz8vEeV_keRfO4a5RZEqCtayU'
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

export const getPlaylist = async (req, res) => {
  const {
    body: { playlistId }
  } = req;
  const data = await personalSpotifyApi.getPlaylist(playlistId);
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const createPlaylist = async (req, res) => {
  const {
    body: { playlistName, description }
  } = req;
  const data = await personalSpotifyApi.createPlaylist(playlistName, {
    description,
    public: true
  });
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const addTracksToPlaylist = async (req, res) => {
  const {
    body: { playlistId, tracks }
  } = req;
  const data = await personalSpotifyApi.addTracksToPlaylist(playlistId, tracks);
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const addWithPostision = async (req, res) => {
  const {
    body: { playlistId, tracks }
  } = req;
  const playlist = await personalSpotifyApi.getPlaylist(playlistId);
  const totalSongs = playlist.body.tracks.total;

  const data = await personalSpotifyApi.addTracksToPlaylist(
    playlistId,
    tracks,
    {
      position: totalSongs
    }
  );
  console.log('response: ', data.body);
  return res.status(200).json({});
};
