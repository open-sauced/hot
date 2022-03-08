import Footer  from './components/Footer';
import PrimaryNav from './components/PrimaryNav';
import PostsWrap from './components/PostsWrap';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <PrimaryNav/>
      <PostsWrap/>
      <Footer/>
    </div>
  )
}

export default App
