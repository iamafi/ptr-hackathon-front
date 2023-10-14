import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const User = forwardRef<SVGSVGElement, IconProps>(
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
          d="M22.1666 24.5V22.1667C22.1666 20.929 21.675 19.742 20.7998 18.8668C19.9246 17.9917 18.7377 17.5 17.5 17.5H10.5C9.2623 17.5 8.07532 17.9917 7.20015 18.8668C6.32498 19.742 5.83331 20.929 5.83331 22.1667V24.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12.8333C16.5773 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5773 3.5 14 3.5C11.4227 3.5 9.33331 5.58934 9.33331 8.16667C9.33331 10.744 11.4227 12.8333 14 12.8333Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

User.displayName = "User";
