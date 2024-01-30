import React from "react";

export const SyllabusCard = ({ weekData, index }) => {
  return (
    <>
      <li key={index}>
        {/* <article>
          <div
            rel="noopener noreferrer"
            className="grid p-4 overflow-hidden md:grid-cols-5 rounded-xl lg:p-6 xl:grid-cols-12 hover:dark:bg-gray-900"
          >
            <h3 className="mb-1 ml-8 font-semibold md:col-start-2 md:col-span-4 md:ml-0 xl:col-start-3 xl:col-span-9">
              {weekData.topic}
            </h3>
            <time
              dateTime=""
              className="row-start-1 mb-1 md:col-start-1 xl:col-span-2 dark:text-gray-400"
            >
              Week {weekData.week}
            </time>
            <p className="ml-8 md:col-start-2 md:col-span-4 xl:col-start-3 xl:col-span-9 md:ml-0 dark:text-gray-300">
              {weekData.content}
            </p>
          </div>
        </article> */}
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
