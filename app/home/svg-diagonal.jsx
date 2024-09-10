import * as React from "react"

function SvgDiagonal(props) {
  return (
    <svg viewBox="0 0 1440 99" {...props}>
      <defs>
        <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor"  />
          <stop offset="100%" stopColor="currentColor"  />
        </linearGradient>
      </defs>
      <path fill="currentColor" d="M0 0l1440 100H0z" />
      <path fill="url(#a)" d="M0 100L1440 0v100z" />
    </svg>
  )
}

export default SvgDiagonal