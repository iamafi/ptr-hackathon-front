import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const FileHeart = forwardRef<SVGSVGElement, IconProps>(
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
          d="M4.91669 6.99998V4.66665C4.91669 4.04781 5.16252 3.45432 5.6001 3.01673C6.03769 2.57915 6.63118 2.33331 7.25002 2.33331H17.1667L23.5834 8.74998V23.3333C23.5834 23.9522 23.3375 24.5456 22.8999 24.9832C22.4624 25.4208 21.8689 25.6666 21.25 25.6666H4.91669"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5833 2.33331V9.33331H23.5833"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.255 12.4833C11.8565 12.0854 11.3485 11.8152 10.7958 11.7071C10.243 11.5991 9.67069 11.6581 9.15165 11.8767C8.81332 12.0167 8.49832 12.2267 8.24165 12.495L7.83332 12.8917L7.42499 12.495C7.02875 12.0975 6.52342 11.8265 5.97304 11.7164C5.42265 11.6063 4.85198 11.6621 4.33332 11.8767C3.98332 12.0167 3.67999 12.2267 3.41165 12.495C2.30332 13.5917 2.24499 15.4467 3.64499 16.8583L7.83332 21L12.0333 16.8583C13.4333 15.4467 13.3633 13.5917 12.255 12.495V12.4833Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

FileHeart.displayName = "FileHeart";
