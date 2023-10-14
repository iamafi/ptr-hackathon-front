import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const Plus = forwardRef<SVGSVGElement, IconProps>(
  ({ className, ...props }) => {
    className = cx(iconStyles(props), className);

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 12H19"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

Plus.displayName = "Plus";
