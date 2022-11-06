import { Router } from 'express';
import axios from 'axios';
import { SPOTIFY_TOKEN } from '../../consts';
export const spotify = Router();

spotify.post('/', async (req, res) => {
  const {
    body: { payload }
  } = req;
  //   const searchQuery = JSON.parse(payload).value;
  //   console.log({ searchQuery });
  const songsRes = await axios.get('https://api.spotify.com/v1/search', {
    headers: {
      Authorization: `Bearer ${SPOTIFY_TOKEN}`
    },
    params: {
      q: 'gaga',
      type: 'track'
    }
  });
  console.log({ songsRes });
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
