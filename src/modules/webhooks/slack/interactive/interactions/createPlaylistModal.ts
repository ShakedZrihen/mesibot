import interactionList from '../interactive.consts';

export const createPlaylistModalHandler = async ({ payload }) => {
  const state = Object.values(payload.view.state.values);
  const playlistName =
    state?.[0]?.[interactionList.createPlaylistModal.actions.playlistName]
      .value || '';
  const usersToAdd =
    state?.[1]?.[interactionList.createPlaylistModal.actions.selectedUsers]
      .selected_users;
};
