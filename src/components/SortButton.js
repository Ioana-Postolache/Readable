import React from "react";

const SortButton = props => {
  const { sorted, name, onClick, check } = props;
  return (
    <button
      className={sorted === check ? "ui primary button" : "ui button"}
      name={name}
      onClick={onClick}
    >
      Order by vote score
    </button>
  );
};

export default SortButton;
