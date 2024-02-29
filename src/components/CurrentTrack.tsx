import { FC, useContext, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import {
  AppContext,
  PlayingTrack,
  SelectedPlaylistTrack,
} from "@/context/AppContext";
import axios from "axios";

const container = css``;

const trackContainer = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const trackInfo = css`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  h4 {
    color: white;
  }
  h6 {
    color: #b3b3b3;
  }
`;
const trackImage = css``;

const CurrentTrack: FC = () => {
  const {
    state: { token, playing },
    dispatch,
  } = useContext(AppContext);
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      );

      if (!data) return;

      const { item } = data;

      const currentlyPlaying: PlayingTrack = {
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist: any) => artist.name).join(", "),
        image: item.album.images[2].url,
      };

      dispatch({ type: "set_Playing", playing: currentlyPlaying });
    };

    getUserInfo();
  }, []);
  return (
    <div css={container}>
      {playing && (
        <div css={trackContainer}>
          <div css={trackImage}>
            <img src={playing.image} alt="Currently Playing track"></img>
          </div>
          <div css={trackInfo}>
            <h4>{playing.name}</h4>
            <h6>{playing.artists}</h6>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentTrack;
