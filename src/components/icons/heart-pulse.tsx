import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const HeartPulse = forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }) => {
    className = cx(iconStyles(props), className);

    return (
      <svg
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.5733 5.34332C23.988 4.756 23.2925 4.28998 22.5268 3.97201C21.761 3.65404 20.94 3.49036 20.1108 3.49036C19.2816 3.49036 18.4606 3.65404 17.6949 3.97201C16.9291 4.28998 16.2336 4.756 15.6483 5.34332L14.75 6.25332L13.8516 5.34332C13.2664 4.756 12.5709 4.28998 11.8051 3.97201C11.0393 3.65404 10.2183 3.49036 9.38915 3.49036C8.55998 3.49036 7.73896 3.65404 6.97319 3.97201C6.20741 4.28998 5.51194 4.756 4.92665 5.34332C2.45331 7.81666 2.30165 11.9933 5.41665 15.1667L14.75 24.5L24.0833 15.1667C27.1983 11.9933 27.0466 7.81666 24.5733 5.34332Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.83331 14H11.8333L12.4166 12.8334L14.75 18.0834L17.0833 9.91669L18.8333 14H24.6666"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

HeartPulse.displayName = "HeartPulse";
