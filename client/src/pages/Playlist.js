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
import { CreatePlaylistModal } from "../components/pageElements/CreatePlaylistModal";
import { MakePlaylistButton } from "../components/elements/buttons/MakePlaylistButton";
import { PageLoading } from "../components/pageElements/PageLoading";

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
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

  useEffect(() => {
    const fetchData = async () => {
      const { tracks } = await findRecommendedSongs(id);
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
    }, 2000);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <PageWrapper>
      {!gContext.loading ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2, when: "beforeChildren" }}
        >
          <PageHeader song={song} />
          <div className="w-full my-6 flex justify-between items-center">
            <MakePlaylistButton
              fakeLoading={fakeLoading}
              createPlaylistForUser={createPlaylistForUser}
            />
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
        </motion.div>
      ) : (
        <PageLoading />
      )}
      <div id="my-modal" class={`modal ${modalOpen && "modal-open"}`}>
        <CreatePlaylistModal closeModal={closeModal} modalOpen={modalOpen} />
      </div>
    </PageWrapper>
  );
};
