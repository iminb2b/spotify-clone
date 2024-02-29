import { FC, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { AiFillClockCircle } from "react-icons/ai";
import Track from "./Track";
const container = ({ headerBackground }: { headerBackground: boolean }) =>
  css`
    background-color: ${headerBackground ? "000000dc" : "none"};
  `;

const playlist = css`
  margin: 0 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const image = css`
  img {
    height: 15rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  }
`;
const details = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #e0dede;
`;
const type = css``;
const title = css`
  color: white;
  font-size: 4rem;
`;
const description = css``;
const list = css``;
const headerRow = ({ headerBackground }: { headerBackground: boolean }) => css`
  display: grid;
  grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
  color: #dddcdc;
  margin: 1rem 0 0 0;
  position: sticky;
  top: 15vh;
  padding: 1rem 3rem;
  transition: 0.3s ease-in-out;
  background-color: ${headerBackground ? "#000000dc" : "none"};
`;
const col = css``;
const tracks = css`
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
`;

const Body: FC<{ headerBackground: boolean }> = ({ headerBackground }) => {
  const {
    state: { token, selectedPlaylistId, selectedPlaylist },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    const getInitialPlaylistId = async () => {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(data);

      const selectedPlaylist = {
        id: data.id,
        name: data.name,
        description: data.description.startsWith("<a") ? "" : data.description,
        image: data.images[0].url,
        tracks: data.tracks.items.map(({ track }: { track: any }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist: any) => artist.name).join(","),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      dispatch({ type: "set_SelectedPlaylist", selectedPlaylist });
    };

    getInitialPlaylistId();
  }, []);

  return (
    <div css={container({ headerBackground })}>
      {selectedPlaylist && (
        <>
          <div css={playlist}>
            <div css={image}>
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>

            <div css={details}>
              <span css={type}>PLAYLIST</span>
              <h1 css={title}>{selectedPlaylist.name}</h1>
              <p css={description}>{selectedPlaylist.description}</p>
            </div>
          </div>

          <div css={list}>
            <div css={headerRow({ headerBackground })}>
              <div css={col}>
                <span>#</span>
              </div>
              <div css={col}>
                <span>TITLE</span>
              </div>
              <div css={col}>
                <span>ALBUM</span>
              </div>
              <div css={col}>
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div css={tracks}>
              {selectedPlaylist.tracks.map((track, index) => (
                <Track track={track} key={index} index={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
