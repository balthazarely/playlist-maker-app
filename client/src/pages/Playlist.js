import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PageHeader } from "../components/PageHeader";
import { PageWrapper } from "../components/PageWrapper";
import { PlaylistResultsCard } from "../components/PlaylistResultsCard";
import GlobalContext from "../context/appContext";
import { findRecommendedSongs, getSong } from "../spotify";
import { catchErrors } from "../utils";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";
import RSC from "react-scrollbars-custom";
import SearchOverlay from "../components/SearchOverlay";
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const Playlist = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [similarSongs, setSimilarSongs] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const gContext = useContext(GlobalContext);

  useEffect(() => {
    gContext.isLoading(true);

    const fetchData = async () => {
      const data = await getSong(id);
      setSong(data);
    };
    catchErrors(fetchData());
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const { tracks } = await findRecommendedSongs(id);
      setSimilarSongs(tracks);
      gContext.isLoading(false);
    };
    catchErrors(fetchData());
  }, [setSong, id]);

  return (
    <PageWrapper>
      {!gContext.loading ? (
        <>
          <PageHeader song={song} />
          {song && similarSongs && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className=" grid grid-cols-1 gap-2 w-full  "
            >
              {similarSongs.map((song, i) => (
                <motion.div variants={container} className="w-full  ">
                  <PlaylistResultsCard
                    key={i}
                    song={song}
                    variants={listItem}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-25 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-white">
            This may take a few seconds, please don't close this page.
          </p>
        </div>
      )}
      {/* {showSearchBar && (
        <div className="bg-base-300 fixed top-0 left-0 w-full h-full z-50 opacity-90 flex justify-center items-center">
          <SearchOverlay />
        </div>
      )} */}
      <AnimatePresence>
        {/* {gContext.showSearchOverlay ? <SearchOverlay /> : <></>} */}
        {gContext.showSearchOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 w-full h-screen bg-base-200 bg-opacity-90 "
          >
            <SearchOverlay />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};
