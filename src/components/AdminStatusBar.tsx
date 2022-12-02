import React, { useState, useEffect } from "react";
import getAppVersion from "../lib/appVersion";
import humanizeDuration from "humanize-duration";
import { useRepositoriesList } from "../hooks/useRepositoriesList";

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
    },
  },
});

declare interface LeftSideProps {
  deployment: string;
}

const LeftSide = ({ deployment }: LeftSideProps) => (
  <div>
    <ul className="list-none inline-flex pl-2.5">
      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md hidden md:block">
        <span className="mr-1">🌵</span>

        {deployment}
      </li>

      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md">
        <a
          className="align-middle no-underline text-white"
          href={`https://github.com/open-sauced/open-sauced/releases/tag/v${getAppVersion()}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="mr-1">📦</span>

          v
          {getAppVersion()}
        </a>
      </li>

      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md bg-transparent font-normal hidden md:block">
        <a
          className="align-middle no-underline text-white"
          href={`https://github.com/facebook/react/releases/tag/v${React.version}`}
          rel="noreferrer"
          target="_blank"
        >
          <span className="mr-1">⚛️</span>

          {" "}

          <b>React</b>

          {" "}
          v

          {React.version}
        </a>
      </li>
    </ul>
  </div>
);

declare interface RightSideProps {
  timing: TimingObject;
  repoCount: number | string;
}

const RightSide = ({ timing, repoCount }: RightSideProps) => (
  <div>
    <ul className="list-none inline-flex pl-2.5">
      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md hidden md:block">
        <span className="mr-1">🕒</span>

        {humanizer(timing.renderTime)}

        {" "}

        <span className="mr-1 md:m-0 text-[#8b8b8b]">render</span>
      </li>

      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md hidden md:block">
        <span className="mr-1">🕒</span>

        {humanizer(timing.loadTime)}

        {" "}

        <span className="mr-1 md:m-0 text-[#8b8b8b]">load</span>
      </li>

      <li className="text-base mr-4 py-[2px] px-[7px] bg-[#2C3137] rounded-md">
        <a
          className="align-middle no-underline text-white"
          href="https://github.com/search?o=desc&q=open-sauced-goals&s=updated&type=Repositories"
          rel="noreferrer"
          target="_blank"
        >
          <span className="mr-1">😍</span>

          Users:
          {` ${repoCount}`}
        </a>
      </li>
    </ul>
  </div>
);

const AdminStatsBar = () => {
  const [timing, setTiming] = useState<TimingObject>({} as TimingObject);
  const [deployment, setDeployment] = useState("⌛");
  const [repoCount, setRepoCount] = useState(0);
  const { meta, isError } = useRepositoriesList("stars", 1);

  const getDeployment = () => {
    const { MODE } = import.meta.env;

    setDeployment(MODE);
  };

  const getRepoCount = () => {
    if (isError) {
      setRepoCount(0);
    } else {
      setRepoCount(meta.itemCount || 0);
    }
  };

  const getTiming = () => {
    const timingAPI = window.performance.timing;
    const loadTime = timingAPI.loadEventEnd - timingAPI.navigationStart;
    const renderTime = timingAPI.domComplete - timingAPI.domLoading;


    /*
     * const timingAPI = window.performance.getEntriesByType("navigation")[0];
     * const loadTime = timingAPI.duration;
     * const renderTime = timingAPI.domComplete;
     * console.log("all timing", window.performance.getEntriesByType("navigation"));
     */

    setTiming({
      loadTime,
      renderTime,
    });
  };

  useEffect(() => {
    getTiming();
    getDeployment();
  }, []);

  useEffect(() => {
    getRepoCount();
  }, [meta]);

  return (
    <nav className="flex justify-between text-white bg-black text-base font-bold py-4">
      <LeftSide
        deployment={deployment}
      />

      <RightSide
        repoCount={repoCount}
        timing={timing}
      />
    </nav>
  );
};

export default AdminStatsBar;
