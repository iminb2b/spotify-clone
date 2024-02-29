import PageContainer from "@/components/PageContent";
import { NextPage } from "next";
import PageMeta from "@/components/PageMeta";
import LogIn from "@/components/LogIn";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import Spotify from "@/components/Spotify";

const HomePage: NextPage = () => {
  const {
    state: { token },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];

      dispatch({ type: "set_Token", token });
    }
  }, []);

  return (
    <PageContainer>
      <PageMeta title="Min - Home Page" description={"Nhung Nguyen"} />
      {token ? <Spotify /> : <LogIn />}
    </PageContainer>
  );
};

export default HomePage;
