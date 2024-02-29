import { FC, useCallback, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import PlaylistItem from "./PlaylistItem";
const container = css`
  height: 100%;

  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }

    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: white;
      }
    }
  }
`;

const Playlist: FC = () => {
  const {
    state: { token, playlists, selectedPlaylistId },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      );

      const { items } = response.data;

      const playlists = items.map(
        ({ name, id }: { name: string; id: string }) => ({ name, id }),
      );

      dispatch({ type: "set_Playlist", playlists });

      dispatch({
        type: "set_SelectedPlaylistId",
        selectedPlaylistId: playlists[0].id,
      });
    };

    getPlaylistData();
  }, []);

  return (
    <div css={container}>
      <ul>
        {playlists.map((item) => (
          <PlaylistItem key={item.id} id={item.id} name={item.name} />
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
