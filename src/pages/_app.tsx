import ErrorPageContent from "@/components/ErrorPageContent";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { AppState, AppProvider } from "@/context/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  const initialContextValue: AppState = {
    token: null,
    playlists: [],
    userInfo: null,
    selectedPlaylistId: "",
    selectedPlaylist: null,
    playing: null,
    playerState: false,
  };

  if (pageProps.error) {
    return (
      <AppProvider initialState={initialContextValue}>
        <Layout>
          <ErrorPageContent />
        </Layout>
      </AppProvider>
    );
  }

  return (
    <AppProvider initialState={initialContextValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}
