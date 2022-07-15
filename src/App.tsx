import Footer  from './components/Footer';
import PrimaryNav from './components/PrimaryNav';
import PostsWrap from './components/PostsWrap';
import { initiatePostHog } from './lib/analytics';
import { useState } from 'react';

const App = (): JSX.Element => {
  initiatePostHog();
  const [textToSearch, setTextToSearch ] = useState<string>("")

  return (
    <div className="App">
      <PrimaryNav setTextToSearch={setTextToSearch} />
      <PostsWrap textToSearch={textToSearch} />
      <Footer/>
    </div>
  )
}

export default App
