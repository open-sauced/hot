import React, {useState, useEffect} from "react";
import getAppVersion from "../lib/appVersion";
import humanizeDuration from "humanize-duration";
import githubAPI from "../lib/githubAPI";
import classes from '../styles/AdminStatusBar.module.css';

declare interface TimingObject {
  loadTime: number;
  renderTime: number;
}

const humanizer = humanizeDuration.humanizer({
  language: "shortEn",
  maxDecimalPoints: 2,
  spacer: "",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    }
  }
});

declare interface LeftSideProps {
  deployment: string;
}

function LeftSide({deployment}: LeftSideProps) {
  return (
    <div>
      <ul>
        <li>
          <span>🌵</span>{deployment}
        </li>
        <li className={classes.tabletView}>
          <a href={`https://github.com/open-sauced/open-sauced/releases/tag/v${getAppVersion()}`} rel="noreferrer" target="_blank">
            <span>📦</span>v{getAppVersion()}
          </a>
        </li>
        <li className={classes['no-well']}>
          <a href={`https://github.com/facebook/react/releases/tag/v${React.version}`} rel="noreferrer" target="_blank">
            <span>⚛️</span> <b>React</b> v{React.version}
          </a>
        </li>
      </ul>
    </div>
  );
}

declare interface RightSideProps {
  timing: TimingObject;
  repoCount: number | string;
}

function RightSide({timing, repoCount}: RightSideProps) {
  return (
    <div>
      <ul>
        <li>
          <span>🕒</span>{humanizer(timing.renderTime)} <span className={classes.helper}>render</span>
        </li>
        <li>
          <span>🕒</span>{humanizer(timing.loadTime)} <span className={classes.helper}>load</span>
        </li>
        <li className={classes.tabletView}>
          <a href="https://github.com/search?o=desc&q=open-sauced-goals&s=updated&type=Repositories" target="_blank" rel="noreferrer">
            <span>😍</span>Users: {repoCount}
          </a>
        </li>
      </ul>
    </div>
  );
}

function AdminStatsBar() {
  const [timing, setTiming] = useState<TimingObject>({} as TimingObject);
  const [deployment, setDeployment] = useState("⌛");
  const [repoCount, setRepoCount] = useState("⌛");

  const getDeployment = async () => {
    // const deployment = await githubAPI.getDeploymentEnvironment();
    // if(deployment) setDeployment(deployment.environments[0].name);
    const { MODE } = import.meta.env
    console.log(MODE)
    setDeployment(MODE)
  };

  const getRepoCount = async () => {
    const repoCount = await githubAPI.getOpensaucedGoalsReposCount();
    setRepoCount(`${repoCount}`);
  }

  const getTiming = () => {
    const timingAPI = window.performance.timing;
    const loadTime = timingAPI.loadEventEnd - timingAPI.navigationStart;
    const renderTime = timingAPI.domComplete - timingAPI.domLoading;
    // const timingAPI = window.performance.getEntriesByType("navigation")[0];
    // const loadTime = timingAPI.duration;
    // const renderTime = timingAPI.domComplete;
    // console.log("all timing", window.performance.getEntriesByType("navigation"));
    console.log("timing", timingAPI);
    console.log("loadTime", loadTime);
    console.log("renderTime", renderTime);
    setTiming({
      loadTime,
      renderTime
    });
  };

  useEffect(() => {
    getTiming();
    getDeployment();
    getRepoCount();

  }, []);

  return (
    <nav className={classes.nav}>
      <LeftSide
        deployment={deployment}
      />
      <RightSide
        timing={timing}
        repoCount={repoCount}
      />
    </nav>
  );
}

export default AdminStatsBar;