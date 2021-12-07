import React, { useContext } from "react";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import SearchOverlay from "../components/pageElements/SearchOverlay";
import GlobalContext from "../context/appContext";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";

export const MyMusic = () => {
  const gContext = useContext(GlobalContext);

  return <PageWrapper>My ARtists</PageWrapper>;
};
