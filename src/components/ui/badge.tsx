import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const badgeVariants = cva("rounded-xs  font-semibold", {
  variants: {
    variant: {
      success: "bg-green-100 text-green-700",
      destructive: "bg-rose-100 text-rose-700",
    },
    size: {
      sm: "text-xs px-1.5 py-1",
      md: "text-[0.625rem] px-2 py-1.5",
    },
  },
  defaultVariants: {
    variant: "success",
    size: "md",
  },
});

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants as pillVariants };
