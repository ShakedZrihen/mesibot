import { WebClient } from '@slack/web-api';
import { SLACK_TOKEN } from '../../../consts';
import { addSongsModalBlocks } from './commands/addSong.consts';
import { generateHelpBlocks } from './commands/help.command';

const web = new WebClient(SLACK_TOKEN);

export const postHelpMessageToChannel = async ({
  channel_id,
  user_name,
  message = ''
}) => {
  const result = await web.chat.postMessage({
    text: message,
    blocks: generateHelpBlocks(user_name),
    channel: channel_id
  });
  return result;
};

export const openCreatePlaylisyModal = async ({
  trigger_id,
  createModalBlocks,
  callback_id
}) => {
  await web.views.open({
    trigger_id,
    view: {
      type: 'modal',
      callback_id,
      title: {
        type: 'plain_text',
        text: 'Create new playlist'
      },
      blocks: createModalBlocks,
      close: {
        type: 'plain_text',
        text: 'Cancel'
      },
      submit: {
        type: 'plain_text',
        text: 'Save'
      }
    }
  });
};

export const createNewPlaylistChannel = async ({
  channelName,
  usersToAdd,
  userName
}) => {
  const response = await web.conversations.create({
    name: channelName.replace(/ /g, '-')
  });
  await web.conversations.invite({
    users: usersToAdd.join(','),
    channel: response.channel!.id!
  });
  await postHelpMessageToChannel({
    channel_id: response.channel!.id!,
    user_name: userName
  });
  return response.channel;
};

export const openAddSongModal = async ({
  trigger_id,
  addSongsModalBlocks,
  callback_id
}) => {
  await web.views.open({
    trigger_id,
    view: {
      type: 'modal',
      callback_id,
      title: {
        type: 'plain_text',
        text: 'Add new song'
      },
      blocks: addSongsModalBlocks,
      close: {
        type: 'plain_text',
        text: 'Cancel'
      },
      submit: {
        type: 'plain_text',
        text: 'Save'
      }
    }
  });
};
