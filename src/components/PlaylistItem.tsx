import { FC, useCallback, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import { AppContext } from "@/context/AppContext";
const container = css`
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: white;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: #b3b3b3;
    cursor: pointer;
  }
`;

const PlaylistItem: FC<{ id: string; name: string }> = ({ name, id }) => {
  const { dispatch } = useContext(AppContext);

  const onPlaylistClick = useCallback(() => {
    dispatch({ type: "set_SelectedPlaylistId", selectedPlaylistId: id });
  }, []);

  return (
    <li css={container}>
      <button onClick={onPlaylistClick}>{name}</button>
    </li>
  );
};

export default PlaylistItem;
