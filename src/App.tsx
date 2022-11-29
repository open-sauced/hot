import Footer from "./components/Footer";
import PrimaryNav from "./components/PrimaryNav";
import RepoListWrap from "./components/RepoListWrap";
import { initiatePostHog } from "./lib/analytics";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import GradBackground from "./components/GradBackground";
import Hero from "./components/Hero";
import apiFetcher from "./hooks/useSWR";

import getAppVersion from "./lib/appVersion";
import VotedRepoListWrap from "./components/VotedRepoListWrap";
import RecentRepoListWrap from "./components/RecentRepoListWrap";
import SecondaryNav from "./components/SecondaryNav";
import HotRepositories from "./components/HotRepositories";

console.log(
  `%c
 ██████╗ ██████╗ ███████╗███╗   ██╗    ███████╗ █████╗ ██╗   ██╗ ██████╗███████╗██████╗
██╔═══██╗██╔══██╗██╔════╝████╗  ██║    ██╔════╝██╔══██╗██║   ██║██╔════╝██╔════╝██╔══██╗
██║   ██║██████╔╝█████╗  ██╔██╗ ██║    ███████╗███████║██║   ██║██║     █████╗  ██║  ██║
██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║    ╚════██║██╔══██║██║   ██║██║     ██╔══╝  ██║  ██║
╚██████╔╝██║     ███████╗██║ ╚████║    ███████║██║  ██║╚██████╔╝╚██████╗███████╗██████╔╝
 ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝╚══════╝╚═════╝%c v${getAppVersion()}`,
  "color:#f6d82b",
  "color:green;font-weight:bold",
);

const App = (): JSX.Element => {
  initiatePostHog();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: apiFetcher,
      }}
    >
      <Toaster position="top-right" />

      <BrowserRouter>
        <div className="App overflow-hidden">
          <GradBackground>
            <PrimaryNav />

            <Hero />
          </GradBackground>

          <div className="bg-darkestGrey">
            <SecondaryNav />

            <HotRepositories />

            <Routes>
              <Route
                element={<VotedRepoListWrap />}
                path="myVotes"
              />

              <Route
                element={<RecentRepoListWrap />}
                path="/"
              />

              <Route
                element={<RecentRepoListWrap />}
                path="recent"
              />

              <Route
                element={<RepoListWrap />}
                path="*"
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </SWRConfig>
  );
};

export default App;
