import { FC, useContext, useEffect, useMemo } from "react";
import { css } from "@emotion/react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";

const container = css`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;

const Volume: FC = () => {
  const {
    state: { token },
  } = useContext(AppContext);

  const setVolume = async (e: any) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
    );
  };
  return (
    <div css={container}>
      <input type="range" onMouseUp={(e) => setVolume(e)} min={0} max={100} />
    </div>
  );
};

export default Volume;
