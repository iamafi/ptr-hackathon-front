import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

export * as Icons from "./_icons";

type IconBaseProps = VariantProps<typeof iconStyles>;

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, "fill"> &
  IconBaseProps;

export const iconStyles = cva([], {
  variants: {
    fill: {
      true: "fill-current",
      false: "fill-none",
    },
  },
  defaultVariants: {
    fill: false,
  },
});

export const iconWithoutFillStyles = cva([], {
  variants: {},
});
