import {
  ForwardRefRenderFunction,
  Fragment,
  cloneElement,
  forwardRef,
} from 'react';

import { Divider } from '@/components/ui/divider';
import { getValidChildren } from '@/utils/get-valid-children';

type WithDividerProps = {
  shouldWrapChildren?: boolean;
  divider?: React.ReactElement;
} & React.HTMLProps<HTMLDivElement>;

const WithDividerCore: ForwardRefRenderFunction<
  HTMLDivElement,
  WithDividerProps
> = (props, ref) => {
  const {
    children,
    shouldWrapChildren,
    divider = <Divider variant="solid" />,
    ...rest
  } = props;
  const clones = () => {
    const validChildren = getValidChildren(children);

    return validChildren.map((child, index) => {
      // Prefer provided child key, fallback to index
      const key = typeof child.key !== 'undefined' ? child.key : index;
      const isLast = index + 1 === validChildren.length;
      const wrappedChild = <div key={key}>{child}</div>;
      const _child = shouldWrapChildren ? wrappedChild : child;

      const clonedDivider = cloneElement(divider);

      const _divider = isLast ? null : clonedDivider;

      return (
        <Fragment key={key}>
          {_child}
          {_divider}
        </Fragment>
      );
    });
  };

  return (
    <div ref={ref} {...rest}>
      {clones()}
    </div>
  );
};

export const WithDivider = forwardRef(WithDividerCore);
