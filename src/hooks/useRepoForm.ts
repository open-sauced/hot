import { useEffect, useState } from "react";

const useRepoForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleFormOpen = (state: boolean) => setIsFormOpen(state);

  useEffect(() => {
    setIsFormOpen(isFormOpen);
  }, [isFormOpen]);

  console.log("useRepoForm -> ", isFormOpen);

  return {
    isFormOpen,
    handleFormOpen,
  };
};

export default useRepoForm;
