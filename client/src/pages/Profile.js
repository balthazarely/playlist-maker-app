import { useState, useEffect, useContext } from "react";
import { catchErrors } from "../utils";
import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getTopArtists,
  searchForArtist,
} from "../spotify";
import { SearchInput } from "../components/elements/inputs/SearchInput";
import { PageWrapper } from "../components/wrappers/PageWrapper";
import GlobalContext from "../context/appContext";
import { AnimatePresence, motion } from "framer-motion/dist/es/index";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const gContext = useContext(GlobalContext);

  const setUserInput = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      gContext.logInUser(data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtist = await getTopArtists();
      setTopArtists(userTopArtist.data);
    };

    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults(null);
      return;
    }

    const callSearchService = async () => {
      if (searchQuery.length > 2) {
        const { tracks } = await searchForArtist(searchQuery);
        setSearchResults(tracks);
        console.log(tracks);
      }
    };
    let debouncer = setTimeout(() => {
      setLoading(true);
      callSearchService();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 400);
    return () => {
      clearTimeout(debouncer);
    };
  }, [searchQuery]);

  return (
    <div className="">
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          // className="fixed top-0 w-full h-screen bg-base-200 bg-opacity-90 "
        >
          <PageWrapper>
            <SearchInput
              setUserInput={setUserInput}
              searchQuery={searchQuery}
              searchResults={searchResults}
              loading={loading}
            />
          </PageWrapper>
        </motion.div>
      )}
      {/* <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img
                  className="header__img"
                  src={profile.images[0].url}
                  alt="Avatar"
                />
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>
                      {playlists.total} Playlist
                      {playlists.total !== 1 ? "s" : ""}
                    </span>
                  )}
                  <span>
                    {profile.followers.total} Follower
                    {profile.followers.total !== 1 ? "s" : ""}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader> */}
      {/* <div>
            {topArtists && (
              <main>
                <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
              </main>
            )}
          </div> */}
    </div>
  );
};

export default Profile;