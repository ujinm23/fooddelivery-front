import * as React from "react";
const Right = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={12}
    fill="none"
    {...props}
  >
    <path
      stroke="#404040"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="m.75 10.75 5-5-5-5"
    />
  </svg>
);
export default Right;
