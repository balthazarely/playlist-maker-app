import React from "react";

export const PageHeader = ({ song }) => {
  console.log(song);
  return (
    <div className="w-full font-bold text-4xl mb-12">
      <div className="font-base text-xs uppercase mb-2 tracking-wider text-gray-400">
        Songs similar to
      </div>

      {song && (
        <div className="text-primary-content lg:text-4xl md:text-3xl text-2xl">
          {song.name}
          {song.artists.map((artist, i) => (
            <span> - {artist.name} </span>
          ))}
        </div>
      )}
    </div>
  );
};
