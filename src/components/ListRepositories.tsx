import { BsFillCalendar2Fill } from "react-icons/bs";
import RepoList from "./RepoList";
import Skeleton from "react-loading-skeleton";

export declare interface ListRepositoriesProps {
  activeLink: string | null;
  fetchedData: DbRepo[];
  title: string;
}

const ListRepositories = ({ activeLink, fetchedData, title }: ListRepositoriesProps): JSX.Element => {
  if (!fetchedData.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 mt-10">
        <div className="flex flex-col gap-y-5 overflow-hidden mb-12">
          {Array.from(Array(25).keys()).map((item) => (
            <div key={item} className="p-4 border rounded-2xl bg-white w-full space-y-1 relative">
              <Skeleton enableAnimation count={4} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-1 pt-10">
      <div className="flex flex-col gap-y-5 mb-12">
        <div className="flex items-center gap-x-2.5">
          <BsFillCalendar2Fill className="w-8 h-8 text-white" />

          {activeLink && <h1 className="text-2xl text-white font-semibold">{title}</h1>}
        </div>

        {fetchedData.map((item, i) => (
          <RepoList key={`${item.repo_name}_${i}`} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ListRepositories;
