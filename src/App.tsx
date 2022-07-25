import Footer from "./components/Footer";
import PrimaryNav from "./components/PrimaryNav";
import PostsWrap from "./components/PostsWrap";
import { initiatePostHog } from "./lib/analytics";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import RepoSubmission from "./components/RepoSubmission";
import GradBackground from "./components/GradBackground";
import Hero from "./components/Hero";
import useSupabaseAuth from "./hooks/useSupabaseAuth";

const App = (): JSX.Element => {
  initiatePostHog();
  const { user } = useSupabaseAuth();
  const [textToSearch] = useState("");

  return (
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
  );
};

export default App;
