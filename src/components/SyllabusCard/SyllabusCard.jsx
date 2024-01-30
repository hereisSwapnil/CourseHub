import React from "react";

export const SyllabusCard = ({ weekData, index }) => {
  return (
    <>
      <li key={index} className="cursor-pointer">
        <details className="grid overflow-hidden md:grid-cols-5 rounded-xl lg:p-2 border mb-5 xl:grid-cols-12 hover:dark:bg-gray-900">
          <summary className="px-4 py-6 focus:outline-none focus-visible:ri">
            <b>Week {weekData.week} :</b> {weekData.topic}
          </summary>
          <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-400">
            {weekData.content}
          </p>
        </details>
      </li>
    </>
  );
};
