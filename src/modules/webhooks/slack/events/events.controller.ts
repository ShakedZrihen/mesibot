import { Router } from 'express';
import _ from 'lodash';
import { updateSongVote } from '../../../../common/dynamodb/handler';
import { getSongFromSlackMessage } from '../slack.service';

export const events = Router();

const eventsHandlers = {
  reaction_removed: async (event) => {
    const songName = await getSongFromSlackMessage({
      channel_id: event.item.channel,
      ts: event.item.ts
    });
    if (event.reaction === '-1') {
      console.log(`Upvote by ${event.user} for song: ${songName}`);
    }
    if (event.reaction === '+1') {
      console.log(`Downvote by ${event.user} for song: ${songName}`);
    }
    if (event.reaction === '+1' || event.reaction === '-1') {
      await updateSongVote({
        channelId: event.item.channel,
        songInfo: {
          songByArtist: songName,
          priority: Number(event.reaction) * -1
        }
      });
    }
  },
  reaction_added: async (event) => {
    const songName = await getSongFromSlackMessage({
      channel_id: event.item.channel,
      ts: event.item.ts
    });
    if (event.reaction === '-1') {
      console.log(`Downvote by ${event.user} for song: ${songName}`);
    }
    if (event.reaction === '+1') {
      console.log(`Upvote by ${event.user} for song: ${songName}`);
    }
    if (event.reaction === '+1' || event.reaction === '-1') {
      await updateSongVote({
        channelId: event.item.channel,
        songInfo: {
          songByArtist: songName,
          priority: Number(event.reaction) * -1
        }
      });
    }
  }
};
events.post('/', async (req, res) => {
  const { body } = req;
  const handler = _.get(eventsHandlers, body.event.type, _.noop);
  try {
    await handler(body.event);
  } catch (e) {
    // console.log({ e });
  }
  res.sendStatus(200);
});
