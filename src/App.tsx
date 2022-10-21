<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

=======
>>>>>>> 2fc96d4739a7d3c4b6b9566aef1a8760fc48506b
import Footer from "./components/Footer";
import PrimaryNav from "./components/PrimaryNav";
import RepoWrap from "./components/RepoWrap";
import { initiatePostHog } from "./lib/analytics";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import GradBackground from "./components/GradBackground";
import Hero from "./components/Hero";
import apiFetcher from "./hooks/useSWR";

import getAppVersion from "./lib/appVersion";

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

<<<<<<< HEAD
  const localStorageProvider = () => {
    if (!import.meta.env.SSR) {
      // console.log("You are on the browser");

      /*
       * console.log(localStorage)
       * when initializing, we restore the data from `localStorage` into a map.
       */

      const appCache = localStorage.getItem("app-cache") ?? "[]";
      const JSONdata = JSON.parse(appCache);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const map = new Map(JSONdata);

      // before unloading the app, we write back all the data into `localStorage`.
      window.addEventListener("beforeunload", () => {
        const appCache = JSON.stringify(Array.from(map.entries()));

        localStorage.setItem("app-cache", appCache);
      });

      // we still use the map for write & read for performance.
      return map;
    }

    // console.log("You are on the server");

    // 👉️ can't use localStorage

    return (new Map);
  };

=======
>>>>>>> 2fc96d4739a7d3c4b6b9566aef1a8760fc48506b
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

          <RepoWrap />

          <Footer />
        </div>
      </BrowserRouter>
    </SWRConfig>
  );
};

export default App;
