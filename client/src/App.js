import { useEffect, useState } from "react";
import { accessToken, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login, Profile } from "./pages";
import { Header } from "./components/Header";
import { Playlist } from "./pages/Playlist";
import "./app.css";
import { GlobalProvider } from "./context/appContext";
import { motion, AnimatePresence } from "framer-motion/dist/es/index";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
function App() {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);
    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className="App">
      <GlobalProvider>
        <Layout>
          {!token ? (
            <Login />
          ) : (
            <>
              <ScrollToTop />
              <Header profile={profile} />
              <Switch location={location} key={location.pathname}>
                <Route path="/playlist/:id" component={Playlist} />
                <Route path="/" component={Profile} />
              </Switch>
            </>
          )}
        </Layout>
      </GlobalProvider>
    </div>
  );
}

export default App;
