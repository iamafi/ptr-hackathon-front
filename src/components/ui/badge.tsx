import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const badgeVariants = cva("rounded-xs px-2 py-1.5 text-[0.625rem] font-semibold", {
  variants: {
    variant: {
      success: "bg-green-100 text-green-700",
      destructive: "bg-rose-100 text-rose-700",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

export interface PillProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, PillProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants as pillVariants };
