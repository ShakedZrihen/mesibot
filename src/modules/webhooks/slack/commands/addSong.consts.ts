export const addSongsModalBlocks = [
  {
    type: 'input',
    element: {
      type: 'external_select',
      placeholder: {
        type: 'plain_text',
        text: 'Select song',
        emoji: true
      },
      action_id: 'song-searchbox',
      
    },
    label: {
      type: 'plain_text',
      text: 'Add song',
      emoji: true
    }
  }
];
