import { forwardRef } from "react";
import { cx } from "class-variance-authority";

import type { IconProps } from "@/components/icons";
import { iconStyles } from "@/components/icons";

export const CalendarHeart = forwardRef<SVGSVGElement, IconProps>(
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
          d="M25 11.6667V7.00002C25 6.38118 24.7542 5.78769 24.3166 5.3501C23.879 4.91252 23.2855 4.66669 22.6667 4.66669H6.33333C5.71449 4.66669 5.121 4.91252 4.68342 5.3501C4.24583 5.78769 4 6.38118 4 7.00002V23.3334C4 24.6167 5.05 25.6667 6.33333 25.6667H14.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.1667 2.33331V6.99998"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.83331 2.33331V6.99998"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 11.6667H25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25.3384 17.15C24.9408 16.7544 24.4349 16.4856 23.8846 16.3776C23.3342 16.2697 22.7642 16.3273 22.2467 16.5433C21.8967 16.6833 21.5817 16.8933 21.3134 17.1617L20.9167 17.5583L20.5084 17.1617C20.1121 16.7641 19.6068 16.4931 19.0564 16.3831C18.506 16.273 17.9354 16.3288 17.4167 16.5433C17.0667 16.6833 16.7634 16.8933 16.495 17.1617C15.3867 18.2583 15.3284 20.1133 16.7284 21.525L20.9167 25.6667L25.1167 21.525C26.5167 20.1133 26.4467 18.2583 25.3384 17.1617V17.15Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);

CalendarHeart.displayName = "CalendarHeart";
