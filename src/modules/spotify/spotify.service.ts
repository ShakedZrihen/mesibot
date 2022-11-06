import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';

const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  accessToken:
    'BQDhyQAzqUUBaXWIYxCNg8XjgIetfp2r_vSxmqnWmku-7ux7g1hbaAz9SK7ucfYiAPjIW3P-RwdON4mmr9wIURNth-nN0-EO_XU4cXZt4quEc-soTZr9HvfueKIosv9qcu-IcsJkvFUkbUVR6MRz8vEeV_keRfO4a5RZEqCtayU'
});

// const credentials = {
//   clientId: 'a3a224d8b0ad478bb1cbf06daf921902',
//   clientSecret: 'dfa7418bacdf41099e23a733cf2bcd78',
//   redirectUri: '/callback'
// };

// const spotifyApi = new SpotifyWebApi(credentials);

// // The code that's returned as a query parameter to the redirect URI
// const code = 'MQCbtKe23z7YzzS44KzZzZgjQa621hgSzHN';

// // Retrieve an access token and a refresh token
// export const grantAutho = async (req, res) => {
//   spotifyApi.authorizationCodeGrant(code).then(
//     function (data) {
//       console.log('The token expires in ' + data.body['expires_in']);
//       console.log('The access token is ' + data.body['access_token']);
//       console.log('The refresh token is ' + data.body['refresh_token']);

//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//     },
//     function (err) {
//       console.log('Something went wrong!', err);
//     }
//   );
// };

// export const refreshToken = () => {
//   spotifyApi.refreshAccessToken().then(
//     function (data) {
//       console.log('The access token has been refreshed!');

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function (err) {
//       console.log('Could not refresh access token', err);
//     }
//   );
// };

export const search = async (req, res) => {
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
};

export const getPlaylist = async (req, res) => {
  const {
    body: { playlistId }
  } = req;
  const data = await spotifyApi.getPlaylist(playlistId);
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const createPlaylist = async (req, res) => {
  const {
    body: { playlistName, description }
  } = req;
  const data = await spotifyApi.createPlaylist(playlistName, { description, public: true });
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const addTracksToPlaylist = async (req, res) => {
  const {
    body: { playlistId, tracks }
  } = req;
  const data = await spotifyApi.addTracksToPlaylist(playlistId, tracks);
  console.log('response: ', data.body);
  return res.status(200).json({});
};

export const addWithPostision = async (req, res) => {
  const {
    body: { playlistId, tracks }
  } = req;
  const playlist = await spotifyApi.getPlaylist(playlistId);
  const totalSongs = playlist.body.tracks.total;

  const data = await spotifyApi.addTracksToPlaylist(playlistId, tracks, {
    position: totalSongs
  });
  console.log('response: ', data.body);
  return res.status(200).json({});
};
