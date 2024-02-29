import { FC, useContext, useMemo } from "react";
import { css } from "@emotion/react";
import { AppContext, SelectedPlaylistTrack } from "@/context/AppContext";
import axios from "axios";

const row = css`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const info = css`
  display: flex;
  flex-direction: column;
`;
const trackName = css``;
const col = css`
  display: flex;
  align-items: center;
  color: #dddcdc;
  img {
    height: 40px;
  }
`;
const colDetail = css`
  ${col};
  display: flex;
  gap: 1rem;
`;

const Track: FC<{ track: SelectedPlaylistTrack; index: number }> = ({
  track,
  index,
}) => {
  const {
    state: { token },
    dispatch,
  } = useContext(AppContext);

  const playTrack = async () => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: track.context_uri,
        offset: {
          position: parseInt(track.track_number) - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );
    if (response.status === 204) {
      const currentPlaying = {
        id: track.id,
        name: track.name,
        artists: track.artists,
        image: track.image,
      };
      dispatch({ type: "set_Playing", playing: currentPlaying });
      dispatch({ type: "set_PlayerState", playerState: true });
    } else {
      dispatch({ type: "set_PlayerState", playerState: true });
    }
  };

  const msToMinutesAndSeconds = useMemo(() => {
    const ms = parseInt(track.duration);
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);

    return minutes + ":" + (parseInt(seconds) < 10 ? "0" : "") + seconds;
  }, []);
  return (
    <div css={row} onClick={playTrack}>
      <div css={col}>
        <span>{index + 1}</span>
      </div>
      <div css={colDetail}>
        <img src={track.image} alt="track" />
        <div css={info}>
          <span css={trackName}>{track.name}</span>
          <span>{track.artists}</span>
        </div>
      </div>

      <div css={col}>
        <span>{track.album}</span>
      </div>
      <div css={col}>
        <span>{msToMinutesAndSeconds}</span>
      </div>
    </div>
  );
};

export default Track;
