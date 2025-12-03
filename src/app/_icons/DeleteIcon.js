import { DeleteIcon } from "lucide-react";
import * as React from "react";
const Delete = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.5 3.167h12m-1.333 0V12.5c0 .667-.667 1.333-1.334 1.333H3.167c-.667 0-1.334-.666-1.334-1.333V3.167m2 0V1.833C3.833 1.167 4.5.5 5.167.5h2.666c.667 0 1.334.667 1.334 1.333v1.334"
    />
  </svg>
);
export default Delete;
