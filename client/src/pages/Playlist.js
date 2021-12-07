import React, { useContext, Fragment } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { PageHeader } from "../components/pageElements/PageHeader";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import { PlaylistResultsCard } from "../components/elements/cards/PlaylistResultsCard";
import GlobalContext from "../context/appContext";
import {
  createPlaylist,
  findRecommendedSongs,
  getCurrentUserProfile,
  getSong,
} from "../spotify";
import { Listbox, Transition } from "@headlessui/react";
import { RiPlayListFill } from "react-icons/ri";

import { catchErrors } from "../utils";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";
import SearchOverlay from "../components/pageElements/SearchOverlay";
import PlayListOptionMenu from "../components/elements/menus/PlaylistOptionMenu";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { AdvancedSearch } from "../components/AdvancedSearch";
import { HiBadgeCheck } from "react-icons/hi";

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
  const [similarSongsUri, setSimilarSongsUri] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);

  const gContext = useContext(GlobalContext);

  useEffect(() => {
    gContext.isLoading(true);
    const fetchData = async () => {
      const data = await getSong(id);
      console.log(data);
      setSong(data);
    };
    catchErrors(fetchData());
  }, [id]);

  const playlistLimit = [
    { id: 1, name: "10", value: 10 },
    { id: 2, name: "25", value: 25 },
    { id: 3, name: "50", value: 50 },
  ];
  const [playlistLengthLimit, setPlaylistLengthLimit] = useState(
    playlistLimit[0]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { tracks } = await findRecommendedSongs(id);
      console.log(tracks);
      setSimilarSongs(tracks);
      setSimilarSongsUri(tracks.map((song) => song.uri));

      gContext.isLoading(false);
    };
    catchErrors(fetchData());
  }, [setSong, id]);

  const createPlaylistForUser = () => {
    setFakeLoading(true);
    setTimeout(() => {
      createPlaylist(song, similarSongsUri);
      setFakeLoading(false);
      setModalOpen(true);
    }, 1000);
  };

  return (
    <PageWrapper>
      {!gContext.loading ? (
        <>
          <PageHeader song={song} />
          <div className="w-full my-6 flex justify-between items-center">
            <button
              onClick={() => createPlaylistForUser()}
              class={`btn btn-primary btn-outline ${
                fakeLoading ? "loading" : ""
              }`}
            >
              <div className="flex flex-row items-center justify-center">
                {!fakeLoading && <RiPlayListFill className=" w-6 h-6 mr-2" />}
                Make Playlist
              </div>
            </button>
          </div>
          <div id="my-modal" class={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div class="modal-box flex flex-col justify-center items-center bg-base-300">
              {modalOpen && (
                <>
                  <motion.div
                    animate={{ scale: 1 }}
                    initial={{ scale: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.1,
                      type: "spring",
                      stiffness: 700,
                      damping: 20,
                    }}
                  >
                    <HiBadgeCheck className="h-12 w-12 text-primary" />
                  </motion.div>
                  <div className="font-bold text-3xl mt-1">Great success!</div>
                  <div className="text-lg font-base ">
                    Your new playlist can be found in your spotify app!
                  </div>
                  <div class="modal-action">
                    <button
                      onClick={() => setModalOpen(false)}
                      class="btn btn-primary"
                    >
                      close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

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
    </PageWrapper>
  );
};
