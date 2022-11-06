export default {
  createPlaylistModal: {
    callbackId: 'createPlaylistModal',
    actions: {
      playlistName: 'create-playlist-name-action',
      selectedUsers: 'add-users-to-playlist-action',
      selectedChannel: {
        id: 'selectedChannel',
        options: {
          newChannel: 'newChannel',
          currentChannel: 'currentChannel'
        }
      }
    }
  },
  addSongModal: {
    callbackId: 'addSongModal',
    actions: {
      songSearchbox: 'song-searchbox'
    }
  }
};
