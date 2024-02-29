import { ReactNode, createContext, useReducer } from "react";
export type SelectedPlaylistTrack = {
  id: string;
  name: string;
  artists: string;
  image: string;
  duration: string;
  album: string;
  context_uri: string;
  track_number: string;
};
export type SelectedPlaylist = {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: Array<SelectedPlaylistTrack>;
};

export type PlayingTrack = {
  id: string;
  name: string;
  image: string;
  artists: string;
};

export type AppState = {
  token: string | null;
  playlists: Array<{ name: string; id: string }>;
  userInfo: { userId: string; username: string } | null;
  selectedPlaylistId: string;
  selectedPlaylist: SelectedPlaylist | null;
  playing: PlayingTrack | null;
  playerState: boolean;
};

type AppAction =
  | {
      type: "set_Token";
      token: string;
    }
  | {
      type: "set_Playlist";
      playlists: Array<{ name: string; id: string }>;
    }
  | {
      type: "set_Playing";
      playing: PlayingTrack | null;
    }
  | {
      type: "set_PlayerState";
      playerState: boolean;
    }
  | {
      type: "set_UserInfo";
      userInfo: { userId: string; username: string };
    }
  | {
      type: "set_SelectedPlaylistId";
      selectedPlaylistId: string;
    }
  | {
      type: "set_SelectedPlaylist";
      selectedPlaylist: SelectedPlaylist;
    };

const appReducer = (state: AppState, action: AppAction) => {
  const { type } = action;
  switch (type) {
    case "set_Token":
      return {
        ...state,
        token: action.token,
      };
    case "set_Playlist":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "set_Playing":
      return {
        ...state,
        playing: action.playing,
      };
    case "set_PlayerState":
      return {
        ...state,
        playerState: action.playerState,
      };
    case "set_UserInfo":
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case "set_SelectedPlaylistId":
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case "set_SelectedPlaylist":
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "",
    selectedPlaylist: null,
    playing: null,
    playerState: false,
  },
  dispatch: () => null,
});

export const AppProvider: React.FC<{
  children: ReactNode;
  initialState: AppState;
}> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
