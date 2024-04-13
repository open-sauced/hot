import { useLocation } from "react-router-dom";
import locationsHash from "../lib/locationsHash";
import ListRepositories from "./ListRepositories";
import { useHotList } from "../hooks/useHotList";
import camelCaseToTitleCase from "../lib/camelCaseToTitleCase";

export enum RepoOrderByEnum {
  popular = "stars",
  recent = "created_at",
  discussed = "issues",
}

const RepoListWrap = (): JSX.Element => {
  const location = useLocation();

  const activeLink = (locationsHash[location.pathname] ?? "Trending") as keyof typeof RepoOrderByEnum;

  const { data } = useHotList();

  return (
    <ListRepositories
      activeLink={activeLink}
      fetchedData={data as DbRepo[]}
      title={`${camelCaseToTitleCase(activeLink)} Repositories`}
    />
  );
};

export default RepoListWrap;
