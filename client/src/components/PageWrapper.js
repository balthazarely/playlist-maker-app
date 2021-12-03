import React from "react";

export const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col items-center container mx-auto max-w-2xl mt-10 ">
      {children}
    </div>
  );
};
