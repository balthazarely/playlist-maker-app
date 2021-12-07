import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../../context/appContext";
import { listNamesFunction, millisToMinutesAndSeconds } from "../../../utils";
import { HiArrowRight } from "react-icons/hi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export const PlaylistResultsCard = ({ song }) => {
  const history = useHistory();
  const gContext = useContext(GlobalContext);

  const navigateToPlaylistPage = (songid) => {
    // gContext.isLoading(true);
    history.push(`/playlist/${songid}`);
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-0 cursor-pointer group border-2 hover:border-gray-600 border-transparent rounded-lg p-2  ">
        <div className="col-span-4 flex">
          <img
            className=" h-12 w-12 rounded-md  "
            src={song.album.images[2].url}
          />
          <div className="ml-4 flex justify-center flex-col truncate overflow-hidden ">
            <div className="truncate font-bold md:text-base text-sm overflow-ellipsis overflow-hidden  transition-all duration-200  ">
              {song.name}
            </div>
            <div className="truncate font-base text-xs text-gray-300 mt-1">
              {listNamesFunction(song.artists)}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center justify-end   pr-2">
          <button class="btn btn-primary btn-ghost btn-xs  font-base   ">
            <div class="dropdown dropdown-end">
              <HiOutlineDotsHorizontal tabindex="0" className=" w-6 h-6" />
              <ul
                tabindex="0"
                class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>
                    <button
                      className="text-md font-bold uppercase  tracking-wide"
                      onClick={() => navigateToPlaylistPage(song.id)}
                    >
                      Find Similar Songs
                    </button>
                  </a>
                </li>
                <li>
                  <a target="BLANK" href={song.external_urls.spotify}>
                    <button className="text-md font-bold uppercase  tracking-wide">
                      Open in Spotify
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
      {/* <div className="group flex rounded-lg duration-200 transition-all  shadow-2xl flex-row justify-between text-sm bg-base-100 p-2 cursor-pointer hover:bg-base-100 ">
        <div className="flex border-yellow-400 border-2 w-3/4 ">
          <img
            className=" h-12 w-12 rounded-md"
            src={song.album.images[2].url}
          />
          <div className="ml-4 flex justify-center flex-col truncate overflow-hidden ">
            <div className="truncate font-bold  overflow-ellipsis overflow-hidden">
              {song.name}
            </div>
            <div className="truncate font-base text-xs text-gray-300 mt-1">
              {song.artists.map((artist, i) => (
                <>
                  <span>{artist.name} </span>
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-1/4 border-yellow-400 border-2 items-center mr-2 "> */}
      {/* <div className="flex items-center text-xs">
              {millisToMinutesAndSeconds(song.duration_ms)}
            </div> */}
      {/* <button
            onClick={() => navigateToPlaylistPage(song.id)}
            class="btn btn-info btn-outline btn-xs  font-base opacity-0 group-hover:opacity-100"
          >
            Find Similar
          </button>
        </div>
      </div> */}
    </>
  );
};
