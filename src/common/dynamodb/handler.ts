import { getItem, patchItem, putItem, TABLES } from './dynamodb-client';

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
      songs: [songInfo],
      session: {}
    };
  } else {
    if(!currentPlaylist.songs.include(songInfo)){
      const songs = [...currentPlaylist?.songs, songInfo];
      payload = {
        channel_id: channelId,
        songs,
        session: {}
      };
    } else {
      return
    }
  }
  await putItem(TABLES.MESIBOT_VOTES, payload);
  console.log(`add songs ${payload} to ${channelId} `);
};

const compareVotes = (firstSong, secondSong) => {
  return firstSong.priority - secondSong.priority;
};

export const updateSongVote = async ({ channelId, songInfo }) => {
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
  currentSong.priority = (currentSong.priority || 0) + songInfo?.priority;

  const otherSongs = currentPlaylist.songs?.filter(
    (song) => song.songByArtist !== songInfo.songByArtist
  );
  const songs = [...otherSongs, currentSong].sort(compareVotes);
  currentPlaylist.songs = songs;

  await putItem(TABLES.MESIBOT_VOTES, currentPlaylist);
  console.log(`update songs ${currentPlaylist} to ${channelId} `);
};
