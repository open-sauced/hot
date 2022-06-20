import Footer  from './components/Footer';
import PrimaryNav from './components/PrimaryNav';
import PostsWrap from './components/PostsWrap';
import { initiatePostHog } from './lib/analytics';
import { useState } from 'react';
import RepoSubmission from './components/RepoSubmission';
import Header from './components/Nav';

const App = (): JSX.Element => {
  initiatePostHog();
  const [textToSearch, setTextToSearch ] = useState<string>("")

  return (
    <div className="App ">
      <Header/>
      <RepoSubmission/>
      <PrimaryNav setTextToSearch={setTextToSearch} />
      <PostsWrap textToSearch={textToSearch} />
      <Footer/>
    </div>
  )
}

export default App
