import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export const BoundedFW = forwardRef<HTMLElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp
        ref={ref}
        className={clsx(
          "px-2 [.header+&]:pt-44 [.header+&]:md:pt-32",
          className,
        )}
        {...restProps}
      >
        <div className="mx-auto w-full max-w-full">{children}</div>
      </Comp>
    );
  },
);

BoundedFW.displayName = "Bounded";
