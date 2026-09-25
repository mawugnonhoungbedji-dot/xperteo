import type { ComponentPropsWithRef } from "react";

// Use document navigation so links work consistently in the embedded preview
// and behind private hosting, without depending on a client RSC transition.
export default function SiteLink(props: ComponentPropsWithRef<"a">) {
  return <a {...props} />;
}
