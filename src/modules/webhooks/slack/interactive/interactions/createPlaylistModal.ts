import {
  createNewPlaylistChannel,
  openChannel,
  postHelpMessageToChannel
} from '../../slack.service';
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
  if (payload.type !== 'view_submission') {
    console.log(payload.type, 'is not submit');
    return;
  }
  const state = Object.values(payload.view.state.values);
  // console.log(payload);
  const playlistName = extractPlaylistNameFromState(state);
  const usersToAdd = extractUsersToAddFromState(state);
  const selectedChannel = extractSelectedChannel(state);
  if (
    selectedChannel ===
    interactionList.createPlaylistModal.actions.selectedChannel.options
      .currentChannel
  ) {
    await postHelpMessageToChannel({
      channel_id: payload.channel_id,
      user_name: payload.user.username
    });
  } else {
    await createNewPlaylistChannel({
      channelName: playlistName,
      usersToAdd: [...usersToAdd, payload.user.id],
      userName: payload.user.username
    });
  }
};
