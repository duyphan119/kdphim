"use client";

type Props = { linkEmbed: string };

export default function EmbedVideo({ linkEmbed }: Props) {
  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-slate-950">
      <iframe
        src={linkEmbed}
        width="100%"
        height="100%"
        allow="fullscreen"
        allowFullScreen
        className="h-full w-full"
        onPlay={() => {
          console.log("play");
        }}
        onClick={() => {
          console.log("click");
        }}
        onPlaying={() => {
          console.log("playing");
        }}
        onPause={() => {
          console.log("pause");
        }}
      />
    </div>
  );
}
