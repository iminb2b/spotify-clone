import { FC } from "react";
import { css } from "@emotion/react";
import CurrentTrack from "./CurrentTrack";
import PlayerControl from "./PlayerControl";
import Volume from "./Volume";

const container = css`
  background-color: #181818;
  height: 100%;
  width: 100%;
  border-top: 1px solid #282828;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Footer: FC = () => {
  return (
    <div css={container}>
      <CurrentTrack />
      <PlayerControl />
      <Volume />
    </div>
  );
};

export default Footer;
