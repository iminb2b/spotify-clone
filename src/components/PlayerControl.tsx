import { FC, useContext, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { AppContext, PlayingTrack } from "@/context/AppContext";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";

const container = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
`;

const shuffle = css`
  font-size: 2rem;
`;
const previous = css`
  ${shuffle}
`;
const state = css`
  svg {
    color: white;
  }
`;
const next = css`
  ${shuffle}
`;
const repeat = css`
  ${shuffle}
`;

const PlayerControl: FC = () => {
  const {
    state: { token, playerState },
    dispatch,
  } = useContext(AppContext);
  const changeTrack = async ({ type }: { type: "previous" | "next" }) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },
    );

    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },
    );

    if (!data) {
      dispatch({ type: "set_Playing", playing: null });
    }

    const { item } = data;

    const currentlyPlaying: PlayingTrack = {
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist: any) => artist.name).join(", "),
      image: item.album.images[2].url,
    };

    dispatch({ type: "set_Playing", playing: currentlyPlaying });
  };

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/player/${state}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      },
    );

    dispatch({ type: "set_PlayerState", playerState: !playerState });
  };
  return (
    <div css={container}>
      <div css={shuffle}>
        <BsShuffle />
      </div>
      <div css={previous}>
        <CgPlayTrackPrev onClick={() => changeTrack({ type: "previous" })} />
      </div>
      <div css={state}>
        {playerState ? (
          <BsFillPauseCircleFill onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div css={next}>
        <CgPlayTrackNext onClick={() => changeTrack({ type: "next" })} />
      </div>
      <div css={repeat}>
        <FiRepeat />
      </div>
    </div>
  );
};

export default PlayerControl;
