import Footer  from './components/Footer';
import PrimaryNav from './components/PrimaryNav';
import PostsWrap from './components/PostsWrap';
import { initiatePostHog } from './lib/analytics';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RepoSubmission from './components/RepoSubmission';
import GradBackground from './components/GradBackground';

const App = (): JSX.Element => {
  initiatePostHog();
  const [textToSearch, setTextToSearch ] = useState<string>("")

  return (
    <BrowserRouter>
      <div className="App overflow-hidden">
        <GradBackground>
          <PrimaryNav/>
        </GradBackground>
        <RepoSubmission/>
        <PostsWrap textToSearch={textToSearch} />
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
