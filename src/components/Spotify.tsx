import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { css } from "@emotion/react";
import Footer from "./Footer";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import Body from "./Body";
const container = css`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
`;

const spotifyBody = css`
  display: grid;
  grid-template-columns: 15vw 85vw;
  height: 100%;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: rgb(32, 87, 100);
`;
const body = css`
  height: 100%;
  width: 100%;
  overflow: auto;
`;
const bodyContent = css``;
const bodyFooter = css``;

const Spotify: FC = () => {
  const {
    state: { token, selectedPlaylistId },
    dispatch,
  } = useContext(AppContext);

  const bodyRef = useRef<HTMLDivElement>(null);

  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  const bodyScrolled = useCallback(() => {
    if (!bodyRef.current) return;

    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);

    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const userInfo = { userId: data.id, username: data.display_name };

      dispatch({ type: "set_UserInfo", userInfo });
    };

    getUserInfo();
  }, []);
  return (
    <div css={container}>
      <div css={spotifyBody}>
        <SideBar />
        <div css={body} ref={bodyRef} onScroll={bodyScrolled}>
          <NavBar navBackground={navBackground} />
          <div css={bodyContent}>
            {selectedPlaylistId && <Body headerBackground={headerBackground} />}
          </div>
        </div>
      </div>
      <div css={bodyFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default Spotify;
