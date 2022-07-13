import PostsWrap from './components/PostsWrap';
import { initiatePostHog } from './lib/analytics';
import RepoSubmission from './components/RepoSubmission';
import Nav from './components/Nav';

const App = (): JSX.Element => {
  initiatePostHog();

  return (
    <div className="App overflow-hidden">
      <Nav/>
      <RepoSubmission/>
      <PostsWrap/>
    </div>
  )
}

export default App
