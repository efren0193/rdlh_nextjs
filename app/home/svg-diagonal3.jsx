import * as React from "react"

function SvgDiagonal3(props) {
  return (
    <svg viewBox="0 0 1440 100" {...props}>
      <path fill="currentColor" d="M0 0l1440 100H0z" transform="scale(1, -1) translate(0, -100)"/>
      <path fill="currentColor" d="M0 100L1440 0v100z" transform="scale(1, -1) translate(0, -100)"/>
    </svg>
  )
}

export default SvgDiagonal3