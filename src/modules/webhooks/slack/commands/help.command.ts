export const generateHelpBlocks = (user_name = ''): any[] =>
  [
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'Listen up!'
      }
    },
    user_name
      ? {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${user_name}* just added mesiBot to your Slack team`
          }
        }
      : null,
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Here’s what you can do:*'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi create`\nCreate a new playlist, name it and add people to share with - this will open a Slack channel for the members to add songs and listen to them'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi playlist`\nSelect an existing playlist to listen to and open player'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi add-song`\nopen Spotify search and add a song to a playlist'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi vote`\nUpvote or downvote a song in a playlist'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi show-playlist`\nshow song list and which song is now playing'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi dedicate-song`\nDedicate a song to another team mate and add a message'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi stats`\nShow channel stats (Top music suggester, Favorite genre etc)'
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '`/mesi help`\nWill show you this list of possible actions'
      }
    }
  ].filter(Boolean);
