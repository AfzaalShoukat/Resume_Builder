// components/StepProgress.js
import React from "react";

const StepProgress = ({ progress }) => {
  return (
    <div className="relative pt-1 px-5">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
            Step {progress === 0 ? 1 : 2} of 2
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold inline-block text-purple-600">
            {progress}%
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
        ></div>
      </div>
    </div>
  );
};

export default StepProgress;