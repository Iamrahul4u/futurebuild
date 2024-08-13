import React from "react";

const ComingSoon = async () => {
  return (
    <div className="flex h-full w-full flex-col justify-center overflow-y-scroll">
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <h1 className="text-9xl dark:text-white">Coming Soon</h1>
        <p className="text-2xl dark:text-white">
          This Page is Under Development! See you Soon 😉
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
