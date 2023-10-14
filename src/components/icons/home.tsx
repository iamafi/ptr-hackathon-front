import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const Home = forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }) => {
    className = cx(iconStyles(props), className);

    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 10.5L14 2.33331L24.5 10.5V23.3333C24.5 23.9522 24.2542 24.5456 23.8166 24.9832C23.379 25.4208 22.7855 25.6666 22.1667 25.6666H5.83333C5.21449 25.6666 4.621 25.4208 4.18342 24.9832C3.74583 24.5456 3.5 23.9522 3.5 23.3333V10.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 25.6667V14H17.5V25.6667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

Home.displayName = "Heart";
