import { FC, useCallback, useContext } from "react";
import { css } from "@emotion/react";

import { AppContext } from "@/context/AppContext";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;

  img {
    height: 20vh;
  }

  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

const LogIn: FC = () => {
  const handleLogIn = useCallback(() => {
    const clientId = "206baa0932464de1a4a6852026f37f1a";

    const redirectUrl = "http://localhost:3000/";

    const apiUrl = "https://accounts.spotify.com/authorize";

    const scope = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " ",
    )}&response_type=token&show_dialog=true`;
  }, []);
  return (
    <div css={container}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleLogIn}> Connect Spotify</button>
    </div>
  );
};

export default LogIn;
