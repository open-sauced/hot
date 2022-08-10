import Footer from "./components/Footer";
import PrimaryNav from "./components/PrimaryNav";
import PostsWrap from "./components/PostsWrap";
import { initiatePostHog } from "./lib/analytics";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";
import RepoSubmission from "./components/RepoSubmission";
import GradBackground from "./components/GradBackground";
import useSupabaseAuth from "./hooks/useSupabaseAuth";
import Hero from "./components/Hero";
import apiFetcher from "./hooks/useSWR";

const App = (): JSX.Element => {
  const { user } = useSupabaseAuth();

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
            {user && <RepoSubmission user={user} />}

            <PrimaryNav />

            <Hero />
          </GradBackground>

          <PostsWrap />

          <Footer />
        </div>
      </BrowserRouter>
    </SWRConfig>
  );
};

export default App;
