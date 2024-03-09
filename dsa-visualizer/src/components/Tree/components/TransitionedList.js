import React from "react";

const TransitionedList = (props) => {
  return (
    <ul className="rounded-md flex justify-center items-center flex-wrap list-none">
      {props.list.map((listItem, index) => {
        return (
          <li
            key={`${listItem}${index}`}
            className="m-2 w-12 h-12 text-center flex justify-center items-center bg-purple-600 text-white rounded-xl"
          >
            {listItem}
          </li>
        );
      })}
    </ul>
  );
};

export default TransitionedList;
