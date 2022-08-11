import { User } from "@supabase/supabase-js";
import PostGrid from "./PostGrid";

export declare interface GridDisplayProps {
  activeLink: string | null;
  limit: number;
  handleLoadingMore: () => void;
  fetchedData: DbRepo[];
  user?: User;
}

const GridDisplay = ({ activeLink, limit, handleLoadingMore, fetchedData, user }: GridDisplayProps): JSX.Element => (
  <div>
    <div className="container grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto auto-rows-fr">
      {fetchedData.map((item, i) => (
        <PostGrid
          key={`${item.full_name}_${i}`}
          data={item}
          user={user}
        />
      ))}

      {fetchedData.length > 0 && activeLink !== "myVotes" && limit <= 100 && (
        <button
          className="bg-grey hover:bg-lightGrey text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => handleLoadingMore()}
        >
          Load More
        </button>
      )}
    </div>
  </div>
);

export default GridDisplay;
