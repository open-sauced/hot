import { useState } from "react";
import Footer from "./components/Footer";
import PrimaryNav from "./components/PrimaryNav";
import PostsWrap from "./components/PostsWrap";
import { initiatePostHog } from "./lib/analytics";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RepoSubmission from "./components/RepoSubmission";
import GradBackground from "./components/GradBackground";
import useSupabaseAuth from "./hooks/useSupabaseAuth";
import Hero from "./components/Hero";

const App = (): JSX.Element => {
  initiatePostHog();
  const { user } = useSupabaseAuth();
  const [textToSearch] = useState("");

  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <div className="App overflow-hidden">
          <GradBackground>
            {user && <RepoSubmission user={user} />}

            <PrimaryNav />

            <Hero />
          </GradBackground>

          <PostsWrap textToSearch={textToSearch} />

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
