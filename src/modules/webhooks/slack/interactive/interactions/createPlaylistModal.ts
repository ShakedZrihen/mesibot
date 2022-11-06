import interactionList from '../interactive.consts';

const extractPlaylistNameFromState = (state) =>
  state?.[0]?.[interactionList.createPlaylistModal.actions.playlistName]
    .value || '';
const extractUsersToAddFromState = (state) =>
  state?.[1]?.[interactionList.createPlaylistModal.actions.selectedUsers]
    .selected_users;
const extractSelectedChannel = (state) =>
  state?.[2]?.[interactionList.createPlaylistModal.actions.selectedChannel.id]
    .selected_option.value;

export const createPlaylistModalHandler = async ({ payload }) => {
  const state = Object.values(payload.view.state.values);
  const playlistName = extractPlaylistNameFromState(state);
  const usersToAdd = extractUsersToAddFromState(state);
  const selectedChannel = extractSelectedChannel(state);
  console.log({
    playlistName,
    usersToAdd,
    selectedChannel,
    payload: JSON.stringify(payload, null, 2)
  });
};
