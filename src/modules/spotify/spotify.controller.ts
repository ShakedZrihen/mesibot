import { response, Router } from 'express';
import _ from 'lodash';
import { getPlaylistItems } from '../../common/dynamodb/handler';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../consts';
import PusherClient from '../pusher/pusher.client';
import * as spotifyApi from './spotify.service';

const request = require('request');
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
  // PusherClient.trigger(req.params.playlistId, 'playlistUpdate', mappedSongs);
  return res.send(mappedSongs);
});

spotify.post('/refresh', (req, res) => {
  const { body } = req;
  request.post(
    {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: body.token.refresh_token
      },
      json: true
    },
    async (error, response, body) => {
      return res.send(body);
    }
  );
});

spotify.get('/redirect', (req, res) => {
  const { code } = req.query;
  console.log({ code });
  request.post(
    {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      form: {
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'https://mesibot.ngrok.io/spotify/redirect'
      },
      json: true
    },
    async (error, response, body) => {
      console.log(error, body);
      res.send(body);
    }
  );
});
spotify.get('/grant', async (req, res) => {
  const scopes = [
    'streaming',
    'user-read-private',
    'user-read-email',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-top-read'
  ].join(',');
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=a3a224d8b0ad478bb1cbf06daf921902&scope=${scopes}&redirect_uri=https://mesibot.ngrok.io/spotify/redirect`
  );
});
