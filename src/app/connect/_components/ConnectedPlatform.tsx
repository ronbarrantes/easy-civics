"use client";
import { useState } from "react";

import classNames from "classnames";

export const ConnectedPlatform = ({
  socialMediaPlatform,
  url,
  className,
}: {
  socialMediaPlatform: string;
  url: string;
  className?: string;
}) => {
  const [isConnected] = useState(false);

  return (
    <div className="flex gap-2">
      {isConnected ? "is connected" : "is not connected"} to{" "}
      <a className={classNames("p-2 py-1 text-white", className)} href={url}>
        {socialMediaPlatform}
      </a>
    </div>
  );
};
