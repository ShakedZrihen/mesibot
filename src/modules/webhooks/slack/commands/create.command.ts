import { openCreatePlaylisyModal } from '../slack.service';
import interactionList from '../interactive/interactive.consts';

export const createModalBlocks = [
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: 'Create a new shared playlist',
      emoji: true
    }
  },
  {
    type: 'input',
    element: {
      type: 'plain_text_input',
      action_id: 'create-playlist-name-action'
    },
    label: {
      type: 'plain_text',
      text: 'Name your playlist',
      emoji: true
    }
  },
  {
    type: 'input',
    optional: true,
    element: {
      type: 'multi_users_select',
      placeholder: {
        type: 'plain_text',
        text: 'Select people or teams (from channels) to add',
        emoji: true
      },
      action_id: 'add-users-to-playlist-action'
    },
    label: {
      type: 'plain_text',
      text: 'Share with:',
      emoji: true
    }
  },
  {
    type: 'section',
    text: {
      type: 'plain_text',
      text: 'The people selected will be added to the playlist where they can add songs and up or down vote songs to create your shared playlist',
      emoji: true
    }
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'radio_buttons',
        initial_option: {
          text: {
            type: 'mrkdwn',
            text: 'Create playlist on this channel'
          },
          value:
            interactionList.createPlaylistModal.actions.selectedChannel.options
              .currentChannel
        },
        options: [
          {
            text: {
              type: 'mrkdwn',
              text: 'Create playlist on this channel'
            },
            value:
              interactionList.createPlaylistModal.actions.selectedChannel
                .options.currentChannel
          },
          {
            text: {
              type: 'mrkdwn',
              text: 'Create playlist on *new* channel'
            },
            value:
              interactionList.createPlaylistModal.actions.selectedChannel
                .options.newChannel
          }
        ],
        action_id:
          interactionList.createPlaylistModal.actions.selectedChannel.id
      }
    ]
  }
];

export const create = async ({ trigger_id, channel_id }) => {
  try {
    await openCreatePlaylisyModal({
      trigger_id,
      createModalBlocks,
      callback_id: `${interactionList.createPlaylistModal.callbackId}-${channel_id}`
    });
  } catch (e) {
    console.log(e);
  }
};
