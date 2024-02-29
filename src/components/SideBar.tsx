import { FC, useContext } from "react";
import { css } from "@emotion/react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlist from "./Playlist";
const container = css`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const topLinks = css`
  display: flex;
  flex-direction: column;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

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
const logo = css`
  text-align: center;
  margin: 1rem 0;

  img {
    max-inline-size: 80%;
    block-size: auto;
  }
`;

const SideBar: FC = () => {
  return (
    <div css={container}>
      <div css={topLinks}>
        <div css={logo}>
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="Spotify"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>

      <Playlist />
    </div>
  );
};

export default SideBar;
