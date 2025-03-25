import { cva } from "class-variance-authority";
import React from "react";

const headerVariants = cva("font-medium", {
  variants: {
    variant: {
      large: "text-xl",
      medium: "text-lg",
      small: "text-sm"
    },
  },
  defaultVariants:{
    default: "text-lg"
  }
});

function PageHeader({ children, variant }) {
  return <h1 className={headerVariants({variant})}>{children}</h1>;
}

export default PageHeader;
