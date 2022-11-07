import spotifyEvents from '../../modules/spotify/spotify.events';
import { mapSongs } from '../../modules/spotify/spotify.service';
import { getItem, patchItem, putItem, TABLES } from './dynamodb-client';

export const restartPlaylist = async (channelId, playlistName) => {
  if (!channelId) return;
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, {
    channel_id: channelId
  }).catch(console.error);
  if (!currentPlaylist) {
    return;
  } else {
    await putItem(TABLES.MESIBOT_VOTES, {
      channel_id: channelId,
      playlistName,
      songs: [],
      session: {}
    });
  }
  console.log(`Playlist ${channelId} restarted`);
};
export const addSongToPlaylist = async ({ channelId, songInfo }) => {
  if (!channelId || !songInfo) {
    console.log(
      `Details were missing: channelId=${channelId} spotifySongItem=${JSON.stringify(
        songInfo
      )}`
    );
    return;
  }
  let payload;
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, {
    channel_id: channelId
  }).catch(console.error);
  if (!currentPlaylist) {
    payload = {
      channel_id: channelId,
      songs: [{ ...songInfo, inserted_index: 0 }],
      session: {}
    };
  } else {
    if (
      !currentPlaylist.songs.filter(({ uri }) => songInfo.uri === uri).length
    ) {
      const songs = [
        ...currentPlaylist?.songs,
        { ...songInfo, inserted_index: currentPlaylist?.songs.length }
      ];
      payload = {
        ...currentPlaylist,
        channel_id: channelId,
        songs,
        session: {}
      };
    } else {
      return;
    }
  }
  await putItem(TABLES.MESIBOT_VOTES, payload);
  console.log(`add songs ${payload} to ${channelId} `);
  return { ...songInfo, inserted_index: currentPlaylist?.songs.length };
};

export const getPlaylistItems = async ({ channelId }) => {
  if (!channelId) {
    console.log(`Details were missing: channelId=${channelId}`);
    return;
  }
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, {
    channel_id: channelId
  }).catch(console.error);
  if (currentPlaylist) {
    return currentPlaylist.songs;
  } else {
    return [];
  }
};

const compareVotes = (firstSong, secondSong) => {
  return firstSong.priority - secondSong.priority;
};

export const updateSongVote = async ({ channelId, songInfo, pusher }) => {
  if (!channelId || !songInfo) {
    console.log(
      `Details were missing: channelId=${channelId} spotifySongItem=${JSON.stringify(
        songInfo
      )}`
    );
    return;
  }
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, {
    channel_id: channelId
  }).catch(console.error);
  if (!currentPlaylist) {
    console.log(`Playlist ${channelId} doesn't exists!`);
    return;
  }
  const currentSong = currentPlaylist.songs?.filter(
    (song) => song.songByArtist === songInfo.songByArtist
  )?.[0];
  currentSong.priority = (currentSong.priority || 1000) + songInfo?.priority;

  const otherSongs = currentPlaylist.songs?.filter(
    (song) => song.songByArtist !== songInfo.songByArtist
  );
  const songs = [...otherSongs, currentSong].sort(compareVotes);
  currentPlaylist.songs = songs;

  await putItem(TABLES.MESIBOT_VOTES, currentPlaylist);
  // const mappedSongsForUI = await mapSongs(songs);
  pusher.trigger(
    channelId,
    songInfo?.priority > 0 ? spotifyEvents.LIKE : spotifyEvents.DISLIKE,
    currentSong
  );
  console.log(`update songs ${currentPlaylist} to ${channelId} `);
};
