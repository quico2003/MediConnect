import { useState } from "react";

const useLoaded = () => {
  const [loaded, setLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);

  const startFetching = () => {
    setFetching(true);
  };

  const finishFetching = () => {
    !loaded && setLoaded(true);
    setFetching(false);
  };

  return {
    allLoaded: loaded && !fetching,
    loaded,
    fetching,
    startFetching,
    finishFetching,
  };
};

export default useLoaded;
