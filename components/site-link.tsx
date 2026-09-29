import * as React from "react";

// Use document navigation so links work consistently in the embedded preview
// and behind private hosting, without depending on a client RSC transition.
const SiteLink = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithRef<"a">>(
  (props, ref) => {
    return <a ref={ref} {...props} />;
  }
);

SiteLink.displayName = "SiteLink";

export default SiteLink;

