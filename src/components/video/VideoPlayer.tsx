// components/video/VideoPlayer.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <ReactPlayer
      url={url}
      width="auto"
      height="auto"
      controls
      style={{
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    />
  );
}
