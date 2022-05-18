import Footer  from './components/Footer';
import PrimaryNav from './components/PrimaryNav';
import PostsWrap from './components/PostsWrap';
import { initiatePostHog } from './lib/analytics';

const App = (): JSX.Element => {
  initiatePostHog();

  return (
    <div className="App">
      <PrimaryNav/>
      <PostsWrap/>
      <Footer/>
    </div>
  )
}

export default App
