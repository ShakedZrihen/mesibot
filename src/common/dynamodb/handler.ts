import { getItem, patchItem, putItem, TABLES } from './dynamodb-client';

const addSongToPlaylist = async ({ channelId, songInfo }, logger) => {
  if (!channelId || !songInfo) {
    logger.warn(`Details were missing: channelId=${channelId} spotifySongItem=${JSON.stringify(songInfo)}`);
    return;
  }
  let payload;
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, { channel_id: channelId }).catch(console.error);
  if (!currentPlaylist) {
    payload = {
      channel_id: channelId,
      songs: [songInfo],
      session: {}
    };
  } else {
    const songs = [...currentPlaylist?.songs, songInfo];
    payload = {
      channel_id: channelId,
      songs,
      session: {}
    };
  }
  await putItem(TABLES.MESIBOT_VOTES, payload);
  logger.info(`add songs ${payload} to ${channelId} `);
};

const compareVotes = (firstSong, secondSong) => {
  return firstSong.priority - secondSong.priority;
};

const updateSongVote = async ({ channelId, songInfo }, logger) => {
  if (!channelId || !songInfo) {
    logger.warn(`Details were missing: channelId=${channelId} spotifySongItem=${JSON.stringify(songInfo)}`);
    return;
  }
  const currentPlaylist = await getItem(TABLES.MESIBOT_VOTES, { channel_id: channelId }).catch(console.error);
  if (!currentPlaylist) {
    logger.error(`Playlist ${channelId} doesn't exists!`);
    return;
  }
  const currentSong = currentPlaylist.songs?.filter((song) => song.songByArtist === songInfo.songByArtist)?.[0];
  currentSong.priority = currentSong.priority + songInfo?.priority;

  const otherSongs = currentPlaylist.songs?.filter((song) => song.songByArtist !== songInfo.songByArtist);
  const songs = [...otherSongs, currentSong].sort(compareVotes);
  currentPlaylist.songs = songs;

  await putItem(TABLES.MESIBOT_VOTES, currentPlaylist);
  logger.info(`update songs ${currentPlaylist} to ${channelId} `);
};
