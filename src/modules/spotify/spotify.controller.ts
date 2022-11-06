import { Router } from 'express';
import { addTracksToPlaylist, addWithPostision, createPlaylist, getPlaylist, search } from './spotify.service';

export const spotify = Router();

spotify.post('/', search);
spotify.post('/get-playlist', getPlaylist);
spotify.post('/create-playlist', createPlaylist);
spotify.post('/add-track', addTracksToPlaylist);
spotify.post('/add-with-position', addWithPostision);
//spotify.post('/grant-auth', grantAutho);

