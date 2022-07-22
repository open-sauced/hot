import React, { useState, useEffect } from "react";
import LayoutToggle from "./LayoutToggle";
import Modal from "./Modal";
import SecondaryNav from "./SecondaryNav";
import GridDisplay from "./GridDisplay";
import ListDisplay from "./ListDisplay";
import { fetchRecommendations } from "../lib/supabase";
import useSupabaseAuth from "../hooks/useSupabaseAuth";
import locationsHash from "../lib/locationsHash";
import { useLocation, useSearchParams } from "react-router-dom";
import HotRepositories from "./HotRepositories";

interface PostWrapProps {
  textToSearch: string;
}

const parseLimitValue = (limit: string | null): number => {
  if (!limit) {
    return 25;
  }
  const value = parseInt(limit);
  if (isNaN(value) || value <= 0) {
    return 25;
  }
  if (value > 100) {
    return 125;
  }
  return value;
};

const PostsWrap = ({ textToSearch }: PostWrapProps): JSX.Element => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchedData, setFetchedData] = useState<DbRecomendation[]>([]);
  const { user } = useSupabaseAuth();
  const location = useLocation();

  const activeLink = locationsHash[location.pathname] || "popular";
  const limit = parseLimitValue(searchParams.get("limit"));

  const handleLoadingMore = () => {
    setSearchParams({ limit: String(limit + 25) });
  };

  useEffect(() => {
    fetchRecommendations(activeLink, limit, user, textToSearch).then((data) => {
      setFetchedData(data);
    });
  }, [activeLink, limit, textToSearch]);

  return (
    <div className="bg-darkestGrey">
      <Modal />
      <SecondaryNav activeLink={activeLink} user={user} />
      <HotRepositories user={user} />
      <LayoutToggle gridState={isGrid} setGridState={setIsGrid} />
      <div className="bg-darkestGrey py-6 w-full min-h-screen">
        {isGrid ? (
          <GridDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData}
          />
        ) : (
          <ListDisplay
            limit={limit}
            activeLink={activeLink}
            handleLoadingMore={handleLoadingMore}
            user={user}
            fetchedData={fetchedData}
          />
        )}
      </div>
    </div>
  );
};

export default PostsWrap;
