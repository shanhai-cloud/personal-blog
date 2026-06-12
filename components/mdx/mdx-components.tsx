import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  img: (props: ComponentPropsWithoutRef<"img">) => (
    <img {...props} alt={props.alt ?? ""} className="mx-auto my-6 max-w-full rounded-md" />
  )
};
