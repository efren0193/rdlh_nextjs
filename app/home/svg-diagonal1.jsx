import * as React from "react";

function SvgDiagonal1(props) {
  return (
    <svg viewBox="0 0 1440 100" {...props}>
      <path fill="currentColor" d="M0 0l1440 100H0z" transform="scale(1, -1) translate(0, -100)" />
    </svg>
  );
}

export default SvgDiagonal1;